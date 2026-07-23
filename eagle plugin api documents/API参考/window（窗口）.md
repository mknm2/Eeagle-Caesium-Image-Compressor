# window（窗口）

下面示例为 `window` 的常用功能：

```javascript
await eagle.window.show();			// 显示插件窗口
await eagle.window.hide();			// 隐藏插件窗口

await eagle.window.minimize();			// 缩小窗口
await eagle.window.restore();			// 还原缩小

await eagle.window.maximize();			// 最大化窗口
await eagle.window.unmaximize();		// 还原最大化

await eagle.window.setFullScreen(true);		// 设为全屏幕
await eagle.window.setFullScreen(false);	// 离开全屏幕
```

***

#### 方法 <a href="#z1a5y" id="z1a5y"></a>

## show() <a href="#kaydt" id="kaydt"></a>

显示并聚焦于窗口。

* 返回 `Promise<>`

```javascript
await eagle.window.show();
```

***

## showInactive() <a href="#reqm4" id="reqm4"></a>

显示但不聚焦于窗口。

* 返回 `Promise<>`

```javascript
await eagle.window.showInactive();
```

***

## hide() <a href="#mklts" id="mklts"></a>

隐藏插件窗口。

* 返回 `Promise<>`

```javascript
await eagle.window.hide();
```

***

## focus() <a href="#lskqe" id="lskqe"></a>

使插件窗口获取焦点。

* 返回 `Promise<>`

```javascript
await eagle.window.focus();
```

***

## minimize() <a href="#de7df" id="de7df"></a>

最小化插件窗口。

* 返回 `Promise<>`

```javascript
await eagle.window.minimize();
```

***

## isMinimized() <a href="#v47e2" id="v47e2"></a>

判断窗口是否最小化。

* 返回 `Promise<minimized: boolean>`
  * `minimized` boolean - 窗口是否最小化

```javascript
let isMinimized = await eagle.window.isMinimized();
```

***

## restore() <a href="#yvcxf" id="yvcxf"></a>

将插件窗口从最小化状态恢复到以前的状态。

* 返回 `Promise<>`

```javascript
await eagle.window.restore();
```

***

## maximize() <a href="#a53af" id="a53af"></a>

最大化插件窗口。 如果窗口尚未显示，该方法也会将其显示 (但不会聚焦)。

* 返回 `Promise<>`

```javascript
await eagle.window.maximize();
```

***

## unmaximize() <a href="#tg6me" id="tg6me"></a>

取消插件窗口最大化

* 返回 `Promise<>`

```javascript
await eagle.window.unmaximize();
```

***

## isMaximized() <a href="#zxdhs" id="zxdhs"></a>

判断窗口是否最大化

* 返回 `Promise<maximized: boolean>`
  * `maximized` boolean - 窗口是否最大化

```javascript
let isMaximized = await eagle.window.isMaximized();
```

***

## setFullScreen(flag) <a href="#leibk" id="leibk"></a>

设置窗口是否应处于全屏模式。

* `flag` boolean - 是否设为全屏
* 返回 `Promise<>`

```javascript
await eagle.window.setFullScreen(true);		// 进入全屏
await eagle.window.setFullScreen(false);	// 退出全屏
```

***

## isFullScreen() <a href="#irx5v" id="irx5v"></a>

判断窗口是否全屏

* 返回 `Promise<fullscreen: boolean>`
  * `fullscreen` boolean - 窗口是否全屏

```javascript
let isMaximized = await eagle.window.isMaximized();
```

***

## setAspectRatio(aspectRatio) <a href="#plpcl" id="plpcl"></a>

这将使窗口保持长宽比。

* `aspectRatio` Float - 保持的宽高比（宽 / 高）
* 返回 `Promise<>`

```javascript
await eagle.window.setAspectRatio(16/9);		// 将窗口宽高比例限制为 16:9
```

***

## setBackgroundColor(backgroundColor) <a href="#no73b" id="no73b"></a>

设置窗口的背景颜色。

* `backgroundColor` String - 此参数表示您所希望的背景色的HEX代码。
* 返回 `Promise<>`

```javascript
await eagle.window.setBackgroundColor("#FFFFFF");
```

{% hint style="info" %}
注1：此属性可以直接在 manifest.json 进行设置。

注2：这个设定主要用来设定在 HTML / CSS 内容尚未完成前，窗口默认的背景颜色，适当的设定可以避免发生窗口显示出现闪烁的状况。
{% endhint %}

***

## setSize(width, height) <a href="#mq0dz" id="mq0dz"></a>

设置窗口大小

* `width` Integer - 窗口宽度
* `height` - Integer - 窗口高度
* 返回 `Promise<>`

```javascript
await eagle.window.setSize(720, 480);
```

{% hint style="info" %}
注：此属性可以直接在 manifest.json 进行设置。
{% endhint %}

## getSize() <a href="#mq0dz" id="mq0dz"></a>

取得窗口大小

* 返回 `Promise<Integer[]>`

```javascript
await eagle.window.getSize();
```

## setBounds(**bounds**)

调整窗口的大小并将其移动到提供的边界。任何未提供的属性将默认为当前值。

```javascript
await eagle.window.setBounds({ x: 440, y: 225, width: 800, height: 600 })
```

## getBounds()

取得窗口边界

* 返回 `Promise<Rectangle[]>` - 窗口边界的物件

```javascript
await eagle.window.getBounds()
```

## setResizable(resizable) <a href="#e56j2" id="e56j2"></a>

设置窗口是否支持调整大小

* `resizable` boolean - 是否支持调整大小
* 返回 `Promise<>`

```javascript
await eagle.window.setResizable(true);
await eagle.window.setResizable(false);
```

{% hint style="info" %}
注：此属性可以直接在 manifest.json 进行设置。
{% endhint %}

***

## isResizable() <a href="#pyh5l" id="pyh5l"></a>

窗口是否支持调整大小

* 返回 `Promise<resizable: boolean>`
  * `resizable` boolean

```javascript
let isResizable = await eagle.window.isResizable();
```

***

## setAlwaysOnTop(flag) <a href="#p5shn" id="p5shn"></a>

设置窗口是否应始终显示在其他窗口的前面。

* `flag` boolean
* 返回 `Promise<>`

```javascript
await eagle.window.setAlwaysOnTop(true);
await eagle.window.setAlwaysOnTop(false);
```

***

## isAlwaysOnTop() <a href="#quly3" id="quly3"></a>

窗口是否应始终显示在其他窗口的前面

* 返回 `Promise<alwaysOnTop: boolean>`
  * `alwaysOnTop` boolean

```javascript
let isAlwaysOnTop = await eagle.window.isAlwaysOnTop();
```

***

## setPosition(x, y) <a href="#erkhe" id="erkhe"></a>

将窗口移动到 x 和 y。

* `x` Integer
* `y` Integer
* 返回 `Promise<>`

```javascript
await eagle.window.setPosition(100, 200);
```

***

## getPosition() <a href="#ua19x" id="ua19x"></a>

取得插件窗口座标 x 和 y。

* 返回 `Promise<position: Integer[]>`
  * `position` Integer\[]
    * x - position\[0]
    * y - position\[1]

```javascript
let position = await eagle.window.getPosition();	// [100, 200]
```

***

## setOpacity(opacity) <a href="#dlzuz" id="dlzuz"></a>

设置窗口的不透明度， 超出界限的数值被限制在\[0, 1] 范围内。

* `opacity` number - 介于0.0 ( 完全透明 ) 和1.0 ( 完全不透明 ) 之间
* 返回 `Promise<>`

```javascript
await eagle.window.setOpacity(0.5);
```

***

## getOpacity() <a href="#fes0x" id="fes0x"></a>

取得窗口透明度，介于0.0 (完全透明) 和1.0 (完全不透明) 之间。

* 返回 `Promise<opacity: number>`
  * `opacity` number

```javascript
let opacity = await eagle.window.getOpacity();
```

***

## flashFrame(flag) <a href="#vxzv7" id="vxzv7"></a>

启动或停止闪烁窗口, 以吸引用户的注意。

* `flag` boolean - 是否闪烁
* 返回 `Promise<>`

```javascript
await eagle.window.flashFrame(true);
await eagle.window.flashFrame(false);
```

***

## setIgnoreMouseEvents(ignore) <a href="#yvfx8" id="yvfx8"></a>

忽略窗口内的所有鼠标事件。在此窗口中发生的所有鼠标事件将被传递到此窗口下面的窗口，但如果此窗口具有焦点，它仍然会接收键盘事件。

* `ignore` boolean - 是否忽略鼠标事件
* 返回 `Promise<>`

```javascript
await eagle.window.setIgnoreMouseEvents(true);
await eagle.window.setIgnoreMouseEvents(false);
```

{% hint style="info" %}
搭配 setAlwaysOnTop() 功能，将可以创建一个悬浮在屏幕最上方且可穿透鼠标点击的特殊窗口。
{% endhint %}

## capturePage(rect) <a href="#yvfx9" id="yvfx9"></a>

撷取 `rect` 指定区域的页面快照。省略 `rect` 将捕获整个可见页面。

* `rect` object - 可选，截图范围
  * `x` number
  * `y` number
  * `width` number
  * `height` number
* 返回 `Promise<[NativeImage](https://www.electronjs.org/docs/latest/api/native-image)>`

```javascript
const image = await eagle.window.capturePage();
const base64 = image.toDataURL("image/jpeg");

const image2 = await eagle.window.capturePage({ x: 0, y: 0, width: 100, height: 50 });
const buffer = image2.toPNG();
```

## setReferer(url) <a href="#id-4a6f" id="id-4a6f"></a>

函数用来配置当前的引用来源网址（referer URL）。当您配置了引用来源后，后续的请求都会使用这个配置的引用来源。

* `url` 文本 - 引用来源的网址
* 返回 `void`

```javascript
eagle.window.setReferer("https://cn.eagle.cool");
```
