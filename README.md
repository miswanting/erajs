（以下内容为开发目标，当前填坑进度以[计划](https://github.com/miswanting/Era.js/projects)中显示的进度为准）

[官网](https://miswanting.github.io/Era.js/)｜[文档](https://github.com/miswanting/Era.js/wiki)｜[计划](https://github.com/miswanting/Era.js/projects)｜[支持](https://github.com/miswanting/Era.js/issues)


# Era.js

Era.js 是一个由 [TypeScript](https://www.typescriptlang.org/) 构建的、 **以 [Python](https://www.python.org/) 为游戏脚本的** ，基于 [Electron](https://electronjs.org/) 应用平台、 [React](https://reactjs.org/) 前端引擎和 [Bootstrap](https://getbootstrap.com/) 样式库等技术开发的次世代跨平台“类Era”富文本游戏引擎。 

[![GitHub release](https://img.shields.io/github/release/miswanting/Era.js.svg)](https://github.com/miswanting/Era.js/releases) [![Travis](https://img.shields.io/travis/miswanting/Era.js.svg)](https://travis-ci.org/miswanting/Era.js) [![GitHub Release Date](https://img.shields.io/github/release-date/miswanting/Era.js.svg)](https://github.com/miswanting/Era.js/releases) [![Github All Releases](https://img.shields.io/github/downloads/miswanting/Era.js/total.svg)](https://github.com/miswanting/Era.js/releases) [![GitHub last commit (branch)](https://img.shields.io/github/last-commit/miswanting/Era.js/dev.svg)](https://github.com/miswanting/Era.js/commits/dev)

## 开发理念

- 充分利用 HTML5 技术，打造绚丽、整齐、内容丰富、充满设计感的游戏前端；
- 审慎地设置 API，让游戏开发者能够更少地操心与内容和游戏性无关的事物；
- 全部代码跨平台；
- 开发环境、打包和部署一定要简单可靠；
- 对二次开发友好；
- 原则上不砍掉任何所使用的技术所提供的功能。
- 使用最新的技术。

## 引擎特性

- 易于游玩
  - 游戏界面与游戏操作均继承于原 Era 类游戏，并在其基础上进行了相当程度上的优化，弥补了原 Era 类游戏引擎的系统缺陷，并对界面操作逻辑进行了改进；
  - 完全适配 HTML5 富文本显示。
- 易于开发
  - API 设计直观、简洁而全面；
  - 引擎面向游戏开发友好、面向修改友好；
  - 排版、图片、视频、音频等功能将在未来得到游戏引擎原生支持。

## 技术栈

- 内核语言：[TypeScript](https://www.typescriptlang.org/)
- 脚本语言：[Python3](https://www.python.org/)
- 应用平台：[Electron](https://electronjs.org/)
- 前端引擎：[React](https://reactjs.org/)
- 样式库：[Bootstrap](https://getbootstrap.com/)
- 捆绑套件：[WebPack](https://webpack.js.org/)
- 测试套件
  - TypeScript：[Jest](https://jestjs.io/)
  - Python：[pyTest](https://docs.pytest.org/en/latest/)
- 打包套件：
  - TypeScript：[Electron Packager](https://www.npmjs.com/package/electron-packager)
  - Python：[cx_Freeze](https://anthony-tuininga.github.io/cx_Freeze/)

## 鸣谢

感谢 [qsjl11](https://github.com/qsjl11) 的 [pyera](https://github.com/qsjl11/pyera) 为本项目提供了灵感和 API 名称的参考；