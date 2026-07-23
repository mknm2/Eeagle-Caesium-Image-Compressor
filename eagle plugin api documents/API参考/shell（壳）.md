# shell（壳）

`shell` 模块提供与桌面集成相关的功能。

***

#### 方法 <a href="#z1a5y" id="z1a5y"></a>

## beep() <a href="#tkp0d" id="tkp0d"></a>

播放系统哔哔的提示声音。

* 返回 `Promise<void>`

```javascript
await eagle.shell.beep();
```

***

## openExternal(url) <a href="#haugb" id="haugb"></a>

使用系统默认方式打开指定 URL。注意：如果系统没有设置默认应用，此功能将不会有任何反应。

* `url` string - 欲打开之URL
* 返回 `Promise<void>`

```javascript
await eagle.shell.openExternal('https://www.google.com/');
```

***

## openPath(path) <a href="#bh5yu" id="bh5yu"></a>

使用系统默认方式打开指定路径。

* `path` string - 欲打开文件路径
* 返回 `Promise<void>`

```javascript
await eagle.shell.openPath('path_to_file');
```

***

## showItemInFolder(path) <a href="#sdnth" id="sdnth"></a>

在文件管理器中显示指定的文件、文件夹。

* `path` string - 欲显示指定的文件、文件夹
* 返回 `Promise<void>`

```javascript
await eagle.shell.showItemInFolder('path_to_file_or_directory');
```

### &#x20;<a href="#nptwx" id="nptwx"></a>
