# 踩坑记录

基于 Eagle 官方图片压缩插件 UI，将底层压缩引擎替换为 CaesiumCLT 的过程中的问题和解决方案。

---

## 1. `buf.toString(enc, start, end)` 在 Eagle Node.js 环境行为异常

**现象**：VP8X WebP 图片的 `getImageDimensions` 始终返回 null，chunk ID 检测失败。

**原因**：Eagle 内嵌的 Node.js 运行时中，`Buffer.toString(encoding, start, end)` 的参数形式行为不一致。`buf.toString('ascii', 12, 4)` 在某些运行时返回空字符串，但 `buf.subarray(12, 16).toString()` 正常。

**解决**：封装 `_str(buf, start, len)` 函数，统一使用 `buf.subarray(start, start + len).toString()` 替代所有 `buf.toString(enc, start, end)` 调用。

---

## 2. JPEG 固定缓冲区太小，手机照片普遍触发

**现象**：JPEG 无损 75% 尺寸缩放始终不生效，输出仍是原尺寸。

**原因**：JPEG 的 SOF（帧头，含宽高）在文件中的位置**不固定**——它排在所有 APP 元数据段（EXIF/ICC/XMP）之后。手机拍摄的照片通常包含数万字节的 EXIF 数据，SOF 可能在第 50,000 字节之后。

`getImageDimensions` 最初只读 64 字节 → 扩到 4KB → 扩到 64KB，都未能稳定覆盖。几乎任何手机照片都会触发。

**解决**：将 JPEG 解析重构为**流式 Marker Seek 跳过模式**——只读 Marker 头（2 字节），对 APP/EXIF 等大数据段只读长度字段，然后通过文件指针 Seek 直接跳过。O(1) 内存，不随文件大小增长。

核心逻辑：
```
读 SOI → 循环读 Marker → SOF? 提取宽高返回
                       → SOS/EOI? 停止
                       → 其他? 读长度 → Seek 跳过
```

PNG / GIF / WebP 不受影响——它们的尺寸信息在固定偏移位置（前 64 字节内）。

---

## 3. VP8X 扩展 WebP 格式漏了支持

**现象**：pic3 的 WebP 75% 缩放不生效。

**原因**：WebP 有三种子格式：VP8（有损）、VP8L（无损）、VP8X（扩展，带 ICC/EXIF 元数据）。`getImageDimensions` 只处理了前两种。Eagle 库里大量 WebP 都是 VP8X 格式，其 Canvas 尺寸字段在 bytes 24-29（24-bit LE + 1），解析方式与前两种完全不同。

**解决**：新增 VP8X 分支，解析 3 字节 Canvas Width/Height。

---

## 4. postVerify 大图 Canvas 崩溃

**现象**：大尺寸 PNG（3840×2160，23MB）有损压缩在插件中失败，但 `caesiumclt` 命令行单独跑正常。

**原因**：官方插件的 `postVerify` 校验阶段会将压缩前后的图都绘制到 Canvas 上做直方图对比。大图 Canvas 像素数据内存峰值约 66MB（两张原尺寸 RGBA），触发 Chromium 渲染进程内存限制，绘制失败后直方图相似度为 0，抛异常。

**解决**：在 Vue 打包文件中将 `checkEqualResolution` 和 `checkHistogramsAbnormality` 改为 `false`，只保留 `checkFileSize` 校验。

---

## 5. JPEG「无损 + 缩放」的物理矛盾

**现象**：选中 JPEG + 无损模式 + 75% 缩放，是否需要同时生效？

**原因**：JPEG 的无损操作（jpegtran / `--lossless`）只包含 Huffman 表优化、元数据移除等，**不包含缩放**。缩放必须走「解码 → 缩放位图 → 重编码」，而 JPEG 重编码必然经过 DCT + 量化，一定有损。这是一个物理矛盾。

**解决**：最终选择**缩放优先**——当用户同时设置无损和缩放时，缩放生效，CaesiumCLT 自动退化为有损编码。这与独立软件 `Caesium Image Compressor` GUI 的行为一致。

---

## 6. `caesium.dll` vs `caesiumclt.exe` 有损输出不一致

**现象**：插件（调用 `caesiumclt.exe`）和独立软件（调用 `caesium.dll`）的有损压缩输出文件大小不同（通常差 0.5%-5%）。

**原因**：同一个 Rust 代码库（oxipng 9.1.5、imagequant 4.3.4）编译成两个不同产物。有损压缩中任何参数微调（色度采样、渐进式编码参数、压缩等级浮点舍入）都会造成输出差异。两个产物编译时间、默认参数可能不同。

**解决**：接受此差异。无损 + 原尺寸场景输出完全一致（MD5 匹配）。有损场景输出接近但不可能逐字节一致——除非用 DLL 注入替代 CLI 调用。

---

## 7. localStorage 旧键迁移导致设置窗口崩溃

**现象**：修改 Vue 打包文件中的算法名后，打开设置窗口无反应。

**原因**：localStorage 中存有旧算法键名（如 `jpegtran`、`gifsicle`），但修改后 `setting.algorithm` 对象中已删除这些键。Vue 模板渲染时访问 `setting[format].algorithm[oldKey].lossy` → `undefined.lossy` → 抛出异常，整个设置窗口崩溃。

**解决**：在压缩模块加载时运行一次性迁移脚本，遍历检测旧的算法 localStorage 键并清除。同时将单选项格式（GIF 只有 `gifski`）的算法名硬编码，不再从 localStorage 读取，避免类似问题。

---

## 8. JS Key 不能重复 → 零宽空格区分

**现象**：JPEG 和 WebP 的有损/无损都使用同一个引擎名（MozJPEG、libwebp），UI 下拉框需显示两个同名选项，但 JavaScript 对象不支持重复 key。

**解决**：无损选项的 key 末尾附加 U+200B（零宽空格），视觉上完全一致的两个 "MozJPEG" 条目，内部字符串不同。`LOSSLESS_ALGORITHMS` Set 中的 key 需同步包含零宽空格。

---

## 9. 官方 Vue 打包文件多处关联修改

**现象**：每次修改 `index-7aef741b.js` 中的算法配置，漏改一处就崩溃。

**原因**：算法配置分布在 3 个位置，必须同步更新：
- `setting`（定义可用算法及其 lossy/lossless 属性）
- `default_setting`（reactive 初始值，从 localStorage 读取）
- `this.setting`（运行时默认值）

此外 `LOSSLESS_ALGORITHMS` Set 在压缩模块中也需同步。

**解决**：每次修改前用 `grep` 确认所有引用点，改完后跑 `node --check` 验证语法。Eagle 必须**完全重启**（而非仅重载插件）来清除 Node.js require 缓存。

---

## 10. Eagle 插件重载不等于完全重载

**现象**：修改了 `modules/image-compressor/index.js` 后，右键重载插件不生效。

**原因**：Eagle 插件使用 Node.js `require()` 加载模块。重载插件时，Node.js 的模块缓存 (`require.cache`) 不会自动清除，修改后的文件仍然使用旧的缓存版本。

**解决**：关闭 Eagle 并重新启动。Eagle 菜单中的「重新加载」不够，必须完全退出进程。

---

## 11. 导出模式需要同时拦截 Vue 打包文件

**现象**：添加了「导出到本地文件夹」选项后，文件虽然导出了，但 Eagle 库里的原文件仍然被替换。

**原因**：导出功能分两层：压缩模块负责**将压缩文件复制到导出目录**，但 Vue 前端在压缩后**仍然调用 `item.replaceFile()` 替换原文件**。需要同时修改 Vue 打包文件中的替换逻辑，在导出模式下跳过 `replaceFile` 调用。

**解决**：在 Vue 打包文件中给 `replaceFile()` 调用加上 localStorage 条件检查，导出模式下跳过。
