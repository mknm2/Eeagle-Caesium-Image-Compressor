# tagGroup（标签群组）

```javascript
// 取得所有标签群组
const tagGroups = (await eagle.tagGroup.get());
```

## 方法 <a href="#z1a5y" id="z1a5y"></a>

## get() <a href="#x9nu2" id="x9nu2"></a>

获取所有标签群组。

* 返回 `Promise<tagGroups: Object[]>` - tagGroups 查询结果。

```javascript
const tagGroups = (await eagle.tagGroup.get());
```

## create(options) <a href="#x9nu2" id="x9nu2"></a>

获取所有标签群组。

* 返回 `Promise<tagGroup: Object>` - 新建立的标签群组

```javascript
await eagle.tagGroup.create({
  name: "new group",
  color: "red",
  tags: ["tag1", "tag2"],
  description: "群组描述"  // Eagle 4.0 build18+
});
```

***

**实例方法**

## save() <a href="#x9nu2" id="x9nu2"></a>

保存标签群组修改。

* 返回 `Promise<tagGroup: Object>` - 保存结果。

```javascript
const tagGroups = (await eagle.tagGroup.get());
const tagGroup = tagGroups[0];

tagGroup.name = "new name";
tagGroup.color = "red"; // red, orange, yellow, green, aqua, blue, purple, pink
tagGroup.tags = ["tag1", "tag2"];
tagGroup.description = "群组描述";  // Eagle 4.0 build18+

await tagGroup.save();
```

## remove() <a href="#x9nu2" id="x9nu2"></a>

删除标签群组。

* 返回 `Promise<result: boolean>` - result是否删除成功

```javascript
const tagGroups = (await eagle.tagGroup.get());
const tagGroup = tagGroups[0];

await tagGroup.remove();
```

## addTags(options) <a href="#addtags" id="addtags"></a>

增量添加标签到群组，不需要传入完整的标签数组。

* `options` Object - 选项参数
  * `tags` string\[] - 要添加的标签名称数组
  * `removeFromSource` boolean (可选) - 是否从原群组移除标签，默认 `false`
    * `false`：仅添加标签（标签可同时存在多个群组）
    * `true`：移动标签（从原群组移除）
* 返回 `Promise<tagGroup: Object>` - 更新后的标签群组

```javascript
const tagGroups = (await eagle.tagGroup.get());
const tagGroup = tagGroups[0];

// 添加标签（允许同时存在多个群组）
await tagGroup.addTags({
    tags: ['UI', 'UX', 'Typography']
});

// 移动标签（从原群组移除）
await tagGroup.addTags({
    tags: ['Branding'],
    removeFromSource: true
});
```

{% hint style="info" %}
提示：`addTags()` 方法需要 Eagle 4.0 build18 以上版本支持。
{% endhint %}

## removeTags(options) <a href="#removetags" id="removetags"></a>

从群组移除指定标签。

* `options` Object - 选项参数
  * `tags` string\[] - 要移除的标签名称数组
* 返回 `Promise<tagGroup: Object>` - 更新后的标签群组

```javascript
const tagGroups = (await eagle.tagGroup.get());
const tagGroup = tagGroups[0];

// 从群组移除标签
await tagGroup.removeTags({
    tags: ['Outdated', 'Draft']
});
```

{% hint style="info" %}
提示：`removeTags()` 方法需要 Eagle 4.0 build18 以上版本支持。
{% endhint %}

{% hint style="warning" %}
注意：此方法仅从群组移除标签，不会删除标签本身或影响素材上的标签。
{% endhint %}
