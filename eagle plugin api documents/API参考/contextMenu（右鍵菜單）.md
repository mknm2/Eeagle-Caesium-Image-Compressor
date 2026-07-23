# contextMenu（右鍵菜單）

## 方法 <a href="#z1a5y" id="z1a5y"></a>

## open(menuItems) <a href="#tkp0d" id="tkp0d"></a>

弹出右键菜单。

* `menuItems` : [MenuItem](https://www.electronjs.org/docs/latest/api/menu-item)
  * `id` string - 菜单项目 ID
  * `label` string - 菜单项目显示文字
  * `submenu` \[MenuItem] - 子菜单

```javascript
eagle.contextMenu.open([
    {
        id: "edit",
        label: "编辑",
        submenu: [
            {
                id: "resize",
                label: "调整大小",
                click: () => { alert("图片已调整大小") }
            },
            {
                id: "crop",
                label: "裁剪",
                click: () => { alert("图片已裁剪") }
            },
            {
                id: "rotate",
                label: "旋转",
                click: () => { alert("图片已旋转") }
            }
        ]
    },
    {
        id: "effects",
        label: "效果",
        submenu: [
            {
                id: "grayscale",
                label: "灰度",
                click: () => { alert("灰度效果已应用") }
            },
            {
                id: "sepia",
                label: "深褐色",
                click: () => { alert("深褐色效果已应用") }
            },
            {
                id: "invert",
                label: "反色",
                click: () => { alert("颜色反转已应用") }
            }
        ]
    },
    {
        id: "export",
        label: "导出",
        click: () => { alert("图片已导出") }
    }
])
```
