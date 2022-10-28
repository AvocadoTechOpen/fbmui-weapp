# SendCode 发送验证码

### 介绍

用于手机号发送验证码。

### 引入

在`app.json`或`index.json`中引入组件，详细介绍见[快速上手](#/quickstart#yin-ru-zu-jian)。

```json
"usingComponents": {
  "fbm-send-code": "fbmui-weapp/send-code/index"
}
```

## 代码演示

### 基础用法

```html
<fbm-send-code
  bind:select-countycode="onSelectCode"
  bind:input-phone="onPhoneChange"
  bind:send-code="onSendCode"
  bind:input-code="onComplete"
/>
```

### 自定义属性

```html
<fbm-send-code
  phone-county-code="886"
  phone-placeholder="請輸入手機號碼"
  phone-length="10"
  code-label="驗證碼"
  code-length="5"
  code-placeholder="請輸入驗證碼"
  code-button-color="#6900FF"
  bind:select-countycode="onSelectCode"
  bind:input-phone="onPhoneChange"
  bind:send-code="onSendCode"
  bind:input-code="onComplete"
/>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| phone-county-code | 手机号区号默认值 | _string_ | `86` |
| phone-placeholder | 手机号输入框为空时占位符 | _string_ | `请输入手机号码` |
| code-placeholder | 验证码输入框为空时占位符 | _string_ | `请输入验证码` |
| code-label | 验证码输入框左侧文本 | _string_ | `验证码` |
| code-length | 验证码长度 | _number_ | `4` |
| code-button-text | 发送验证码按钮文本内容 | _string_ | `获取验证码` |
| code-countdown-text | 验证码倒计时文本内容 | _string_ | `s后重新发送` |
| code-button-color | 发送验证码按钮激活状态的颜色 | _string_ | `#4CAF50` |
| code-disabled | 显示验证码倒计时 | _boolean_ | `false` |

### Events

| 事件名 | 说明             | 参数 |
| ------ | ---------------- | ---- |
| bind:select-countycode | 选择区号时触发 | - |
| bind:input-phone | 手机号输入时触发 | event.detail = { phone: phone } |
| bind:send-code | 点击发送验证码按钮时触发 | event.detail = { phone: phone } |
| bind:input-code | 验证码输入时触发 | event.detail = { finish: boolean, phone: phone, code: code } |
