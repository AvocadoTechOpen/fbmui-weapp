# Sidebar 侧边导航

### 介绍

垂直展示的导航栏，用于在不同的内容区域之间进行切换。

### 引入

在`app.json`或`index.json`中引入组件，详细介绍见[快速上手](#/quickstart#yin-ru-zu-jian)。

```json
"usingComponents": {
  "fbm-sidebar": "fbmui-weapp/sidebar/index",
  "fbm-sidebar-item": "fbmui-weapp/sidebar-item/index"
}
```

> Fbmui Weapp 1.0 版本开始支持此组件，升级方式参见[快速上手](#/quickstart)

## 代码演示

### 基础用法

通过在`fbm-sidebar`上设置`activeKey`属性来控制选中项。

```html
<fbm-sidebar active-key="{{ activeKey }}">
  <fbm-sidebar-item title="标签名" />
  <fbm-sidebar-item title="标签名" />
  <fbm-sidebar-item title="标签名" />
</fbm-sidebar>
```

```javascript
Page({
  data: {
    activeKey: 0,
  },
});
```

### 徽标提示

设置`dot`属性后，会在右上角展示一个小红点。设置`badge`属性后，会在右上角展示相应的徽标。

```html
<fbm-sidebar active-key="{{ activeKey }}">
  <fbm-sidebar-item title="标签名" dot />
  <fbm-sidebar-item title="标签名" badge="5" />
  <fbm-sidebar-item title="标签名" badge="99+" />
</fbm-sidebar>
```

### 禁用选项

通过`disabled`属性禁用选项。

```html
<fbm-sidebar active-key="{{ activeKey }}">
  <fbm-sidebar-item title="标签名" />
  <fbm-sidebar-item title="标签名" disabled />
  <fbm-sidebar-item title="标签名" />
</fbm-sidebar>
```

### 监听切换事件

设置`change`方法来监听切换导航项时的事件。

```html
<fbm-sidebar active-key="{{ activeKey }}" bind:change="onChange">
  <fbm-sidebar-item title="标签名 1" />
  <fbm-sidebar-item title="标签名 2" />
  <fbm-sidebar-item title="标签名 3" />
</fbm-sidebar>

<fbm-notify id="fbm-notify" />
```

```js
import Notify from 'fbmui-weapp/dist/notify/notify';

Page({
  data: {
    activeKey: 0,
  },

  onChange(event) {
    Notify({ type: 'primary', message: event.detail });
  },
});
```

## API

### Sidebar Props

| 参数      | 说明         | 类型               | 默认值 |
| --------- | ------------ | ------------------ | ------ |
| activeKey | 选中项的索引 | _string \| number_ | `0`    |

### Sidebar Event

| 事件名 | 说明           | 参数               |
| ------ | -------------- | ------------------ |
| change | 切换徽章时触发 | 当前选中徽章的索引 |

### Sidebar 外部样式类

| 类名         | 说明         |
| ------------ | ------------ |
| custom-class | 根节点样式类 |

### SidebarItem Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 内容 | _string_ | `''` |
| dot | 是否显示右上角小红点 | _boolean_ | `false` |
| info | 图标右上角徽标的内容（已废弃，请使用 badge 属性） | _string \| number_ | `''` |
| badge `v1.5.0` | 图标右上角徽标的内容 | _string \| number_ | `''` |
| disabled | 是否禁用该项 | _boolean_ | `false` |

### SidebarItem Slot

| 名称  | 说明                                        |
| ----- | ------------------------------------------- |
| title | 自定义标题栏，如果设置了`title`属性则不生效 |

### SidebarItem Event

| 事件名 | 说明           | 参数                            |
| ------ | -------------- | ------------------------------- |
| click  | 点击徽章时触发 | `event.detail` 为当前徽章的索引 |

### SidebarItem 外部样式类

| 类名         | 说明         |
| ------------ | ------------ |
| custom-class | 根节点样式类 |
