# app（应用）

下面示例为 `app` 的常用属性：

```javascript
console.log(eagle.app.version);				// Eagle 版本
console.log(eagle.app.build);				// Eagle Build 号
console.log(eagle.app.locale);				// 应用界面语系，en/zh_CN/zh_TW/ja_JP
console.log(eagle.app.arch);				// x86 | x64
console.log(eagle.app.platform);			// darwin | win32
console.log(eagle.app.isWindows);			// true | false, 操作系统是否为 Windows
console.log(eagle.app.isMac);				// true | false, 操作系统是否为 Mac
console.log(eagle.app.runningUnderARM64Translation);	// 是否运行在 rosetta 转译模式
```

***

## 方法 <a href="#z1a5y" id="z1a5y"></a>

## isDarkColors() <a href="#a6hjz" id="a6hjz"></a>

确认当前系统是否处于深色（Dark）模式。

* 返回 `boolean` - 当前系统是否正在处于 Dark 模式。

```javascript
eagle.app.isDarkColors();		// true | false
```

***

## getPath(name) <a href="#b8lgu" id="b8lgu"></a>

您可以通过名称请求以下路径

* `name` string - 您可以通过名称请求以下路径
  * `home` - 用户的 home 文件夹（主目录）
  * `appData` - 每个用户的应用程序数据目录，默认情况下指向：
  * `userData` - 储存你应用程序配置文件的文件夹，默认是 appData 文件夹附加应用的名称 按照习惯用户存储的数据文件应该写在此目录，同时不建议在这写大文件，因为某些环境会备份此目录到云端存储。
  * `temp` - 临时文件夹
  * `exe` - 当前的可执行文件
  * `desktop` - 当前用户的桌面文件夹
  * `documents` - 用户文档目录的路径
  * `downloads` - 用户下载目录的路径
  * `music` - 用户音乐目录的路径
  * `pictures` - 用户图片目录的路径
  * `videos` - 用户视频目录的路径
  * `recent` - 用户最近文件的目录 (仅限 Windows)。
* 返回 `Promise<path: string>` - `path` 查询路径结果。

```javascript
await eagle.app.getPath('appData');	// 'C:\Users\User\AppData\Roaming'
await eagle.app.getPath('pictures');	// 'C:\Users\User\Pictures'
await eagle.app.getPath('desktop');	// 'C:\Users\User\Desktop'
```

{% hint style="info" %}
备注：此功能与 Electron API 的 [app.getPath](https://www.electronjs.org/zh/docs/latest/api/app#appgetapppath) 功能类似。
{% endhint %}

***

## getFileIcon(path\[, options]) <a href="#ndrop" id="ndrop"></a>

取得指定路径文件关联的图标。

* `path` string - 欲取得图示之文件路径
* `options` Object（可选）
  * `size` string
  * `small` - 16x16
  * `normal` - 32x32
  * `large` - `Windows` 为 32x32, `macOS` 不支持。
* 返回 `Promise<img: NativeImage>`
  * `img` [NativeImage](https://www.electronjs.org/zh/docs/latest/api/native-image) - 一个 NativeImage 类型的应用图标。

```javascript
let img = await eagle.app.getFileIcon('path_to_file', { size: 'small' });

// 取得图像信息
let base64 = img.toDataURL();
let size = img.getSize();	// {'width': 16, height: 16}

// 保存到电脑
let buffer = img.toPNG();
require('fs').writeFileSync('output_path/example.png', buffer);
```

{% hint style="info" %}
备注：此功能与 Electron API 的 [app.getAppIcon](https://www.electronjs.org/zh/docs/latest/api/app#appgetfileiconpath-options) 功能类似。
{% endhint %}

***

## createThumbnailFromPath(path, maxSize) <a href="#psczp" id="psczp"></a>

取得指定路径文件关联的图标。

* `path` string - 欲取得缩略图之文件路径
* `maxSize` Size - 返回缩略图的最大宽度和高度(正数)。 在 Windows 平台下将忽略 maxSize.height 并根据 maxSize.width 缩放高度
* 返回 `Promise<img: NativeImage>`
  * `img` [NativeImage](https://www.electronjs.org/zh/docs/latest/api/native-image) - 文件的缩略图预览图像。

```javascript
let img = await eagle.app.createThumbnailFromPath('path_to_file', { 
    height: 200, 
    width: 200 
});

// 取得图像信息
let base64 = img.toDataURL();
let size = img.getSize();	// {'width': 200, height: 150}

// 保存到电脑
let buffer = img.toPNG();
require('fs').writeFileSync('output_path/example.png', buffer);
```

{% hint style="info" %}
备注：此功能与 Electron API 的 [nativeImage.createThumbnailFromPath(path, maxSize)](https://www.electronjs.org/zh/docs/latest/api/native-image#nativeimagecreatethumbnailfrompathpath-maxsize-macos-windows) 功能类似。
{% endhint %}

***

## show() <a href="#show" id="show"></a>

将 Eagle 主应用程序窗口唤起并显示在画面最上方。

* 返回 `Promise<boolean>` - 操作是否成功。

```javascript
await eagle.app.show();
```

{% hint style="info" %}
备注：此功能需要 Eagle 4.0 build18 或更高版本。
{% endhint %}

***

## 屬性 <a href="#adtwq" id="adtwq"></a>

## version <a href="#f95hw" id="f95hw"></a>

`string` 属性，获取当前 Eagle 应用程序版本。

## build <a href="#gwrv2" id="gwrv2"></a>

`number` 属性，获取当前 Eagle 应用程序 Build Number。

## locale <a href="#dd0fm" id="dd0fm"></a>

`string` 属性，获取当前 Eagle 应用程序界面语系。

* `en` - 英文
* `zh_CN` - 简体中文
* `zh_TW` - 繁体中文
* `ja_JP` - 日文
* `ko_KR` - 韩文
* `es_ES` - 西班牙文
* `de_DE` - 德文
* `ru_RU` - 俄文

## arch <a href="#hqmzh" id="hqmzh"></a>

`string` 属性，返回操作系統 CPU 架構。

* `x64`
* `arm64`
* `x86`

## platform <a href="#z5qbr" id="z5qbr"></a>

`string` 属性，返回一個標識操作系統平台的字符串。

* `darwin` - macOS 操作系统
* `win32` - Windows 操作系统

## env <a href="#bdd4y" id="bdd4y"></a>

`Object` 属性，返回环境变量的对象。

```javascript
console.log(eagle.app.env);

{
  APPDATA: "C:\\Users\\User\\AppData\\Roaming",
  HOMEDRIVE: "C:",
  HOMEPATH: "\\Users\\User",
  LANG: "zh_TW.UTF-8",
  TEMP: "C:\\Users\\User\\AppData\\Local\\Temp"
}
```

```javascript
console.log(eagle.app.env['TEMP']);

"C:\\Users\\User\\AppData\\Local\\Temp"
```

## execPath <a href="#uvg0k" id="uvg0k"></a>

`string` 属性，当前应用程序执行路径。

```javascript
console.log(eagle.app.execPath);

"C:\\Program Files\\Eagle\\Eagle.exe"
```

## pid <a href="#cldbp" id="cldbp"></a>

`number` 属性，当前插件进程 id。

## isWindows <a href="#u8kad" id="u8kad"></a>

`boolean` 属性，是否当前为 Window 操作系统。

## isMac <a href="#qw2s4" id="qw2s4"></a>

`boolean` 属性，是否当前为 Mac 操作系统。

## runningUnderARM64Translation <a href="#kbkmv" id="kbkmv"></a>

`boolean` 属性，为 true 时表明当前应用正在使用 ARM64 运行环境 (比如 macOS [Rosetta Translator Environment](https://en.wikipedia.org/wiki/Rosetta_\(software\)) 或者 Windows [WOW](https://en.wikipedia.org/wiki/Windows_on_Windows)).

{% hint style="info" %}
提示：此功能与 Electron API 的 [app.runningUnderARM64Translation](https://www.electronjs.org/zh/docs/latest/api/app#apprunningunderarm64translation-%E5%8F%AA%E8%AF%BB-macos-windows) 功能类似，您可以使用此属性来提示用户下载应用程序的 arm64 版本，当用户错误地在转译环境下运行 x64 版本。
{% endhint %}

## theme <a href="#cztqx" id="cztqx"></a>

`string` 属性， - 当前主题配色的名称，如 `LIGHT`、`LIGHTGRAY`、`GRAY`、`DARK`、`BLUE`、`PURPLE`。

## userDataPath <a href="#ud9km" id="ud9km"></a>

`string` 属性，当前用户数据目录的路径。

```javascript
console.log(eagle.app.userDataPath);

"C:\\Users\\User\\AppData\\Roaming\\Eagle"
```

{% hint style="info" %}
备注：此功能需要 Eagle 4.0 build12 或更高版本。
{% endhint %}

### &#x20;<a href="#nptwx" id="nptwx"></a>
