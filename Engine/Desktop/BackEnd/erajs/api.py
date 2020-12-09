from typing import Any, Callable, Dict, Optional

from . import mw as m


# Debug
def debug(*arg: Any, **kw: Any):
    return m.debug(*arg, **kw)


def info(*arg: Any, **kw: Any):
    return m.info(*arg, **kw)


def warn(*arg: Any, **kw: Any):
    return m.warn(*arg, **kw)


def error(*arg: Any, **kw: Any):
    return m.error(*arg, **kw)


def critical(*arg: Any, **kw: Any):
    return m.critical(*arg, **kw)


# Tools
def random_hash():
    pass


def timestamp():
    pass


def uuid():
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
    pass


def entry(entry_func: Callable[[], None]):
    pass


def start(entry_func: Callable[[], None]):
    pass


def exit(entry_func: Callable[[], None]):
    pass


def init():
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
    pass


def title():
    pass


def footer():
    pass


def msg():
    pass


# Page
def page():
    pass


def cls():
    pass


# Block
def mode():
    pass


def divider():
    pass


# Inline
def heading():
    pass


h = heading


def text(text: Optional[str] = None, wait: bool = False, style: Optional[Dict[str, str]] = None):
    m.text(text, wait, style)


t = text


def button():
    pass


b = button


def link():
    pass


l = link


def progress():
    pass


def rate():
    pass


def check():
    pass


def radio():
    pass


def input():
    pass


def dropdown():
    pass


# Style
def set_style():
    pass


def reset_style():
    pass


# GUI
def goto():
    pass


def back():
    pass


def repeat():
    pass


def clear():
    pass


def append():
    pass


def get_gui_stack():
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
