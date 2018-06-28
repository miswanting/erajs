（以下内容为开发目标，当前填坑进度以实物为准）

# Era.js

Era.js 是一个以**Python为游戏脚本语言的**、基于[Electron](https://electronjs.org/)，[GraphQL](https://graphql.org/)等技术开发的次世代`类Era`富文本游戏引擎。

[官网](https://miswanting.github.io/Era.js/)｜[文档](https://github.com/miswanting/Era.js/wiki)｜[计划](https://github.com/miswanting/Era.js/projects)｜[支持](https://github.com/miswanting/Era.js/issues)

## 开发理念

- 充分利用HTML5技术，打造绚丽、整齐、内容丰富、充满设计感的游戏前端；
- 审慎地设置API，让游戏开发者能够更少地操心与内容和游戏性无关的事物；
- 全部代码跨平台；
- 开发环境、打包和部署一定要简单可靠；
- 对二次开发友好；
- 原则上不砍掉任何所使用的技术所提供的功能。

## 引擎特性

- 易于游玩
  - 游戏界面与游戏操作均继承于原Era类游戏，并在其基础上进行了相当程度上的优化，弥补了原Era类游戏引擎的系统缺陷，并对界面操作逻辑进行了改进；
  - 完全适配HTML5富文本显示。
- 易于开发
  - API设计直观、简洁而全面；
  - 引擎面向游戏开发友好、面向修改友好；
  - 排版、图片、视频、音频等功能将在未来得到游戏引擎原生支持。

## 鸣谢

感谢[qsjl11](https://github.com/qsjl11)的[pyera](https://github.com/qsjl11/pyera)为本项目提供了cx_Freeze路径修正代码和API名称的参考；