from typing import Any, Callable, Dict, List, Optional
from time import sleep
from . import mw as m
from .mw import Experimental
version = '0.2.0-α+201213'
codename = 'Dark Elf'
data = None


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
def random_hash(level: int = 4):
    """
    # 获取随机哈希值
    好用，但存在可忽略不计的重复可能性
    """
    return m.random_hash(level)


def timestamp():
    """
    # 获取时间戳
    """
    return m.timestamp()


def uuid():
    """
    # 获取UUID
    """
    return m.uuid()


# Event
def on(event_type: str, callback: Callable[[Any], Any], once: bool = False, tags: Optional[List[str]] = None):
    m.on(event_type, callback, once, tags)


def off(event_type: str, callback: Callable[[Any], Any]):
    m.off(event_type, callback)


def emit(event_type: str, *arg: List[Any], **kw: Dict[Any, Any]):
    m.emit(event_type, *arg, **kw)


def remove_all_listeners(*exception_tags: List[str]):
    m.remove_all_listeners(*exception_tags)


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
    m.init(config)
    global data
    data = m.old_data()


# Data
def cfg(dot_path: Optional[str] = None):
    return m.cfg(dot_path)


def dat(dot_path: Optional[str] = None):
    return m.dat(dot_path)


def sav(dot_path: Optional[str] = None):
    return m.sav(dot_path)


def tmp(key: Optional[str] = None):
    return m.tmp(key)


# Window
def window(style: Dict[str, Any]):
    """
    # 设置窗口样式
    """
    m.window(style)


def title(text: str, style: Optional[Dict[str, str]] = None):
    """
    # 设置窗口标题
    """
    m.title(text, style)


def footer(text: str, style: Optional[Dict[str, str]] = None):
    """
    # 设置窗口脚注
    """
    m.footer(text, style)


def msg(text: str, duration: float = 3, style: Optional[Dict[str, str]] = None):
    """
    # 设置窗口脚注
    """
    m.msg(text, duration, style)


# Page
def page(style: Optional[Dict[str, str]] = None, *exception_tags: List[str]):
    """
    # 生成新的空白页面
    """
    m.page(style, *exception_tags)


def cls(num: int = 0):
    """
    # 清屏
    """
    m.cls(num)


# Block
def mode(type: Optional[str] = 'line', *arg: Any, **kw: Any):
    """
    # 设置新增控件排版模式
    在旧版排版模式会被page()重置，而现在不会了。
    """
    m.mode(type, *arg, **kw)


def divider(text: Optional[str] = None, style: Optional[Dict[str, str]] = None):
    """
    # 插入块级控件：分割线
    """
    return m.divider(text, style)


# Inline
def heading(text: Optional[str] = None, rank: int = 1, style: Optional[Dict[str, str]] = None):
    """
    # 插入行内控件：标题
    """
    return m.heading(text, rank, style)


h = heading


def text(text: Optional[str] = None, wait: bool = False, style: Optional[Dict[str, Any]] = None):
    """
    # 插入行内控件：文本
    """
    return m.text(text, wait, style)


t = text


def button(text: Optional[str] = None, callback: Optional[Callable[[Any], None]] = None, *arg: Any, **kw: Any):
    """
    # 插入行内控件：按钮
    """
    return m.button(text, callback, *arg, **kw)


b = button


def link(text: Optional[str] = None, callback: Optional[Callable[[], None]] = None, style: Optional[Dict[str, str]] = None, *arg: Any, **kw: Any):
    """
    # 插入行内控件：链接
    """
    return m.link(text, callback, style, *arg, **kw)


l = link


def progress(now: float = 0, max: float = 100, style: Optional[List[Dict[str, str]]] = None):
    """
    # 插入行内控件：进度条
    """
    return m.progress(now, max, style)


def rate(now: int = 0, max: int = 5, callback: Optional[Callable[[int], None]] = None, style: Optional[Dict[str, str]] = None) -> object:
    """
    # 插入行内控件：评分
    """
    return m.rate(now, max, callback, style)


def check(text: Optional[str] = None, callback: Optional[Callable[[bool], None]] = None, default: bool = False, style: Optional[Dict[str, str]] = None) -> object:
    """
    # 插入行内控件：多选
    """
    return m.check(text, callback, default, style)


def radio(text_list: List[str], callback: Optional[Callable[[int], None]] = None, default_index: int = 0, style: Optional[Dict[str, str]] = None) -> object:
    """
    # 插入行内控件：单选
    """
    return m.radio(text_list, callback, default_index, style)


def input(callback: Optional[Callable[[str], None]] = None, default: str = '', is_area: bool = False, placeholder: str = '', style: Optional[Dict[str, str]] = None) -> object:
    """
    # 插入行内控件：输入框
    """
    return m.input(callback, default, is_area, placeholder, style)


def dropdown(text_list: Optional[List[str]] = None, callback: Optional[Callable[[int], None]] = None, default_index: int = 0, search: bool = False, multiple: bool = False, placeholder: str = '', allowAdditions: bool = False, style: Optional[Dict[str, str]] = None) -> object:
    """
    # 插入行内控件：下拉列表
    """
    return m.dropdown(text_list, callback, default_index, search,
                      multiple, placeholder, allowAdditions, style)


def img(dot_path: str, inline: bool = False, style: Optional[Dict[str, Any]] = None):
    m.img(dot_path, inline, style)


# Style
def set_style(widget: Callable[[], Any], style: Dict[str, str]):
    """
    # 设置样式
    """
    m.set_style(widget, style)


def reset_style(widget: Callable[[], Any]):
    """
    # 重置样式
    """
    m.reset_style(widget)


# GUI
def goto(ui_func: Callable[[], Any], *arg: Any, **kw: Any):
    """
    # 将界面节点添加到界面栈的末尾，并触发
    """
    m.goto(ui_func, *arg, **kw)


def back(num: int = 1, *arg: Any, **kw: Any) -> None:
    """
    # 从界面栈删除n（默认为1）个界面节点，并触发删除之后的末尾节点
    """
    m.back(num, *arg, **kw)


def repeat(*arg: Any, **kw: Any) -> None:
    """
    # 不对界面栈进行修改，并触发末尾节点
    """
    m.repeat(*arg, **kw)


def clear(num: int = 0) -> None:
    """
    # 清空界面栈
    """
    m.clear(num)


def append(ui_func: Callable[[], Any], *arg: Any, **kw: Any):
    """
    # 将界面节点添加到界面栈的末尾，但不触发
    """
    pass


def get_gui_stack():
    """
    # 返回界面栈，以界面名称列表的格式
    """
    return m.get_gui_stack()


# Data Utilities
def dump_cfg(dot_path: Optional[str] = None, ext: str = 'yaml') -> None:
    """
    # 保存设置数据
    """
    return m.write_cfg(dot_path, ext)


def dump_dat(dot_path: Optional[str] = None, ext: str = 'json') -> None:
    """
    # 保存静态数据
    """
    return m.write_dat(dot_path, ext)


def save(filename_without_ext: Optional[str] = None, meta_info: Optional[Dict[str, str]] = None) -> None:
    """
    # 转储存档数据
    """
    m.save(filename_without_ext, meta_info)


def load(filename_without_ext: Optional[str] = None):
    """
    # 转储存档数据
    """
    m.load(filename_without_ext)


def scan_save_file():
    return m.scan_save_file()


# Hook
def set_console_parser(parser: Callable[[str], str]):
    """
    # 设置终端命令处理函数
    """
    m.set_console_parser(parser)


# Preset
def widget_save() -> None:
    """
    # 插入块级复合控件：存档保存列表（单页）
    """
    def save_file(i, filename_without_ext):
        if i == -1:
            save(timestamp())
        else:
            save(filename_without_ext)
        repeat()
    mode()
    for i, each in enumerate(m.scan_save_file()):
        b('{}. {}'.format(i, each[0]), save_file, i, each[0])
        t()
    b('+', save_file, -1, '')
    t()


def widget_load(callback: Optional[Callable[[], Any]] = None) -> None:
    """
    # 插入块级复合控件：存档加载列表（单页）
    """
    def load_file(i, filename_without_ext):
        load(filename_without_ext)
        if callback is None:
            back()
        else:
            callback()
    mode()
    for i, each in enumerate(scan_save_file()):
        b('{}. {}'.format(i, each[0]), load_file, i, each[0])
        t()


def ui_save():
    """
    # 插入块级复合控件：存档保存列表（单页）
    """
    page()
    h('保存存档')
    t()
    t()
    widget_save()
    t()
    b('返回', back)


def ui_load(callback: Optional[Callable[[], Any]] = None):
    """
    # 插入块级复合控件：存档加载列表（单页）
    """
    page()
    h('加载存档')
    t()
    t()
    widget_load(callback)
    t()
    b('返回', back)


# Wrapper
sleep = sleep


# Experimental
def dangerously_get_engine_core():
    return m.dangerously_get_engine_core()
