# coding:utf-8
import typing as t
from . import mid
m = mid.mid
version = '0.1.0'
data = {}

# 显示控制

_ = mid._


def init():
    """
    初始化Era.js引擎。\n
    该语句必须在以下所有语句调用之前使用。\n
    """
    global data
    data = m.get_data()


def debug(text: t.Text) -> None:
    """
    调试用输出。\n
    """
    global m
    m.debug(text)


def info(text: str) -> None:
    """
    调试用输出。\n
    """
    global m
    m.info(text)


def warn(text: str) -> None:
    """
    调试用输出。\n
    """
    global m
    m.warn(text)


def error(text: str) -> None:
    """
    调试用输出。\n
    """
    global m
    m.error(text)


def critical(text: str) -> None:
    """
    调试用输出。\n
    """
    global m
    m.critical(text)


def title(text: str) -> None:
    """
    更改游戏窗口标题。\n
    """
    global m
    m.title(text)


def page(color: str = 'default') -> None:
    """
    新建页面。\n
    """
    global m
    m.page(color)


def t(text: str = '', wait: bool = False, color: str = 'default', bcolor: str = 'default') -> None:
    """
    显示 text。\n
    当 text 为 "" 时，换行（所有控件间均可以使用该方法换行）；\n
    当 wait 为 True 时，停在当前地方，直到点击鼠标左键或鼠标右键。\n
    左键跳过一句，右键跳过一段。\n
    """
    global m
    m.t(text, wait, color, bcolor)


def b(text: str, func: callable, *arg, **kw) -> None:
    """
    显示按钮，其内容为 text。\n
    func 为 返回函数，当按钮按下时，func 执行，且其执行参数为 *arg 和 **kw ；\n
    常见用法：api.b('TEST_BUTTON', api.goto, NEXT_PAGE_FUNC)\n
    注意：若向该参数显式传递参数 disabled=True 时，会生成一个被禁用的按钮\n
    """
    global m
    m.b(text, func, *arg, **kw)


def h(text, rank=1, color='default', bcolor='default') -> None:
    """
    显示标题，其内容为 text。\n
    """
    global m
    m.h(text, rank, color, bcolor)


def rate(now=0,  max=5, func=None, disabled=True) -> None:
    """
    显示评级，其内容为 text。\n
    func 为 返回函数，当评级的数值改变时，func 执行，且其执行参数为：\n
    {
        "value": 【改变后的评级数值】
    }\n
    """
    global m
    m.rate(now, max, func, disabled)


def progress(now, max=100, length=100) -> None:
    """
    显示进度条，其长度为 length。\n
    now 表示当前值；max 表示最大值。\n
    """
    global m
    m.progress(now, max, length)


def radio(choice_list, default_index=0, func=None) -> None:
    """
    显示单选。\n
    choice_list 表示显示内容，如["低", "中", "高"]；\n
    default_index 表示默认选中的内容，如 1 表示 “中” 默认被选中。\n
    func 是返回函数，当单选的状态被改变时触发，其参数为：\n
    {
        "value": 【当前选中的内容】
    }\n
    """
    global m
    m.radio(choice_list, default_index, func)


def input(func=None, default='') -> None:
    """
    显示输入框。\n
    func 是返回函数，当输入框的内容被改变时触发，其参数为：\n
    {
        "value": 【改变后的内容】
    }\n
    Tips：可与按钮连用进行自定义文本的输入。\n
    """
    global m
    m.input(func, default)


def dropdown(options, func=None, default='', search=False, multiple=False, placeholder='', allowAdditions=False) -> None:
    """
    显示输入框。\n
    func 是返回函数，当输入框的内容被改变时触发，其参数为：\n
    {
        "value": 【改变后的内容】
    }\n
    Tips：可与按钮连用进行自定义文本的输入。\n
    """
    global m
    m.dropdown(options, func, default, search,
               multiple, placeholder, allowAdditions)


def divider(text='') -> None:
    """
    显示横线。\n
    Bug：显示文字暂时有Bug。\n
    """
    global m
    m.divider(text)


def chart(chart_type, data, width=200, height=200) -> None:
    global m
    m.chart(chart_type, data, width, height)


def clear(num=0) -> None:
    """
    清除所有显示。\n
    """
    global m
    m.clear(num)


def goto(func, *arg, **kw) -> None:
    """
    【界面逻辑函数】\n
    进入其中的页面。\n
    """
    global m
    m.goto(func, *arg, **kw)


    """
    【界面逻辑函数】\n
    退回到上一个浏览的页面。\n
def back(num=1, *arg, **kw) -> None:
    """
    global m
    m.back(*arg, **kw)


def repeat(*arg, **kw) -> None:
    """
    【界面逻辑函数】\n
    重复当前的页面。\n
    Tips：刷新数据时常用\n
    """
    global m
    m.repeat(*arg, **kw)


def clear_gui(num=0) -> None:
    """
    【界面逻辑函数】\n
    清除所有界面逻辑关系。\n
    """
    global m
    m.clear_gui(num)


def append_gui(func, *arg, **kw) -> None:
    """
    【界面逻辑函数】\n
    向界面链的末尾增加一个界面（但不触发）。\n
    """
    global m
    m.append_gui(func, *arg, **kw)


def get_gui_list() -> None:
    """
    【界面逻辑函数】\n
    向界面链的末尾增加一个界面（但不触发）。\n
    """
    global m
    return m.get_gui_list()


def show_save_to_save() -> None:
    """
    显示当前存档（存档用）。\n
    """
    global m
    m.show_save_to_save()


def show_save_to_load(func_after_load) -> None:
    """
    显示当前存档（读档用）。\n
    """
    global m
    m.show_save_to_load(func_after_load)


def mode() -> None:
    """
    改变显示模式。\n
    """
    global m
    pass


def exit(save=False) -> None:
    """
    改变显示模式。\n
    """
    global m
    m.exit(save)


# 资源控制
def add(item) -> None:
    global m
    return m.add(item)


def get(pattern) -> None:
    global m
    return m.get(pattern)


# EraTime
def get_full_time() -> str:
    """
    以文本方式返回当前时间（全部）。\n
    """
    global m
    return m.get_full_time()


def tick() -> None:
    """
    时间流逝一个单位。\n
    """
    global m
    m.tick()


def ________________________________________________________________():
    pass


def new_hash() -> str:
    """
    返回一个HASH字符串。\n
    Tips：可用于索引和标记。\n
    """
    global m
    return m.new_hash()


def save_data_to_file(dot_path, ext='yaml'):
    global m
    return m.save_data_to_file(dot_path, ext)


def shake(duration=500):
    global m
    return m.shake(duration)
