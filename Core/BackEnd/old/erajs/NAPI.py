from typing import Any, Callable

from . import NMID as m


# 系统输出
def debug(*arg) -> None:
    """
    # 【调试级】标准输出
    用于输出开发阶段的调试信息；\n
    该级别的调试信息将不会被log收录；\n
    当程序打包之后将会不再显示该类信息。
    ## 用法举例
    ```python
    a.debug("此处变量tmp的值为：{}".format(tmp))
    a.debug("1", "2", "Switch!")
    ```
    """
    return m.msg(0, *arg)


def info(*arg) -> None:
    """
    # 【信息级】标准输出
    用于输出面向用户的指示信息；\n
    会被log收录；
    ## 用法举例
    ```python
    a.info("此处变量tmp的值为：{}".format(tmp))
    a.info("1", "2", "Switch!")
    ```
    """
    return m.msg(1, *arg)


def warn(*arg) -> None:
    """
    # 【警告级】标准输出
    用于输出面向用户的警告信息；\n
    含义：系统运行存在隐藏风险；\n
    会被log收录；
    ## 用法举例
    ```python
    a.warn("此处变量tmp的值为：{}".format(tmp))
    a.warn("1", "2", "Switch!")
    ```
    """
    print()
    return m.msg(2, *arg)


def error(*arg) -> None:
    """
    # 【错误级】标准输出
    用于输出面向用户的错误信息；\n
    含义：系统运行出现非致命的错误；\n
    会被log收录；
    ## 用法举例
    ```python
    a.error("此处变量tmp的值为：{}".format(tmp))
    a.error("1", "2", "Switch!")
    ```
    """
    return m.msg(3, *arg)


def critical(*arg) -> None:
    """
    # 【危险级】标准输出
    用于输出面向用户的危险警告信息；\n
    含义：系统运行出现致命错误，系统将在此中断；\n
    会被log收录；
    ## 用法举例
    ```python
    a.critical("此处变量tmp的值为：{}".format(tmp))
    a.critical("1", "2", "Switch!")
    ```
    """
    return m.msg(4, *arg)


# 引擎生命周期
def config(**kw) -> None:
    """
    # 配置引擎参数
    用于设置引擎的
    ## 用法
    ```python
    a.config(configFilePath=./log/back.log)
    a.config({"configFilePath": "./log/back.log"})
    ```
    ## 引擎配置分项说明
    - configFilePath：系统日志文件存放路径与文件名
    - scriptIP：脚本服务器绑定IP地址
    - scriptPort：脚本服务器绑定端口地址
    - frontIP：前端服务器绑定IP地址
    - frontPort：前端服务器绑定端口地址
    - serverIP：上位服务器绑定IP地址
    - serverPort：上位服务器绑定端口地址
    - hasFrontServer：是否存在前端服务器
    - hasServer：是否存在上位服务器

    ## 引擎默认配置
    ```json
    {
        "configFileName": "./back.log",
        "scriptIP": "localhost",
        "scriptPort": 11994,
        "frontIP": "localhost",
        "frontPort": 11995,
        "serverIP": "localhost",
        "serverPort": 11995,
        "hasFrontServer": false,
        "hasServer": false
    }
    ```
    """
    return m.config(**kw)


def init() -> None:
    return m.init()


def entry() -> None:
    return m.entry()


def run() -> None:
    return m.run()


# 数据获取
std = m.std()  # data文件夹中的静态数据，全局引用
data = m.data()  # 【旧】data文件夹中的数据文件，全局引用，拆成
save = m.save()  # 当前存档的存档数据
cache = m.cache()  # 缓存数据，动态数据，全局引用
# File
# cfg/: cfg
# data/: std
# cache/: cache
# save/: data, tmp, save
# Data
# Server: cfg + std + cache
# World: data + tmp
# Player: save + ram

# 窗口方法


def title(text: Any) -> None:
    pass


# 页级方法
def page():
    pass


# 块级方法
def mode():
    pass


def divider():
    pass


# 行级方法
def header(text: Any, callback: Callable = None) -> object:
    return object


def text(*arg) -> object:
    return object


def link(text: Any, callback: Callable = None) -> object:
    return object


def button(text: Any, callback: Callable = None, *arg, **kw) -> object:
    return object


def rate(now: int = 0, callback: Callable = None) -> object:
    print('警告：该API有变动！')
    return object


def progress() -> object:
    return object


def check() -> object:
    return object


def radio() -> object:
    return object


def input() -> object:
    return object


def dropdown() -> object:
    return object


def rate(now: int = 0, callback: Callable = None) -> object:
    print('警告：该API有变动！')
    return object


def progress() -> object:
    pass


def check() -> object:
    pass


def radio() -> object:
    pass


def input() -> object:
    pass


def dropdown() -> object:
    pass


# 整体构筑
def push(component, data) -> object:
    pass


# 界面逻辑
def clear(num: int = 0) -> object:
    pass


def goto(func, *arg, **kw) -> object:
    pass


def back(func, *arg, **kw) -> object:
    pass


def repeat(func, *arg, **kw) -> object:
    pass


def clear_gui(func, *arg, **kw) -> object:
    pass


def append_gui(func, *arg, **kw) -> object:
    pass


def get_gui_list(func, *arg, **kw) -> object:
    pass


# 样式控制
def get_default_style_by_component() -> None:
    pass


# 界面预设
def show_save_to_save() -> None:
    pass


def show_save_to_load() -> None:
    pass


# 别名定义
h = header
t = text
l = link
b = button
