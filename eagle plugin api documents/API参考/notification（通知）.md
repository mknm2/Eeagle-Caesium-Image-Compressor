# notification（通知）

## 方法 <a href="#z1a5y" id="z1a5y"></a>

## show(options) <a href="#tkp0d" id="tkp0d"></a>

显示通知窗口

* `options` Object
  * `title` string - 通知窗口标题
  * `body` string - 通知窗口描述
  * `icon` URL/base64 - 通知窗口图标，支持链接或 base64 格式（可选）
  * `mute` boolean - 提示音效（可选）
  * `duration` Interger - 自动隐藏时间（毫秒）（可选）
* 返回 `Promise<>`

```javascript
await eagle.notification.show({
    title: "Basic Notification",
    body: "Notification from the Plugin process",
    mute: false,
    duration: 3000,
    icon: "https://"
});
```

***
