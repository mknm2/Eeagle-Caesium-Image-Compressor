# clipboard（剪贴板）

{% hint style="info" %}
提示：推荐使用 Clipboard Viewer（[Win](https://freeclipboardviewer.com/) / [Mac](https://langui.net/clipboard-viewer/)） 工具进行开发调试，让开发过程更顺利。
{% endhint %}

```javascript
await eagle.clipboard.writeText('Example string');

console.log(await eagle.clipboard.readText());
```

***

### 方法 <a href="#z1a5y" id="z1a5y"></a>

## clear() <a href="#tkp0d" id="tkp0d"></a>

清除剪贴板内容。

```javascript
eagle.clipboard.writeText('Example string');
eagle.clipboard.clear();
console.log(eagle.clipboard.readText());	// undefined
```

***

## has(format) <a href="#p4ult" id="p4ult"></a>

当前剪贴板内容是否包含指定的 format

* `format` string - 指定格式
* 返回 boolean - 是否包含指定格式

```javascript
console.log(eagle.clipboard.has('public/utf8-plain-text'));	// false

const buffer = Buffer.from('writeBuffer', 'utf8');
eagle.clipboard.writeBuffer('public/utf8-plain-text', buffer);

console.log(eagle.clipboard.has('public/utf8-plain-text'));	// true
```

***

## writeText(text) <a href="#eear5" id="eear5"></a>

将 `text` 作为纯文本写入剪贴板。

* `text` string - 欲写入文本

```javascript
eagle.clipboard.writeText('Example string');
console.log(eagle.clipboard.readText());	// 'Example string'
```

***

## readText() <a href="#ytddd" id="ytddd"></a>

获取前当剪切板的纯文本内。

* 返回 string

```javascript
console.log(await eagle.clipboard.readText());
```

***

## writeBuffer(format, buffer) <a href="#ol666" id="ol666"></a>

将 `buffer` 作为 `format` 类型写入剪贴板。

* `format` string - 剪切板格式
* `buffer` Buffer - 欲写入内容之 Buffer 格式

```javascript
const buffer = Buffer.from('writeBuffer', 'utf8');
eagle.clipboard.writeBuffer('public/utf8-plain-text', buffer);
```

***

## readBuffer(format) <a href="#gadle" id="gadle"></a>

从剪贴板中读取 `format` 类型的内容。

* 返回 Buffer

```javascript
const buffer = Buffer.from('this is binary', 'utf8');
eagle.clipboard.writeBuffer('public/utf8-plain-text', buffer);

const out = eagle.clipboard.readBuffer('public/utf8-plain-text');

console.log(buffer.equals(out));	// true
```

***

## writeImage(image) <a href="#cwuzf" id="cwuzf"></a>

将 `image` 写入剪贴板。

* `image` [NativeImage](https://www.electronjs.org/zh/docs/latest/api/native-image) - 欲写入剪贴板图像

```javascript
let img = nativeImage.createFromPath('path_to_img_file');
eagle.clipboard.writeImage(img);
```

***

## readImage() <a href="#hfggy" id="hfggy"></a>

从剪贴板中读取图像格式内容。

* 返回 [NativeImage](https://www.electronjs.org/zh/docs/latest/api/native-image)

```javascript
let input = nativeImage.createFromPath('path_to_img_file');
eagle.clipboard.writeImage(input);

let output = eagle.clipboard.readImage();
```

***

## writeHTML(markup) <a href="#naujl" id="naujl"></a>

将 `markup` 作为 HTML 格式写入剪贴板。

* `markup` string

```javascript
eagle.clipboard.writeHTML('<b>Hi</b>');
console.log(eagle.clipboard.readHTML());	// <b>Hi</b>
```

***

## readHTML() <a href="#btaqx" id="btaqx"></a>

从剪贴板中读取 HTML 格式内容。

* 返回 string

```javascript
eagle.clipboard.writeHTML('<b>Hi</b>');
console.log(eagle.clipboard.readHTML());	// <b>Hi</b>
```

***

## copyFiles(paths) <a href="#t8sny" id="t8sny"></a>

将指定文件拷贝到剪切板，支持文件管理器粘贴。

* `paths` strings\[] - 欲复制到剪贴板的文件。

```javascript
eagle.clipboard.copyFiles([
    'path_to_file',
    'path_to_file2'
]);
```

***
