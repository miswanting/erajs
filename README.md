<p align="center">
    <a href="https://miswanting.github.io/Era.js/">官网</a> |
    <a href="https://github.com/miswanting/Era.js/wiki">文档</a> |
    <a href="https://github.com/miswanting/Era.js/projects">计划</a> |
    <a href="https://github.com/miswanting/Era.js/issues">支持</a>
</p>

<h1 align="center">Era.js</h1>

<div align="center"><sub>以下内容为开发目标，当前填坑进度以<a href="https://github.com/miswanting/Era.js/projects">计划</a>中显示的进度为准</sub></div>

## 引擎描述

【描述更新于191111】

Era.js 是一个由 TypeScript + Python3 构建的、 **以 [Python3](https://www.python.org/) 为游戏脚本的**次世代跨平台“类Era”富文本游戏引擎。 其基于 [Electron](https://electronjs.org/) 应用平台和 [Semantic UI](https://semantic-ui.com/) 样式库等技术开发的



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

- 前端语言：[TypeScript](https://www.typescriptlang.org/)
  - 应用框架：[Electron](https://electronjs.org/)
  - 前端框架：[React](https://reactjs.org/)
  - 样式框架：[Semantic UI](https://semantic-ui.com/)
  - 构建框架：[Gulp](https://gulpjs.com/)
  - 测试工具：[Jest](https://jestjs.io/)
  - 捆绑工具：[webpack](https://webpack.js.org/)
  - 编译工具：[Babel](https://babeljs.io/)
  - 打包工具：[Electron Builder](https://www.electron.build/)
- 后端语言：[Python3](https://www.python.org/)
  - 测试工具：[pyTest](https://docs.pytest.org/en/latest/)
  - 打包工具：[cx_Freeze](https://anthony-tuininga.github.io/cx_Freeze/)
## 平台支持情况

|   平台支持情况   |  Web   | Windows | MacOS  | Linux | Android |  iOS   |
| :--------------: | :----: | :-----: | :----: | :---: | :-----: | :----: |
|   引擎开发平台   |  N/A   |  可用   | 未验证 | 可用  |   N/A   |  N/A   |
|   游戏开发平台   |  N/A   |  可用   | 未验证 | 可用  |   N/A   |  N/A   |
| 游戏二次开发平台 |  可用  |  可用   |  可用  | 可用  |  可用   |  可用  |
|   游戏运行平台   | 开发中 |  可用   | 未计划 | 可用  | 未计划  | 未计划 |

## 鸣谢

感谢 [qsjl11](https://github.com/qsjl11) 的 [pyera](https://github.com/qsjl11/pyera) 为本项目提供了灵感和 API 名称的参考；