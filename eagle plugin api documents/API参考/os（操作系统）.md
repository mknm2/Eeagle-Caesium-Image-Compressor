# os（操作系统）

## 方法 <a href="#z1a5y" id="z1a5y"></a>

## tmpdir() <a href="#a6hjz" id="a6hjz"></a>

取得操作系统默认的暂存文件路径。

* 返回 `string` - 操作系统默认的暂存文件路径

```javascript
eagle.os.tmpdir();         // 'C:\\Users\\User\\AppData\\Local\\Temp'
```

***

## version() <a href="#gxw5i" id="gxw5i"></a>

取得操作系统內核版本的字符串。

* 返回 `string` - 操作系统內核版本的字符串

```javascript
eagle.os.version();         // 'Windows 10 Home'
```

***

## type() <a href="#jauoc" id="jauoc"></a>

返回的操作系統名稱。\
例如：在 macOS 上返回 `Darwin`，在 Windows 上返回 `Windows_NT`。

* 返回 `string` - 操作系統名稱

```javascript
eagle.os.type();         // 'Windows_NT', 'Darwin'
```

***

## release() <a href="#jmfqv" id="jmfqv"></a>

返回操作系统的发行版。

* 返回 `string` - 操作系统的发行版

```javascript
eagle.os.release();         // '10.0.22621'
```

***

## hostname() <a href="#w5b2t" id="w5b2t"></a>

返回操作系统的主机名。

* 返回 `string` - 操作系统的主机名

```javascript
eagle.os.hostname();         // 'My_Windows'
```

***

## homedir() <a href="#iiwv7" id="iiwv7"></a>

返回当前用户的 home 目录。

* 返回 `string` - 当前用户的 home 目录

```javascript
eagle.os.homedir();         // 'C:\\Users\\User'
```

***

## arch() <a href="#eekcv" id="eekcv"></a>

返回操作系統 CPU 架構。

* 返回 `string` - 当前 CPU 架構
  * `x64`
  * `arm64`
  * `x86`

```javascript
eagle.os.arch();         // 'x64'
```

### &#x20;<a href="#nptwx" id="nptwx"></a>
