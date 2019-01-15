# coding:utf-8
import typing as ty
from . import mid
m = mid.mid
version = '0.1.0'
data = {}

# 显示控制

_ = mid._


def init():
    """【系统：初始化】\n
    初始化Era.js引擎。\n
    该语句必须在以下所有语句调用之前调用。\n
    """
    global data
    data = m.get_data()


def debug(text: str) -> None:
    """【系统：输出Debug级别的调试信息】\n
    text: str
        调试信息。
    """
    global m
    m.debug(text)


def info(text: str) -> None:
    """【系统：输出Info级别的调试信息】\n
    text: str
        调试信息。
    """
    global m
    m.info(text)


def warn(text: str) -> None:
    """【系统：输出Warn级别的调试信息】\n
    text: str
        调试信息。
    """
    global m
    m.warn(text)


def error(text: str) -> None:
    """【系统：输出Error级别的调试信息】\n
    text: str
        调试信息。
    """
    global m
    m.error(text)


def critical(text: str) -> None:
    """【系统：输出Critical级别的调试信息】\n
    text: str
        调试信息。
    """
    global m
    m.critical(text)


def title(text: str) -> None:
    """【功能：修改游戏窗口标题】\n
    text: str
        窗口标题文本。
    """
    global m
    m.title(text)


def page(color: str = 'default') -> None:
    """【功能：新建页面】\n
    新建一个新的页面，后续代码中新增的所有的控件都将加入到新的页面中。\n
    color: str
        页面背景颜色；如："#ff0000" / "#f00"（红色）。\n
    """
    global m
    m.page(color)


def t(text: str = '', wait: bool = False, color: str = 'default', bcolor: str = 'default') -> None:
    """【控件：文本】\n
    向当前页面的最后一行的末尾插入文本。\n
    text: str
        文本的内容。为 "" 时，换行（对所有控件均可换行）；
    wait: bool
        是否等待。为 True 时，文本停在当前地方，直到点击鼠标，才会执行后续的代码。
        点击鼠标左键：跳过本段文字；
        点击鼠标右键：跳过全部文字；
    color: str
        文字颜色。
    bcolor: str
        文字背景颜色。
    """
    global m
    m.t(text, wait, color, bcolor)


def b(text: str, func: callable, *arg, **kw) -> None:
    """【控件：按钮】\n
    向当前页面的最后一行的末尾插入按钮。\n
    text: str
        按钮上的文本。
    func: callable
        返回函数。
        当按钮按下时，返回函数被触发，且其执行效果类似于 func(*arg, **kw)；
    color: str
        设置按钮颜色。颜色名可从 https://www.w3schools.com/colors/colors_names.asp 中任意选择，如 "red"。
    disabled: bool
        设置按钮禁用与否。若为True，则按钮被禁用，无法点击。
    popup: str
        设置按钮气泡文本。若设置，则当鼠标移到按钮上方的时候，会弹出写有文本的气泡。
        一般用于对按钮功能的解释，或一些与游戏性有关的用途。
    用法举例：
        api.b('TEST_BUTTON', test_func, 1, 'two', color='red', popup='测试文本')
        会显示一个文本为TEST_BUTTON的红色按钮，
        鼠标移上去会显示一个写有“测试文本”的气泡出现，
        按下按钮，会触发test_func函数
            相当于执行代码：test_func(1, 'two')
            注意：color和popup参数会被自动除去，不会传入要触发的函数中
    """
    global m
    m.b(text, func, *arg, **kw)


def l(text: str, func: callable, *arg, **kw) -> None:
    """【控件：按钮】\n
    向当前页面的最后一行的末尾插入按钮。\n
    text: str
        按钮上的文本。
    func: callable
        返回函数。
        当按钮按下时，返回函数被触发，且其执行效果类似于 func(*arg, **kw)；
    color: str
        设置按钮颜色。颜色名可从 https://www.w3schools.com/colors/colors_names.asp 中任意选择，如 "red"。
    disabled: bool
        设置按钮禁用与否。若为True，则按钮被禁用，无法点击。
    popup: str
        设置按钮气泡文本。若设置，则当鼠标移到按钮上方的时候，会弹出写有文本的气泡。
        一般用于对按钮功能的解释，或一些与游戏性有关的用途。
    用法举例：
        api.b('TEST_BUTTON', test_func, 1, 'two', color='red', popup='测试文本')
        会显示一个文本为TEST_BUTTON的红色按钮，
        鼠标移上去会显示一个写有“测试文本”的气泡出现，
        按下按钮，会触发test_func函数
            相当于执行代码：test_func(1, 'two')
            注意：color和popup参数会被自动除去，不会传入要触发的函数中
    """
    global m
    m.l(text, func, *arg, **kw)


def h(text, rank=1, color='default', bcolor='default') -> None:
    """【控件：标题】\n
    text: str
        标题显示的文本。
    rank: int
        标题等级。1最大。
    color: str
        文字颜色。
    bcolor: str
        文字背景颜色。
    """
    global m
    m.h(text, rank, color, bcolor)


def rate(now=0,  max=5, func=None, disabled=True) -> None:
    """【控件：评级】\n
    显示评级，由几个星星构成。\n
    now: int
        当前得分
    max: int
        满分
    func: callable
        返回函数，当评级的数值改变时，func 执行，且其参数为新的得分。
    disabled: bool
        是否禁用互动。当值为 True 时，评级只显示但无法修改。
    """
    global m
    m.rate(now, max, func, disabled)


def progress(now, max=100, length=100) -> None:
    """【控件：进度条】\n
    显示进度条，其长度为 length。\n
    now: int
        当前值
    max: int
        最大值
    length: int
        进度条在屏幕上显示的长度（按像素算）
    """
    global m
    m.progress(now, max, length)


def radio(choice_list, default_index=0, func=None) -> None:
    """【控件：单项选择】\n
    显示单项选择。\n
    choice_list: list
        表示显示内容，如["低", "中", "高"]；
    default_index: list
        表示默认选中的内容，如 1 表示 “中” 被默认选中。
    func: callable
        返回函数，当单选的状态被改变时触发，其参数为当前新选中的文本。
    """
    global m
    m.radio(choice_list, default_index, func)


def input(func=None, default='') -> None:
    """【控件：输入框】\n
    显示输入框。\n
    func: callable
        返回函数，当输入框的内容被改变时触发，其参数为当前新输入的文本。
    default: str
        默认值。
    """
    global m
    m.input(func, default)


def dropdown(options, func=None, default='', search=False, multiple=False, placeholder='', allowAdditions=False) -> None:
    """【控件：下拉列表】\n
    显示下拉列表。\n
    options: list
        表示下拉列表中的内容，如["低", "中", "高"]；
    func: callable
        返回函数，当下拉列表的值被改变时触发，其参数为当前下拉列表中的项（str或list）。
    default: str
        默认值。
    search: bool
        设置是否可以在下拉列表的输入框中搜索值。
    multiple: bool
        设置是否可以多选。
    placeholder: str
        输入框中的占位符文本，起提示作用，不会影响输入。
    allowAdditions: bool
        设置是否可以在下拉列表的输入框中输入文本并敲回车来新增选项。
    """
    global m
    m.dropdown(options, func, default, search,
               multiple, placeholder, allowAdditions)


def divider(text='') -> None:
    """【控件：水平分割线】\n
    显示水平分割线。\n
    text: str
        在水平分割线的正中显示的文本。
    Bug：显示文字暂时有Bug。
    """
    global m
    m.divider(text)


def chart(chart_type, data, width=200, height=200) -> None:
    """【开发中】【控件：图表】\n
    显示一种图表。\n
    chart_type: str
        设置图表类型。
    data: dict
        设置图表数据。
    width: int
        设置图表显示宽度（像素）。
    height: int
        设置图表显示高度（像素）。
    """
    global m
    m.chart(chart_type, data, width, height)


def clear(num=0) -> None:
    """【系统：清除页面】\n
    num: int
        值为0：清除所有页面（默认）；
        值为正整数：清除从新到旧的num个页面。
    """
    global m
    m.clear(num)


def goto(func, *arg, **kw) -> None:
    """【界面：进入到下一界面】\n
    func: callable
        要进入的界面函数。
        当执行时，相当于触发了func(*arg, **kw)
    """
    global m
    m.goto(func, *arg, **kw)


def back(num=1, *arg, **kw) -> None:
    """【界面：退回到上一界面】\n
    num: int
        返回到上num个界面。默认为上一个界面。
    """
    global m
    m.back(num, *arg, **kw)


def repeat(*arg, **kw) -> None:
    """【界面：重新显示当前界面】\n
    """
    global m
    m.repeat(*arg, **kw)


def clear_gui(num=0) -> None:
    """【界面：清除界面逻辑节点】\n
    num: int
        从后向前清除num个界面逻辑节点；
        值为0时，清除全部界面逻辑节点。
    """
    global m
    m.clear_gui(num)


def append_gui(func, *arg, **kw) -> None:
    """【界面：新增界面逻辑节点】\n
    向界面链的末尾增加一个界面逻辑节点（但不触发）。\n
    """
    global m
    m.append_gui(func, *arg, **kw)


def get_gui_list() -> None:
    """【界面：获取当前界面逻辑链】\n
    获取一个list，内含当前界面链中各个界面逻辑节点的名字。
    """
    global m
    return m.get_gui_list()


def show_save_to_save() -> None:
    """【复合控件：存档列表】\n
    显示存档列表（存档用）。\n
    """
    global m
    m.show_save_to_save()


def show_save_to_load(func_after_load) -> None:
    """【复合控件：读档列表】\n
    显示存档列表（读档用）。\n
    func_after_load: callable
        读取存档成功后，该函数会被执行。
    """
    global m
    m.show_save_to_load(func_after_load)


def mode(type='default', *arg, **kw) -> None:
    """【开发中】【系统：变更显示/排版模式】\n
    变更显示/排版模式。\n
    """
    global m
    m.mode(type, *arg, **kw)


def exit(save=False) -> None:
    """【系统：退出程序】\n
    save: bool
        值为True时，临时存档会被保存。
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


def generate_map():
    global m
    return m.generate_map()


def add_listener(type, listener, hash='', removable=True):
    global m
    return m.add_listener(type, listener, hash, removable)


def remove_listener(type, listener=None, hash=''):
    global m
    return m.remove_listener(type, listener, hash)


def dispatch_event(type, target='', value={}):
    global m
    return m.dispatch_event(type, target, value)


def enable(*arg):
    pass


def is_enabled(name):
    pass


def disable(*arg):
    pass


def get_dynamic_api():
    return
