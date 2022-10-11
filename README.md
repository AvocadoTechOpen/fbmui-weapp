<p align="center">
  <img alt="logo" src="https://hr.fbmms.cn/assets/images/a37f97b18691a2fec277.png" width="60">
</p>

<h3 align="center">轻量、可靠的小程序 UI 组件库</h3>

<p align="center">
  🌈 <a href="https://AvocadoTechOpen.github.io/fbmui-weapp">文档网站（GitHub）</a>
  &nbsp;
</p>

---

## 预览

扫描下方小程序二维码，体验组件库示例：

<img src="https://img.yzcdn.cn/fbmui-weapp/qrcode-201808101114.jpg" width="200" height="200" style="margin-top: 10px;" >

## 使用之前

使用 Fbmui Weapp 前，请确保你已经学习过微信官方的 [小程序简易教程](https://developers.weixin.qq.com/miniprogram/dev/framework/) 和 [自定义组件介绍](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/)。

## 安装

### 方式一. 通过 npm 安装 (推荐)

小程序已经支持使用 npm 安装第三方包，详见 [npm 支持](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html?search-key=npm)

```bash
# 通过 npm 安装
npm i fbmui-weapp -S --production

# 通过 yarn 安装
yarn add fbmui-weapp --production

# 安装 0.x 版本
npm i fbmui-weapp -S --production
```

### 方式二. 下载代码

直接通过 git 下载 Fbmui Weapp 源代码，并将 `dist` 目录拷贝到自己的项目中。

```bash
git clone https://github.com/AvocadoTechOpen/fbmui-weapp.git
```

## 使用组件

以按钮组件为例，只需要在 json 文件中引入按钮对应的自定义组件即可

```json
{
  "usingComponents": {
    "fbm-button": "/path/to/fbmui-weapp/dist/button/index"
  }
}
```

接着就可以在 wxml 中直接使用组件

```html
<fbm-button type="primary">按钮</fbm-button>
```

## 在开发者工具中预览

```bash
# 安装项目依赖
npm install

# 执行组件编译
npm run dev
```

打开[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)，把`fbmui-weapp/example`目录添加进去就可以预览示例了。

PS：关于 `fbm-area` Area 省市区选择组件，地区数据初始化可以直接在云开发环境中导入`fbmui-weapp/example/database_area.JSON` 文件使用。

## 基础库版本

Fbmui Weapp 最低支持到小程序基础库 2.6.5 版本。

## 开源协议

本项目基于 [MIT](https://zh.wikipedia.org/wiki/MIT%E8%A8%B1%E5%8F%AF%E8%AD%89)协议，请自由地享受和参与开源。
