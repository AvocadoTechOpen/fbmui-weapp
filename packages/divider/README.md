# Divider 分割线

### 介绍

用于将内容分隔为多个区域。

### 引入

在`app.json`或`index.json`中引入组件，默认为`ES6`版本，`ES5`引入方式参见[快速上手](#/quickstart)

```json
"usingComponents": {
  "fbm-divider": "fbmui-weapp/divider/index"
}
```

> Fbmui Weapp 1.0 版本开始支持此组件，升级方式参见[快速上手](#/quickstart)。

## 代码演示

### 基础用法

```html
<fbm-divider />
```

### 使用 hairline

```html
<fbm-divider hairline />
```

### 虚线

```html
<fbm-divider dashed />
```

### 文本位置

```html
<fbm-divider contentPosition="center">文本</fbm-divider>
<fbm-divider contentPosition="left">文本</fbm-divider>
<fbm-divider contentPosition="right">文本</fbm-divider>
```

### 自定义属性

```html
<fbm-divider contentPosition="center" textColor="#1989fa">文本颜色</fbm-divider>
<fbm-divider contentPosition="center" borderColor="#1989fa">
  border 颜色
</fbm-divider>
<fbm-divider contentPosition="center" fontSize="18">字体大小</fbm-divider>
```

### 自定义样式

```html
<fbm-divider
  contentPosition="center"
  customStyle="color: #1989fa; border-color: #1989fa; font-size: 18px;"
>
  文本
</fbm-divider>
```

## API

### Props

| 参数             | 说明                              | 类型      | 默认值 |
| ---------------- | --------------------------------- | --------- | ------ |
| dashed           | 虚线                              | _boolean_ | false  |
| hairline         | 细线                              | _boolean_ | false  |
| content-position | 文本位置，`left` `center` `right` | _string_  | -      |
| custom-style     | 自定义样式                        | _string_  | -      |

### Slot

| 名称 | 说明           |
| ---- | -------------- |
| 默认 | 自定义文本内容 |
