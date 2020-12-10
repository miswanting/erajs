from typing import Any, Callable, Dict, Optional

from . import mw as m
from .mw import Experimental


# Debug
def debug(*arg: Any, **kw: Any):
    """
    # 调试输出：Debug

    在任何情形下你都可以使用Debug级别进行调试输出，这会给你带来最为详细的

    debug()和Python的内置print()函数用法类似，但除了在命令行内输出带格式的输出信息之外，还会在`Erajs.log`中进行记录。

    调试等级从低到高分别是`debug`<`info`<`warn`<`error`<`critical`

    TODO 默认调试等级为`info`，即只有`info`或更高的等级会生效。

    TODO 可通过`config({debug_level: 'info'})`设置调试等级
    """
    return m.debug(*arg, **kw)


def info(*arg: Any, **kw: Any):
    """
    # 调试输出：Info
    """
    return m.info(*arg, **kw)


def warn(*arg: Any, **kw: Any):
    """
    # 调试输出
    """
    return m.warn(*arg, **kw)


def error(*arg: Any, **kw: Any):
    """
    # 调试输出
    """
    return m.error(*arg, **kw)


def critical(*arg: Any, **kw: Any):
    """
    # 调试输出
    """
    return m.critical(*arg, **kw)


# Tools
def random_hash():
    """
    # 获取随机哈希值
    好用，但存在可忽略不计的重复可能性
    """
    pass


def timestamp():
    """
    # 获取时间戳
    """
    pass


def uuid():
    """
    # 获取UUID
    """
    pass


# Event
def on():
    pass


def off():
    pass


def emit():
    pass


def remove_all_listeners():
    pass


# Engine
def setup(config: Dict[str, Any]):
    """
    # （设置引擎参数） TODO
    """
    pass


def entry(entry_func: Callable[[], None]):
    """
    # （注册入口界面） TODO
    """
    pass


def start(entry_func: Callable[[], None]):
    """
    # （启动引擎） TODO
    """
    pass


def exit(entry_func: Callable[[], None]):
    """
    # 退出程序 TODO
    """
    pass


def init(config: Optional[Dict[str, Any]] = None):
    """
    # 初始化 Era.js 游戏引擎
    - ↑上面的 API 可以在初始化之前使用
    - ↓下面的 API 只能在初始化之后使用
    """
    return m.init()


# Data
def cfg(dot_path: Optional[str] = None):
    return m.cfg(dot_path)


def dat(dot_path: Optional[str] = None):
    return m.dat(dot_path)


def sav():
    return m.sav()


def tmp(key: Optional[str] = None):
    return m.tmp(key)


# Window
def window():
    """
    # 设置窗口样式
    """
    pass


def title():
    """
    # 设置窗口标题
    """
    pass


def footer():
    """
    # 设置窗口脚注
    """
    pass


def msg():
    """
    # 设置窗口脚注
    """
    pass


# Page
def page():
    """
    # 生成新的空白页面
    """
    pass


def cls():
    """
    # 清屏
    """
    pass


# Block
def mode():
    """
    # 设置新增控件排版模式
    在旧版排版模式会被page()重置，而现在不会了。
    """
    pass


def divider():
    """
    # 插入块级控件：分割线
    """
    pass


# Inline
def heading():
    """
    # 插入行内控件：标题
    """
    pass


h = heading


def text(text: Optional[str] = None, wait: bool = False, style: Optional[Dict[str, str]] = None):
    """
    # 插入行内控件：文本
    """
    return m.text(text, wait, style)


t = text


def button():
    """
    # 插入行内控件：按钮
    """
    pass


b = button


def link():
    """
    # 插入行内控件：链接
    """
    pass


l = link


def progress():
    """
    # 插入行内控件：进度条
    """
    pass


def rate():
    """
    # 插入行内控件：评分
    """
    pass


def check():
    """
    # 插入行内控件：多选
    """
    pass


def radio():
    """
    # 插入行内控件：单选
    """
    pass


def input():
    """
    # 插入行内控件：输入框
    """
    pass


def dropdown():
    """
    # 插入行内控件：下拉列表
    """
    pass


# Style
def set_style():
    """
    # 设置样式
    """
    pass


def reset_style():
    """
    # 重置样式
    """
    pass


# GUI
def goto():
    """
    # 将界面节点添加到界面栈的末尾，并触发
    """
    pass


def back():
    """
    # 从界面栈删除n（默认为1）个界面节点，并触发删除之后的末尾节点
    """
    pass


def repeat():
    """
    # 不对界面栈进行修改，并触发末尾节点
    """
    pass


def clear():
    """
    # 清空界面栈
    """
    pass


def append():
    """
    # 将界面节点添加到界面栈的末尾，但不触发
    """
    pass


def get_gui_stack():
    """
    # 返回界面栈，以界面名称列表的格式
    """
    pass


# Data Utilities
def dump_cfg():
    pass


def dump_dat():
    pass


def save():
    pass


def load():
    pass


def scan_save_file():
    pass


# Hook
def set_console_parser():
    pass


# Preset
def widget_save():
    pass


def widget_load():
    pass


def ui_save():
    pass


def ui_load():
    pass


# Experimental
def dangerously_get_engine_core():
    return m.dangerously_get_engine_core()
