# smartFolder（智能文件夹）

{% hint style="danger" %}
**版本需求**：此功能需要 Eagle 4.0 build22 或更高版本。
{% endhint %}

```javascript
// 使用流畅构建器创建智能文件夹
const sf = await eagle.smartFolder.create({
    name: '大尺寸 PNG',
    conditions: [
        eagle.smartFolder.Condition.create('AND', [
            eagle.smartFolder.rule('width')['>']([1920]),
            eagle.smartFolder.rule('type').equal('png'),
        ])
    ]
});

// 修改属性
sf.name = '超大尺寸 PNG';
sf.iconColor = 'blue';

// 保存修改
await sf.save();
```

{% hint style="success" %}
**🦄 最佳实践：** 使用 `getRules()` 方法可以获取所有可用的筛选规则 schema，搭配 `rule()` 流畅构建器和 `Condition.create()` helper 能更安全地构建条件。
{% endhint %}

## 方法 <a href="#methods" id="methods"></a>

## create(options) <a href="#create" id="create"></a>

创建智能文件夹

* `options` Object
  * `name` string - 智能文件夹名称
  * `conditions` Object\[] - 筛选条件
  * `description` string (可选) - 描述
  * `iconColor` string (可选) - 图标颜色
  * `parent` string (可选) - 父智能文件夹 ID
* 返回 `Promise<smartFolder: SmartFolder>` - `smartFolder` 成功创建的智能文件夹

```javascript
// 使用原始 JSON 格式
let sf = await eagle.smartFolder.create({
    name: '猫咪图片',
    conditions: [
        {
            rules: [
                { property: 'name', method: 'contain', value: 'cat' }
            ],
            match: 'AND'
        }
    ]
});

// 使用流畅构建器
let sf2 = await eagle.smartFolder.create({
    name: '大尺寸图片',
    conditions: [
        eagle.smartFolder.Condition.create('AND', [
            eagle.smartFolder.rule('width')['>']([1920]),
            eagle.smartFolder.rule('height')['>']([1080]),
        ])
    ],
    iconColor: 'blue'
});
```

***

## get(options) <a href="#get" id="get"></a>

获取指定条件的智能文件夹。

* `options` Object - 查询条件
  * `id` string (可选) - 智能文件夹 id
  * `ids` string\[] (可选) - 智能文件夹 id 数组
* 返回 `Promise<smartFolders: SmartFolder[]>` - `smartFolders` 查询结果

```javascript
let smartFolders = await eagle.smartFolder.get({
    ids: ['sf_id1', 'sf_id2']
});
```

***

## getAll() <a href="#getall" id="getall"></a>

获取所有智能文件夹。

* 返回 `Promise<smartFolders: SmartFolder[]>` - `smartFolders` 查询结果

```javascript
let smartFolders = await eagle.smartFolder.getAll();
```

***

## getById(smartFolderId) <a href="#getbyid" id="getbyid"></a>

获取对应 `smartFolderId` 的智能文件夹。

* `smartFolderId` string - 智能文件夹 id
* 返回 `Promise<smartFolder: SmartFolder>` - `smartFolder` 查询结果

```javascript
let sf = await eagle.smartFolder.getById('smart_folder_id');
```

***

## getByIds(smartFolderIds) <a href="#getbyids" id="getbyids"></a>

获取对应 `smartFolderIds` 的智能文件夹数组。

* `smartFolderIds` string\[] - 智能文件夹 id 数组
* 返回 `Promise<smartFolders: SmartFolder[]>` - `smartFolders` 查询结果

```javascript
let smartFolders = await eagle.smartFolder.getByIds(['sf_id1', 'sf_id2']);
```

***

## remove(smartFolderId) <a href="#remove" id="remove"></a>

删除指定的智能文件夹。

* `smartFolderId` string - 智能文件夹 id
* 返回 `Promise<result: boolean>`

```javascript
await eagle.smartFolder.remove('smart_folder_id');
```

***

## getRules() <a href="#getrules" id="getrules"></a>

获取可用的筛选规则 schema。返回每个 property 支持的 methods、valueType、options 等信息。

* 返回 `Promise<rules: Object>` - 规则 schema 对象

```javascript
const rules = await eagle.smartFolder.getRules();
console.log(rules);
// {
//     name: { methods: ['contain', 'equal', ...], valueType: 'string' },
//     width: { methods: ['=', '>=', '>', ...], valueType: 'number' },
//     type: { methods: ['equal', 'unequal'], valueType: 'string', options: [...] },
//     ...
// }
```

{% hint style="info" %}
提示：先调用 `getRules()` 获取可用的 property 和 method，再使用 `rule()` 构建器构建条件，可避免无效的筛选条件。
{% endhint %}

***

## rule(property) <a href="#rule" id="rule"></a>

流畅构建器，用于构建单一筛选规则。返回一个包含所有可用 method 的对象，调用 method 后会产生对应的 Rule 对象。

* `property` string - 筛选属性（如 `name`、`width`、`type`）
* 返回 `Object` - 包含所有可用 method 的构建器对象

```javascript
// 名称包含 "cat"
eagle.smartFolder.rule('name').contain('cat');

// 宽度大于 1920
eagle.smartFolder.rule('width')['>']([1920]);

// 类型等于 png
eagle.smartFolder.rule('type').equal('png');

// 评分大于等于 3
eagle.smartFolder.rule('rating')['>=']([3]);

// 名称为空
eagle.smartFolder.rule('name').empty();

// 搭配 Condition.create 使用
let condition = eagle.smartFolder.Condition.create('AND', [
    eagle.smartFolder.rule('name').contain('cat'),
    eagle.smartFolder.rule('width')['>']([1920]),
]);
```

***

## 类：SmartFolder <a href="#class" id="class"></a>

由 SmartFolder API `get` 返回的 Object 类型，提供修改、保存功能。

```javascript
let sf = await eagle.smartFolder.getById('smart_folder_id');

console.log(sf.id);
console.log(sf.name);

sf.name = '新名称';
console.log(sf.name);

await sf.save();
```

{% hint style="success" %}
**🦄 最佳实践：** 为了确保数据安全性，请使用 SmartFolder 实例提供的 `save()` 方法进行数据的存取与修改。
{% endhint %}

***

#### 实例方法 <a href="#instance-methods" id="instance-methods"></a>

### **save()**

保存所有修改

* 返回 `Promise<smartFolder: SmartFolder>` - 更新后的智能文件夹

```javascript
let sf = await eagle.smartFolder.getById('smart_folder_id');
sf.name = '新的名称';
sf.iconColor = 'green';

// 保存修改
await sf.save();
```

***

### **getItems(options)**

获取符合此智能文件夹筛选条件的条目。

* `options` Object (可选)
  * `orderBy` string (可选) - 排序字段
  * `fields` string\[] (可选) - 要返回的字段
* 返回 `Promise<items: Object[]>` - 符合条件的条目数组

```javascript
let sf = await eagle.smartFolder.getById('smart_folder_id');

// 获取所有符合条件的条目
let items = await sf.getItems();

// 指定返回字段
let items2 = await sf.getItems({
    fields: ['id', 'name', 'ext', 'width', 'height']
});
```

***

#### 实例属性 <a href="#instance-properties" id="instance-properties"></a>

`SmartFolder` 实例包含以下属性：

### **`id` string**

只读，智能文件夹 id。

### **`name` string**

智能文件夹名称。

### **`conditions` Object\[]**

筛选条件数组。

### **`description` string**

智能文件夹描述。

### **`icon` string**

只读，智能文件夹图标。

### **`iconColor` string**

智能文件夹图标颜色。

```javascript
let sf = await eagle.smartFolder.getById('smart_folder_id');

// 设置图标颜色为红色
sf.iconColor = eagle.smartFolder.IconColor.Red;

// 或直接使用字符串值
sf.iconColor = 'red';

// 保存修改
await sf.save();
```

### **`modificationTime` integer**

只读，最后修改时间戳。

### **`children` SmartFolder\[]**

只读，子智能文件夹数组。

```javascript
let children = sf.children;
console.log(children[0].name);
```

### **`parent` string**

只读，父智能文件夹 ID。

### **`imageCount` integer**

只读，符合条件的条目数量。

***

## Helper Classes <a href="#helpers" id="helpers"></a>

### **SmartFolder.Rule**

规则对象，用于描述单一筛选规则。

```javascript
// 通过构造函数创建
let rule = new eagle.smartFolder.Rule('name', 'contain', 'cat');

// 或使用 rule() 流畅构建器（推荐）
let rule2 = eagle.smartFolder.rule('name').contain('cat');
```

### **SmartFolder.Condition**

条件组对象，包含多条规则和逻辑运算。

```javascript
// 使用 Condition.create 创建
let condition = eagle.smartFolder.Condition.create('AND', [
    eagle.smartFolder.rule('name').contain('cat'),
    eagle.smartFolder.rule('width')['>']([1920]),
]);

// 创建排除条件
let excludeCondition = eagle.smartFolder.Condition.create('OR', [
    eagle.smartFolder.rule('type').equal('gif'),
], 'FALSE');
```

**Condition.create(match, rules, boolean)**

* `match` string - `'AND'` 或 `'OR'`
* `rules` Object\[] - 规则数组
* `boolean` string (可选) - `'TRUE'`（包含，默认）或 `'FALSE'`（排除）

***

## 静态属性 <a href="#static-properties" id="static-properties"></a>

### **`IconColor` Object**

提供预定义的图标颜色常量，用于设置智能文件夹的 `iconColor` 属性。

```javascript
eagle.smartFolder.IconColor.Red      // 'red'
eagle.smartFolder.IconColor.Orange   // 'orange'
eagle.smartFolder.IconColor.Yellow   // 'yellow'
eagle.smartFolder.IconColor.Green    // 'green'
eagle.smartFolder.IconColor.Aqua     // 'aqua'
eagle.smartFolder.IconColor.Blue     // 'blue'
eagle.smartFolder.IconColor.Purple   // 'purple'
eagle.smartFolder.IconColor.Pink     // 'pink'
```

{% hint style="success" %}
**🦄 最佳实践：** 建议使用 `eagle.smartFolder.IconColor` 常量而非直接使用字符串值，这样可以获得更好的代码提示和类型安全。
{% endhint %}
