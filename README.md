# Caesium Image Compressor — Eagle Plugin

基于 Eagle 官方图片压缩插件 UI，底层压缩引擎替换为 [CaesiumCLT](https://github.com/Lymphatus/caesium-clt)。

## 功能

- **有损 / 无损** — 每种格式支持有损（品质可调）和无损两种模式
- **尺寸调整** — 独立宽高百分比、自定义像素、保持长宽比、禁止放大
- **保留 EXIF** — 可选保留元数据和原始文件日期
- **导出模式** — 可选导出到本地文件夹，不替换 Eagle 原文件
- **批量处理** — 拖入或从 Eagle 选中多张图片一次压缩
- **压缩对比** — 列表显示每张图的原始大小 → 压缩后大小及压缩率
- **多语言** — 8 种语言（en / zh_CN / zh_TW / ja_JP / ko_KR / es_ES / de_DE / ru_RU）

## 支持的格式与引擎

| 格式 | 有损引擎 | 无损引擎 |
|------|---------|---------|
| JPEG | MozJPEG | MozJPEG |
| PNG | imagequant | oxipng |
| WebP | libwebp | libwebp |
| GIF | gifski | — |
| SVG | — | svgo |

> 算法名已对齐 CaesiumCLT 实际引擎。UI 中可通过算法下拉切换有损/无损模式。

## 安装

将 `Caesium Image Compressor` 文件夹拖入 Eagle 的插件目录，或通过 Eagle → 插件 → 导入本地插件。

CaesiumCLT 二进制文件已内置在 `modules/image-compressor/bin/`，支持 Windows x64 / macOS Intel / macOS Apple Silicon / Linux x64。如需更新版本，从 [CaesiumCLT Releases](https://github.com/Lymphatus/caesium-clt/releases) 下载覆盖即可。

## 项目结构

```
Caesium Image Compressor/
├── manifest.json              # 插件配置
├── index.html                 # Vue 入口 + DOM 注入脚本
├── logo.png
├── assets/                    # Vue + Element Plus 打包文件（官方 UI）
│   ├── js/
│   │   └── index-7aef741b.js  # 核心 Vue 应用（少量 patch）
│   └── css/
├── modules/
│   ├── index.js               # 模块入口
│   ├── utils/                 # 文件/图片工具
│   └── image-compressor/
│       ├── index.js           # ★ CaesiumCLT 压缩引擎
│       ├── lib/svgo.browser.js
│       └── bin/               # CaesiumCLT 二进制
│           ├── win32-x64/caesiumclt.exe
│           ├── darwin-x64/caesiumclt
│           ├── darwin-arm64/caesiumclt
│           └── linux-x64/caesiumclt
└── _locales/                  # 8 种语言
```

## 技术栈

- Vue 3 + Element Plus（官方插件 UI，仅修改 `assets/js/index-7aef741b.js` 中少量校验逻辑）
- CaesiumCLT 命令行工具（通过 `child_process.spawn` 调用，带重试和动态超时）
- DOM 注入（设置面板中的缩放开关注入，不修改 Vue 源码结构）
- `localStorage` 跨上下文通信（注入脚本 ↔ require 模块）
- 多平台 CaesiumCLT 二进制自动解析

## 许可

MIT
