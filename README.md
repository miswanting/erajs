<div align='right'>
  <span>Language:&ensp;</span>
  <span><abbr title='Need to be translated!'>en</abbr></span>&ensp;
  <span><a href='README-jp.md'><abbr title='Need to be translated!'>jp</abbr></a></span>&ensp;
  <span><a href='README-zh.md'>zh</a></span>
</div>

<div align="center">
  <a href="http://erajs.net">Homepage</a> |
  <a href="https://github.com/miswanting/Era.js/wiki">Doc</a> |
  <a href="https://github.com/miswanting/Era.js/projects">Roadmap</a> |
  <a href="https://github.com/miswanting/Era.js/issues">Support</a> |
  <a href="https://github.com/miswanting/Era.js/wiki/FAQ">FAQ</a>
</div>


<h1 align="center">Era.js</h1>
<div align="center">Latest Version: v0.3.0-alpha.220622</div>
<div align="center"><sub>The following contents is a description of the development target.<br />The current progress is subject to the progress shown in <a href="https://github.com/miswanting/Era.js/projects">Roadmap</a></sub></div>

## Overview

>   Description Updated on: 220622

<div align='center'><img src="ss.png" alt="screenshot" width="50%" /></div>

Era.js is a next-generation cross-platform rich text game engine built by TypeScript + Python3, with Python3 as the game script. It is developed based on both web & desktop platform and Span Charm opinionated style library.

## Notice

🚧 Work In Heavy Progress. Ultra-Experimental. 🚧

## Development Philosophy

- Make full use of HTML5 technology to create a gorgeous, neat, rich, full of design sense of the game front end, only for text-based game;
- Carefully set up the API so that game developers can worry less about things that have nothing to do with content or gameplay;
- [WIP] All code cross-platform;
- The development environment, packaging and deployment must be simple and reliable;
- Be friendly to re-development;
- In principle, do not cut off any functionality provided by the technology used.
- Use the latest technology.

## Features

- Easy to Operate
  - Introduced HTML5 interface logic, easy to get started.
- Easy to Develop
  - API design is intuitive, concise and comprehensive;
  - The engine is development-friendly and modification-friendly;
  - Typography, graphics, video, audio and other functions will be supported by the game engine native in the future.

## Tech Stack

### Core

- The front-end language：[TypeScript]()
  - User Interface Framework: [Vue.js 3](https://vuejs.org/)
  - Responsive style library: Span Charm(opinionated style)
- The Back-end language(& Game Script): [Python 3](https://www.python.org/)
### Application Container for Desktop

-   [Tauri](https://tauri.studio/)

### Application Container for Mobile

-   [Flutter?](https://flutter.dev/)

## Platform Support

| Platform Support | Web  | Windows | MacOS | Linux | Android | iOS  |
| :--------------: | :--: | :-----: | :---: | :---: | :-----: | :--: |
|    Engine dev    |  ×   |    ○    |   ?   |   ○   |    ×    |  ×   |
|     Game dev     |  ×   |    ○    |   ?   |   ○   |    ×    |  ×   |
|   Game re-dev    |  ○   |    ○    |   ○   |   ○   |    ○    |  ○   |
|     Game run     |  ×   |    ○    |   ?   |   ○   |    ×    |  ×   |

## Directory Structure

-   Assets: Accessory code improves engine usability
-   docs: Documents
-   Engine: Engine Folder
-   SDK: Software Development Kit
-   UtilityScripts: Tool scripts improve engine flow

## Thanks

Thanks to [qsjl11](https://github.com/qsjl11)'s [pyera project](https://github.com/qsjl11/pyera) for providing inspiration and reference of API naming for this project;