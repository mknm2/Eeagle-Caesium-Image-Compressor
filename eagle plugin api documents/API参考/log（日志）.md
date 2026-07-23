# log（日志）

{% hint style="info" %}
点击这里查看 Eagle [软件日志](https://docs-cn.eagle.cool/article/92-how-do-i-get-the-error-log)获取方式。
{% endhint %}

```javascript
eagle.log.debug('debug message from plugin');
eagle.log.info('info message from plugin');
eagle.log.warn('warn message from plugin');
eagle.log.error('error message from plugin');

// [13:19:39.845] [debug] [plugin] "debug message from plugin"
// [13:19:39.845] [info] [plugin] "info message from plugin"
// [13:19:39.845] [warn] [plugin] "warn message from plugin"
// [13:19:39.845] [error] [plugin] "error message from plugin"
```

***

#### 方法 <a href="#z1a5y" id="z1a5y"></a>

## debug(obj) <a href="#haugb" id="haugb"></a>

记录 debug 类型内容到软件日志

* `obj` Object - 欲记录之内容，可以是 `Object`、`String`、`Array` 等各种格式

```javascript
eagle.log.debug(obj);
eagle.log.debug(array);
eagle.log.debug('error message from plugin');
```

***

## info(obj) <a href="#qxf3f" id="qxf3f"></a>

记录 info 类型内容到软件日志

* `obj` Object - 欲记录之内容，可以是 `Object`、`String`、`Array` 等各种格式

***

## warn(obj) <a href="#ctpju" id="ctpju"></a>

记录 warn 类型内容到软件日志

* `obj` Object - 欲记录之内容，可以是 `Object`、`String`、`Array` 等各种格式

***

## error(obj) <a href="#mo6j1" id="mo6j1"></a>

记录 error 类型内容到软件日志

* `obj` Object - 欲记录之内容，可以是 `Object`、`String`、`Array` 等各种格式

```javascript
try {
    let a = {};
    a.b.c = 'test';
}
catch (err) {
    eagle.log.error('error message from plugin');
    eagle.log.error(err.stack || err);
}

// [13:23:24.191] [error] [plugin] "error message from plugin"
// [13:23:24.191] [error] [plugin] "TypeError: Cannot set properties of undefined (setting 'c')\n    at <anonymous>:3:11"
```

***
