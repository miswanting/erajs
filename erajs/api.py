# coding:utf-8
from . import game

g = game.game
version = '0.1.0'
data = {}

# 显示控制


def init():
    """
    初始化Era.js引擎。\n
    该语句必须在以下所有语句调用之前使用。\n
    """
    global data
    data = g.get_data()


def title(text):
    """
    更改游戏窗口标题。\n
    """
    global g
    g.title(text)


def page():
    """
    新建页面。\n
    """
    global g
    g.page()


def t(text='', wait=False):
    """
    显示 text。\n
    当 text 为 "" 时，换行（所有控件间均可以使用该方法换行）；\n
    当 wait 为 True 时，停在当前地方，直到点击鼠标左键或鼠标右键。\n
    左键跳过一句，右键跳过一段。\n
    """
    global g
    g.t(text, wait)


def b(text, func, *arg, **kw):
    """
    显示按钮，其内容为 text。\n
    func 为 返回函数，当按钮按下时，func 执行，且其执行参数为 *arg 和 **kw ；\n
    常见用法：api.b('TEST_BUTTON', api.goto, NEXT_PAGE_FUNC)\n
    注意：若向该参数显式传递参数 disabled=True 时，会生成一个被禁用的按钮\n
    """
    global g
    g.b(text, func, *arg, **kw)


def h(text):
    """
    显示标题，其内容为 text。\n
    """
    global g
    g.h(text)


def rate(now=0,  max=5, func=None, disabled=True):
    """
    显示评级，其内容为 text。\n
    func 为 返回函数，当评级的数值改变时，func 执行，且其执行参数为：\n
    {
        "value": 【改变后的评级数值】
    }\n
    """
    global g
    return g.rate(now, max, func, disabled)


def progress(now, max=100, length=100):
    """
    显示进度条，其长度为 length。\n
    now 表示当前值；max 表示最大值。\n
    """
    global g
    return g.progress(now, max, length)


def radio(choice_list, default_index=0, func=None):
    """
    显示单选。\n
    choice_list 表示显示内容，如["低", "中", "高"]；\n
    default_index 表示默认选中的内容，如 1 表示 “中” 默认被选中。\n
    func 是返回函数，当单选的状态被改变时触发，其参数为：\n
    {
        "value": 【当前选中的内容】
    }\n
    """
    global g
    return g.radio(choice_list, default_index, func)


def input(func=None):
    """
    显示输入框。\n
    func 是返回函数，当输入框的内容被改变时触发，其参数为：\n
    {
        "value": 【改变后的内容】
    }\n
    Tips：可与按钮连用进行自定义文本的输入。\n
    """
    global g
    return g.input(func)


def divider(text=''):
    """
    显示横线。\n
    Bug：显示文字暂时有Bug。\n
    """
    global g
    return g.divider(text)


def chart(chart_type, data, width=200, height=200):
    global g
    return g.chart(chart_type, data, width, height)


def clear(last=False):
    """
    清除所有显示。\n
    """
    global g
    g.clear(last)


def goto(func, *arg, **kw):
    """
    【界面逻辑函数】\n
    进入其中的页面。\n
    """
    global g
    g.goto(func, *arg, **kw)


def back(*arg, **kw):
    """
    【界面逻辑函数】\n
    退回到上一个浏览的页面。\n
    """
    global g
    g.back(*arg, **kw)


def repeat(*arg, **kw):
    """
    【界面逻辑函数】\n
    重复当前的页面。\n
    Tips：刷新数据时常用\n
    """
    global g
    g.repeat(*arg, **kw)


def clear_gui(num=0):
    """
    【界面逻辑函数】\n
    清除所有界面逻辑关系。\n
    """
    global g
    g.clear_gui(num)


def show_save_to_save():
    """
    显示当前存档（存档用）。\n
    """
    global g
    g.show_save_to_save()


def show_save_to_load(func_after_load):
    """
    显示当前存档（读档用）。\n
    """
    global g
    g.show_save_to_load(func_after_load)


def mode():
    """
    改变显示模式。\n
    """
    global g
    pass


def exit(save=False):
    """
    改变显示模式。\n
    """
    global g
    g.exit(save)

# 资源控制


def add(item):
    global g
    return g.add(item)


def get(pattern):
    global g
    return g.get(pattern)


# EraTime
def get_full_time():
    """
    以文本方式返回当前时间（全部）。\n
    """
    global g
    return g.get_full_time()


def tick():
    """
    时间流逝一个单位。\n
    """
    global g
    g.tick()


def ________________________________________________________________():
    pass


def new_hash():
    """
    返回一个HASH字符串。\n
    Tips：可用于索引和标记。\n
    """
    global g
    return g.new_hash()
