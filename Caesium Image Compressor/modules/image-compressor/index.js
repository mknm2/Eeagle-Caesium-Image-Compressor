/**
 * CaesiumCLT Image Compressor — drop-in replacement for Eagle's official
 * image compression module.  Uses a single CaesiumCLT binary instead of
 * per-format tools (mozjpeg, pngquant, etc.).
 *
 * Interface compatible with the official plugin:
 *   ImageCompressor.compress(src, dist, options, ext)
 *   ImageCompressor.createTempFolder(path)
 */

const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { spawn } = require('node:child_process');
const { createFolder } = require('../utils/file');
const svgo = require('./lib/svgo.browser');

// ---------------------------------------------------------------------------
// Binary resolution
// ---------------------------------------------------------------------------

function getCaesiumBinary() {
    let postfix = process.platform === 'win32' ? '.exe' : '';
    const platform = process.platform;
    const arch = process.arch;
    let dir = 'win32-x64';
    if (platform === 'darwin' && arch === 'x64')  dir = 'darwin-x64';
    if (platform === 'darwin' && arch === 'arm64') dir = 'darwin-arm64';
    if (platform === 'linux' && arch === 'x64')   dir = 'linux-x64';

    return path.normalize(
        `${eagle.plugin.path}/modules/image-compressor/bin/${dir}/caesiumclt${postfix}`
    );
}

// ---------------------------------------------------------------------------
// Spawn helper
// ---------------------------------------------------------------------------

function spawnPromise(bin, params, timeout) {
    return new Promise((resolve, reject) => {
        const cmd = spawn(bin, params, {
            stdio: ['ignore', 'pipe', 'pipe'],
            timeout: timeout,
            windowsHide: true,
        });

        let stdout = '';
        let stderr = '';

        cmd.stdout.on('data', (data) => {
            stdout += data.toString();
        });

        cmd.stderr.on('data', (data) => {
            stderr += data.toString();
        });

        cmd.on('close', (code) => {
            if (code === 0) {
                resolve({ stdout, stderr });
            } else {
                reject(new Error(stderr || stdout || `Exit code ${code}`));
            }
        });

        cmd.on('error', (err) => {
            reject(new Error(`Failed to launch caesiumclt: ${err.message}`));
        });
    });
}

// ---------------------------------------------------------------------------
// Main compressor class
// ---------------------------------------------------------------------------

module.exports = class {

    /**
     * Compress an image file using CaesiumCLT.
     *
     * @param {string} src     - Source image file path.
     * @param {string} dist    - Desired output file path.
     * @param {object} options - { algorithm, quality } from the Vue frontend.
     *                           quality is used; algorithm is ignored.
     * @param {string} ext     - 'jpg' | 'jpeg' | 'png' | 'webp' | 'gif' | 'svg'
     */
    static async compress(src, dist, options, ext) {
        let removeInput;
        let input = src;

        // ---- Windows Chinese-path workaround (same as official plugin) ----
        if (process.platform === 'win32') {
            const tempPath = path.normalize(
                os.tmpdir() + '/' + Math.random().toString(36).substr(2) + '.' + ext
            );
            await fs.promises.copyFile(src, tempPath);
            input = tempPath;
            removeInput = async () => {
                if (process.platform === 'win32' && input !== src) {
                    if (fs.existsSync(input)) {
                        await fs.promises.rm(input);
                    }
                }
            };
        }

        try {
            // SVG is not supported by CaesiumCLT — keep original svgo path
            if (ext === 'svg') {
                await compressSVG(input, dist);
                if (removeInput) await removeInput();
                eagle.log.info('compressing image done (svg)');
                return;
            }

            // ---- CaesiumCLT outputs to a directory, preserving input filename.
            //      Use a dedicated work dir to control the final output path. ----
            const outputDir = path.dirname(dist);
            const workDir = path.normalize(
                outputDir + '/caesium-work-' + Math.random().toString(36).substr(2, 6)
            );
            await fs.promises.mkdir(workDir, { recursive: true });

            try {
                const binPath = getCaesiumBinary();

                // Ensure binary is executable on macOS/Linux
                if (process.platform !== 'win32') {
                    try {
                        await fs.promises.access(binPath, fs.constants.X_OK);
                    } catch (err) {
                        await fs.promises.chmod(binPath, 0o755);
                    }
                }

                const args = buildArgs(input, workDir, options, ext);

                eagle.log.info('[caesium] bin: ' + binPath);
                eagle.log.info('[caesium] ARGS: ' + args.join(' '));
                eagle.log.info('caesiumclt input: ' + input + ' outputDir: ' + workDir + ' dist: ' + dist);
                await spawnPromise(binPath, args, 120 * 1000);
                eagle.log.info('caesiumclt done');

                // Find CaesiumCLT output and move to dist
                const workFiles = await fs.promises.readdir(workDir);
                if (workFiles.length === 0) {
                    throw new Error('CaesiumCLT produced no output file');
                }

                const actualOutput = path.join(workDir, workFiles[0]);
                if (path.normalize(actualOutput) !== path.normalize(dist)) {
                    await fs.promises.rename(actualOutput, dist);
                }
            } finally {
                try {
                    await fs.promises.rm(workDir, { recursive: true, force: true });
                } catch (_) { /* ignore */ }
            }

            if (removeInput) await removeInput();

            // ---- Export to local folder (if enabled in settings) ----
            if (isExportMode() && ext !== 'svg') {
                var exportDir = getExportPath();
                if (exportDir) {
                    try {
                        var exportName = path.basename(src);
                        // If format conversion changed the extension, use the output extension
                        var outExt = path.extname(dist);
                        if (outExt && path.extname(exportName).toLowerCase() !== outExt.toLowerCase()) {
                            exportName = path.basename(exportName, path.extname(exportName)) + outExt;
                        }
                        var destPath = path.join(exportDir, exportName);
                        await fs.promises.copyFile(dist, destPath);
                        eagle.log.info('[caesium] exported to: ' + destPath);
                    } catch (e) {
                        eagle.log.error('[caesium] export failed: ' + e.message);
                    }
                }
            }
        } catch (err) {
            if (fs.existsSync(dist)) {
                await fs.promises.rm(dist);
            }
            if (removeInput) await removeInput();
            throw err;
        }

        eagle.log.info('compressing image done');
    }

    static async createTempFolder(dirPath) {
        await createFolder(dirPath);
    }
};

// ---------------------------------------------------------------------------
// CLI argument builder
// ---------------------------------------------------------------------------

/**
 * Determine whether the selected algorithm is lossless.
 * Maps the official plugin's algorithm names to CaesiumCLT modes:
 *   lossless → --lossless (jpegtran, optipng, gifsicle)
 *   lossy   → -q <quality>  (mozjpeg, pngquant, gifsicleLossy, cwebp)
 */
// One-time migration: clear old algorithm localStorage keys that would crash the UI
(function migrateOldKeys() {
    try {
        var pfx = 'eagle.plugin.1df3c39d-da57-497f-814d-1d48ce9bd666.setting.';
        var oldKeys = ['mozjpeg','jpegtran','pngquant','optipng','gifsicle','gifsicleLossy','cwebp','cwebpLossless','MozJPEG Lossless','libwebp Lossless'];
        var formats = ['jpg','png','gif','webp'];
        for (var f = 0; f < formats.length; f++) {
            var key = pfx + formats[f] + '.algorithm';
            var val = localStorage.getItem(key);
            if (val && oldKeys.indexOf(val) >= 0) {
                localStorage.removeItem(key);
                console.log('[caesium] Migrated old key:', key, '=', val);
            }
        }
    } catch (_) { /* ignore */ }
})();

// ZWSP = zero-width space (U+200B) — makes keys visually identical
var Z = '​';
const LOSSLESS_ALGORITHMS = new Set(['MozJPEG' + Z, 'oxipng', 'libwebp' + Z]);

/** Read the "Preserve Metadata" checkbox setting injected by index.html. */
function shouldPreserveMetadata() {
    try {
        return localStorage.getItem('eagle.plugin.1df3c39d-da57-497f-814d-1d48ce9bd666.setting.preserveMetadata') !== 'false';
    } catch (_) { return true; }
}

/** Read export mode setting injected by index.html. */
function isExportMode() {
    try {
        return localStorage.getItem('eagle.plugin.1df3c39d-da57-497f-814d-1d48ce9bd666.setting.exportMode') === 'true';
    } catch (_) { return false; }
}
function getExportPath() {
    try {
        return localStorage.getItem('eagle.plugin.1df3c39d-da57-497f-814d-1d48ce9bd666.setting.exportPath') || '';
    } catch (_) { return ''; }
}

/** Read resize settings injected by index.html. */
function getResizeOptions() {
    try {
        var pfx = 'eagle.plugin.1df3c39d-da57-497f-814d-1d48ce9bd666.setting.resize.';
        return {
            mode: localStorage.getItem(pfx + 'mode') || 'original',
            percentW: parseInt(localStorage.getItem(pfx + 'percentW'), 10) || 50,
            percentH: parseInt(localStorage.getItem(pfx + 'percentH'), 10) || 50,
            keepAspect: localStorage.getItem(pfx + 'keepAspect') !== 'false',
            width: parseInt(localStorage.getItem(pfx + 'width'), 10) || 0,
            height: parseInt(localStorage.getItem(pfx + 'height'), 10) || 0,
            noUpscale: localStorage.getItem(pfx + 'noUpscale') !== 'false',
        };
    } catch (_) { return { mode: 'original', noUpscale: true }; }
}

/**
 * Read image dimensions from common file headers.
 * Returns { width, height } or null if unsupported.
 */
// Safe string read from Buffer (avoids buf.toString(enc, start, end) quirks)
function _str(buf, start, len) { return buf.subarray(start, start + len).toString(); }

function getImageDimensions(filePath, ext) {
    try {
        // ---- JPEG: streaming marker-based seek parser ----
        // Handles arbitrarily large EXIF/ICC/XMP headers without loading
        // the entire file into memory. Example: 49KB EXIF = SOF at byte 57K+.
        if (ext === 'jpg' || ext === 'jpeg') {
            var fd = fs.openSync(filePath, 'r');
            try {
                var hdr = Buffer.alloc(2);
                fs.readSync(fd, hdr, 0, 2, 0);
                if (hdr[0] !== 0xFF || hdr[1] !== 0xD8) return null;

                var pos = 2;
                var segBuf = Buffer.alloc(16);

                while (true) {
                    var n = fs.readSync(fd, segBuf, 0, 2, pos);
                    if (n < 2 || segBuf[0] !== 0xFF) break;

                    var marker = segBuf[1];
                    // 0xFF 0x00 = escaped FF in data, skip
                    if (marker === 0x00) { pos += 2; continue; }
                    // 0xFF 0xFF = padding
                    if (marker === 0xFF) { pos += 1; continue; }

                    // SOF markers — read 3 bytes (len+precision) + 4 bytes (h,w)
                    if ((marker >= 0xC0 && marker <= 0xC3) ||
                        (marker >= 0xC5 && marker <= 0xC7) ||
                        (marker >= 0xC9 && marker <= 0xCB) ||
                        (marker >= 0xCD && marker <= 0xCF)) {
                        fs.readSync(fd, segBuf, 0, 7, pos + 2);
                        return {
                            height: segBuf.readUInt16BE(3),
                            width:  segBuf.readUInt16BE(5)
                        };
                    }
                    // SOS (0xDA) / EOI (0xD9) — scan data, stop
                    if (marker === 0xDA || marker === 0xD9) break;
                    // RST markers (0xD0-0xD7) — no length field
                    if (marker >= 0xD0 && marker <= 0xD7) { pos += 2; continue; }

                    // All other markers: read 2-byte segment length, seek past
                    n = fs.readSync(fd, segBuf, 0, 2, pos + 2);
                    if (n < 2) break;
                    pos += 2 + segBuf.readUInt16BE(0);
                }
            } finally {
                fs.closeSync(fd);
            }
            return null;
        }

        // ---- PNG / GIF / WebP: fast path (fixed offsets, 64 bytes) ----
        var fd2 = fs.openSync(filePath, 'r');
        var buf = Buffer.alloc(64);
        fs.readSync(fd2, buf, 0, 64, 0);
        fs.closeSync(fd2);

        if (ext === 'png' && _str(buf, 12, 4) === 'IHDR') {
            return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
        }
        if (ext === 'gif' && _str(buf, 0, 3) === 'GIF') {
            return { width: buf.readUInt16LE(6), height: buf.readUInt16LE(8) };
        }
        if (ext === 'webp' && _str(buf, 0, 4) === 'RIFF') {
            var chunkId = _str(buf, 12, 4);
            if (chunkId === 'VP8 ') {
                return { width: buf.readUInt16LE(26) & 0x3FFF, height: buf.readUInt16LE(28) & 0x3FFF };
            }
            if (chunkId === 'VP8L') {
                var bits = buf.readUInt32LE(21);
                return { width: (bits & 0x3FFF) + 1, height: ((bits >> 14) & 0x3FFF) + 1 };
            }
            if (chunkId === 'VP8X') {
                var w24 = buf.readUInt16LE(24) | (buf[26] << 16);
                var h24 = buf.readUInt16LE(27) | (buf[29] << 16);
                return { width: w24 + 1, height: h24 + 1 };
            }
        }
    } catch (_) { /* ignore */ }
    return null;
}

/** Calculate target dimensions based on resize settings + original size. */
function calcResizeDims(origW, origH, resize) {
    if (resize.mode === 'percentage') {
        var pW = Math.max(1, Math.min(200, resize.percentW)) / 100;
        var pH = Math.max(1, Math.min(200, resize.percentH)) / 100;
        return { width: Math.round(origW * pW), height: Math.round(origH * pH) };
    }
    if (resize.mode === 'custom') {
        var w = resize.width || 0;
        var h = resize.height || 0;
        if (w > 0 && h > 0) return { width: w, height: h };
        if (w > 0) return { width: w, height: Math.round(origH * w / origW) };
        if (h > 0) return { width: Math.round(origW * h / origH), height: h };
    }
    return null; // original size
}

function buildArgs(inputPath, outputDir, options, imageExt) {
    var args = [];

    var isLossless = options.algorithm && LOSSLESS_ALGORITHMS.has(options.algorithm);

    if (isLossless) {
        args.push('--lossless');
    } else if (options.quality !== undefined && options.quality !== null) {
        args.push('-q', String(options.quality));
    }

    // ---- Resize ----
    // Resize takes priority over lossless: if both are set, CaesiumCLT
    // will resize and fall back to lossy encoding. This matches the
    // standalone GUI behavior.
    var resize = getResizeOptions();
    eagle.log.info('[caesium] resize mode=' + resize.mode + ' percentW=' + resize.percentW + ' percentH=' + resize.percentH);
    if (resize.mode !== 'original') {
        var dims = getImageDimensions(inputPath, imageExt);
        eagle.log.info('[caesium] image dims=' + (dims ? (dims.width+'x'+dims.height) : 'null'));
        if (dims && dims.width > 0 && dims.height > 0) {
            var target = calcResizeDims(dims.width, dims.height, resize);
            if (target && (target.width !== dims.width || target.height !== dims.height)) {
                args.push('--width', String(target.width));
                args.push('--height', String(target.height));
                if (resize.noUpscale) {
                    args.push('--no-upscale');
                }
            }
        }
    }

    // ---- PNG optimization level (align with GUI default) ----
    if (imageExt === 'png') {
        args.push('--png-opt-level', '3');
    }

    // Preserve EXIF metadata and original file timestamps (opt-out via UI checkbox)
    if (shouldPreserveMetadata()) {
        args.push('-e');
        args.push('--keep-dates');
    }

    args.push('-O', 'never');
    args.push('-o', outputDir);
    args.push(inputPath);

    return args;
}

// ---------------------------------------------------------------------------
// SVG compression (unchanged from official plugin)
// ---------------------------------------------------------------------------

async function compressSVG(src, dist) {
    try {
        const svgStr = await fs.promises.readFile(src, 'utf-8');
        let compressed = svgo.optimize(svgStr, {});
        await fs.promises.writeFile(dist, compressed.data);
    } catch (err) {
        throw err;
    }
}
// v3 — VP8X fix Wed Jul 22 17:05:38     2026
try { eagle.log.info('[caesium] compress module v3 loaded — VP8X supported'); } catch (_) {}
