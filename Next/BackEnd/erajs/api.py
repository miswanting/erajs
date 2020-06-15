from . import mw as m
version = '0.2.0'
aka = 'brandnew'


########## 系统 ##########
def init(config: dict = None):
    """
    # 初始化引擎
    """
    m.init()


def config(data: dict = None):
    """
    # （设置引擎参数） TODO
    """
    current_config = config
    return current_config


def entry(ui_func: callable = None):
    """
    # （注册入口界面） TODO
    """
    m.entry(ui_func)


def start():
    """
    # （启动引擎） TODO
    """
    m.start()


def exit(auto_save: bool = False):
    """
    # 退出程序
    """
    pass


########## 调试 ##########
def debug(*arg, **kw):
    """
    # 调试输出：Debug

    在任何情形下你都可以使用Debug级别进行调试输出，这会给你带来最为详细的

    debug()和Python的内置print()函数用法类似，但除了在命令行内输出带格式的输出信息之外，还会在`Erajs.log`中进行记录。

    调试等级从低到高分别是`debug`<`info`<`warn`<`error`<`critical`

    TODO 默认调试等级为`info`，即只有`info`或更高的等级会生效。

    TODO 可通过`config({debug_level: 'info'})`设置调试等级
    """
    m.debug(arg)


def info(text):
    """
    # 调试输出：Info
    """
    m.info(text)


def warn(text):
    """
    # 初始化
    """
    m.warn(text)


def error(text):
    """
    # 初始化
    """
    m.error(text)


def critical(text):
    """
    # 初始化
    """
    m.critical(text)


########## 窗口 ##########
def window(style=None):
    """
    # 初始化引擎
    """
    m.window(style)


def title(text):
    """
    # 初始化引擎
    """
    m.title(text)


########## 页面管理 ##########
def page(style=None):
    """
    # 初始化引擎
    """
    m.page(style)


def clear(num=0):
    """
    # 初始化引擎
    """
    m.clear(num)


########## 块 ##########
def mode(type='line', *arg, **kw):
    """
    # 初始化引擎
    """
    m.mode(type, *arg, **kw)


def divider(text=None, style=None):
    """
    # 初始化引擎
    """
    m.divider(text, style)


########## 行 ##########
def heading(text=None, rank=1, style=None):
    """
    # 初始化引擎
    """
    m.heading(text, rank, style)


h = heading


def text(text=None, wait=False, style=None):
    """
    # 初始化引擎
    """
    m.text(text, wait, style)


t = text


def button(text=None, callback=None, *arg, **kw):
    """
    # 初始化引擎
    """
    m.button(text, callback, *arg, **kw)


b = button


def link(text=None, callback=None, style=None, *arg, **kw):
    """
    # 初始化引擎
    """
    m.link(text, callback, style, *arg, **kw)


l = link


def progress(now=0, max=100, style=None):
    """
    # 初始化引擎
    """
    m.progress(now, max, style)


def rate(now=0, max=5, callback=None, style=None):
    """
    # 初始化引擎
    """
    return m.rate(now, max, callback, style)


def check(text=None, callback=None, default=False, style=None):
    """
    # 初始化引擎
    """
    return m.check(text, callback, default, style)


def radio(text_list, callback=None, default_index=0, style=None):
    """
    # 初始化引擎
    """
    return m.radio(text_list, callback, default_index, style)


def input(callback=None, default='', is_area=False, placeholder='', style=None):
    """
    # 初始化引擎
    """
    return m.input(callback, default, is_area, placeholder, style)


def dropdown(text_list=None, callback=None, default_index=0, search=False, multiple=False, placeholder='', allowAdditions=False, style=None):
    """
    # 初始化引擎
    """
    return m.dropdown(text_list, callback, default_index, search,
                      multiple, placeholder, allowAdditions, style)


########## 界面逻辑 ##########
def style(ui_func, *arg, **kw):
    """
    # 初始化引擎
    """
    m.goto(ui_func, *arg, **kw)


########## 界面逻辑 ##########
def goto(ui_func, *arg, **kw):
    """
    # 初始化引擎
    """
    m.goto(ui_func, *arg, **kw)


def back(num=1, *arg, **kw):
    """
    # 初始化引擎
    """
    m.back(num, *arg, **kw)


def repeat(*arg, **kw):
    """
    # 初始化引擎
    """
    pass


def clear_gui(num=0):
    """
    # 初始化引擎
    """
    pass


def append_gui(ui_func, *arg, **kw):
    """
    # 初始化引擎
    """
    pass


def get_gui_list():
    """
    # 初始化引擎
    """
    pass


########## 预设控件 ##########
def show_save_to_save():
    """
    # 初始化引擎
    """
    pass


def show_save_to_load():
    """
    # 初始化引擎
    """
    pass


########## 数据管理 ##########
def cfg(dot_path=None):
    """
    # 初始化引擎
    """
    return m.cfg(dot_path)


def dat(dot_path=None):
    """
    # 初始化引擎
    """
    return m.dat(dot_path)


def sav():
    """
    # 初始化引擎
    """
    return m.sav()


def tmp(key=None):
    """
    # 初始化引擎
    """
    return m.sav()


########## 事件 ##########
def on():
    """
    # 初始化引擎
    """
    pass


def once():
    """
    # 初始化引擎
    """
    pass


def off():
    """
    # 初始化引擎
    """
    pass


def emit():
    """
    # 初始化引擎
    """
    pass


########## 实验性 ##########
def dangerously_get_engine_core():
    """
    # 初始化引擎
    """
    return m.dangerously_get_engine_core()


########## 工具 ##########
def random_hash(level=4):
    """
    # 初始化引擎
    """
    return m.random_hash(level)


########## 弃用 ##########
def get_full_time():
    pass


def tick():
    pass


def save_data_to_file():
    pass


def shake():
    pass


def generate_map():
    pass
