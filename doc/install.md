# 安装说明

## 文档工具的安装及使用

### 安装Gitbook

Gitbook对node版本有要求，需要使用特定版本号。

```javascript
// 执行如下命令安装Gitbook工具
npm install -g gitbook-cli

// 第一次运行gitbook命令时会自动安装Gitbook。
// 此时请使用node版本号为：10.21.0，13.6.0.
// 使用node版本号：12.18.3，14.8.0时安装报错。
// 深度怀疑12.xxx和14.xxx都不可以

```

### 安装gh-pages

```javascript
// 执行如下命令安装
npm install -g gh-pages
```

### 更新文档

```javascript
// 构建文档
gitbook build
// 发布文档到GitHub的gh-pages分支
gh-pages -d _book
```
