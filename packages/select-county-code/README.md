# SelectCountyCode 选择手机号区号

### 介绍

选择手机号区号。

### 引入

在`app.json`或`index.json`中引入组件，详细介绍见[快速上手](#/quickstart#yin-ru-zu-jian)。

```json
"usingComponents": {
  "fbm-select-county-code": "fbmui-weapp/select-county-code/index"
}
```

## 代码演示

### 用法

```html
<fbm-select-county-code
  bind:select="onSelect"
/>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |

### Events

| 事件名 | 说明             | 参数 |
| ------ | ---------------- | ---- |
| bind:select | 选择区号时触发 | { area: "中国香港", key: "CN_245", val: "852" } |
