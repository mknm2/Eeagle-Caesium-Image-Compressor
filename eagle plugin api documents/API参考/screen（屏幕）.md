# screen（屏幕）

## 方法 <a href="#z1a5y" id="z1a5y"></a>

## getCursorScreenPoint() <a href="#tkp0d" id="tkp0d"></a>

当前鼠标的绝对位置 x, y。

* 返回 `Promise<point: Object>`
  * `point` Object
    * `point.x`
    * `point.y`

```javascript
let point = await eagle.screen.getCursorScreenPoint();
```

***

## getPrimaryDisplay() <a href="#sskcn" id="sskcn"></a>

返回主屏幕信息

* 返回 `Promise<display: Display>`
  * `display` [Display](https://www.electronjs.org/zh/docs/latest/api/structures/display) 对象 - 当前屏幕信息

```javascript
let display = await eagle.screen.getPrimaryDisplay();
```

***

## getAllDisplays() <a href="#eev58" id="eev58"></a>

返回一个数组Display\[]，表示当前可用的屏幕。

* 返回 `Promise<displays: Display[]>`
  * `displays` [Display](https://www.electronjs.org/zh/docs/latest/api/structures/display)\[]

```javascript
let displays = await eagle.screen.getAllDisplays();
```

***

## getDisplayNearestPoint(point) <a href="#ox9dk" id="ox9dk"></a>

取得插件窗口座标 x 和 y。

* `point` Object
  * `point.x` Interger 类型
  * `point.y` Interger 类型
* 返回 `Promise<display: Display>`
  * `display` [Display](https://www.electronjs.org/zh/docs/latest/api/structures/display) 对象 - 当前屏幕信息

```javascript
let display = await eagle.screen.getDisplayNearestPoint({ x: 100, y: 100 });
```
