<div align='right'><span>Language:&ensp;</span><span><a href='README-zh.md'>zh</a></span>&ensp;<span><abbr title='Need to be translated!'>en</abbr></span>&ensp;<span><a><abbr title='Need to be translated!'>jp</abbr></a></span></div>

<div align="center">
    <a href="http://erajs.net">Homepage</a> |
    <a href="https://github.com/miswanting/Era.js/wiki">Doc</a> |
    <a href="https://github.com/miswanting/Era.js/projects">Roadmap</a> |
    <a href="https://github.com/miswanting/Era.js/issues">Support</a>
</div>

<h1 align="center">Era.js</h1>
<div align="center">Latest Version: v0.2.0-191112</div>
<div align="center"><sub>The following contents is a description of the development target.<br />The current progress is subject to the progress shown in <a href="https://github.com/miswanting/Era.js/projects">Roadmap</a></sub></div>

## Overview

>   更新于：191111

Era.js 是一个由 TypeScript + Python3 构建的、 **以 [Python3](https://www.python.org/) 为游戏脚本的**次世代跨平台“类Era”富文本游戏引擎。 其基于 [Electron](https://electronjs.org/) 应用平台和 [Semantic UI](https://semantic-ui.com/) 样式库等技术开发的。

## Notice



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

## 技术栈（Tech Stack）

### 核心代码

- 前端语言：[TypeScript](https://www.typescriptlang.org/)
  - 前端响应式框架：[React](https://reactjs.org/)
  - 样式库（其一）：[Semantic UI](https://semantic-ui.com/)
  - 打包工具：[webpack](https://webpack.js.org/)
  - 发布工具：[Electron Builder](https://www.electron.build/)
- 后端语言：[Python3](https://www.python.org/)
  - 测试工具：[pyTest](https://docs.pytest.org/en/latest/)
  - 发布工具：[cx_Freeze](https://anthony-tuininga.github.io/cx_Freeze/)
### 桌面端容器

-   应用容器：[Electron](https://electronjs.org/)

### 移动端容器

-   N/A

## 平台支持情况

|   平台支持情况   |  Web   | Windows | MacOS  | Linux | Android |  iOS   |
| :--------------: | :----: | :-----: | :----: | :---: | :-----: | :----: |
|   引擎开发平台   |  N/A   |  可用   | 未验证 | 可用  |   N/A   |  N/A   |
|   游戏开发平台   |  N/A   |  可用   | 未验证 | 可用  |   N/A   |  N/A   |
| 游戏二次开发平台 |  可用  |  可用   |  可用  | 可用  |  可用   |  可用  |
|   游戏运行平台   | 开发中 |  可用   | 未计划 | 可用  | 未计划  | 未计划 |

## 目录结构

-   Core：核心代码
-   Desktop Container：桌面端适配容器
-   Mobile Container：移动端适配容器
-   SDK：软件开发工具包
-   docs：Pages

## 鸣谢

感谢 [qsjl11](https://github.com/qsjl11) 的 [pyera](https://github.com/qsjl11/pyera) 为本项目提供了灵感和 API 名称的参考；