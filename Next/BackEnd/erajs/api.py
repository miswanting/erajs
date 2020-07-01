from . import mw as m
version = '0.2.0-α+200612'
aka = 'Dark Elf'
data = None


########## 系统 ##########
def init(config: dict = None):
    """
    # 初始化引擎
    """
    m.init(config)
    # 兼容
    global data
    data = m.old_data()


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
    # 调试输出
    """
    m.warn(text)


def error(text):
    """
    # 调试输出
    """
    m.error(text)


def critical(text):
    """
    # 调试输出
    """
    m.critical(text)


########## 窗口 ##########
def window(style=None):
    """
    # 设置窗口样式
    """
    m.window(style)


def title(text, style=None):
    """
    # 设置窗口标题
    """
    m.title(text)


def footer(text, style=None):
    pass


def msg(text, style=None):
    pass


########## 页面管理 ##########
def page(style=None):
    """
    # 生成新的空白页面
    """
    m.page(style)


def cls(num=0):
    """
    # 清屏
    """
    m.cls(num)


########## 块 ##########
def mode(type='line', *arg, **kw):
    """
    # 设置新增控件排版模式
    """
    m.mode(type, *arg, **kw)


def divider(text=None, style=None):
    """
    # 插入块级控件：分割线
    """
    m.divider(text, style)


########## 行 ##########
def heading(text=None, rank=1, style=None):
    """
    # 插入行内控件：标题
    """
    m.heading(text, rank, style)


h = heading


def text(text=None, wait=False, style=None):
    """
    # 插入行内控件：文本
    """
    m.text(text, wait, style)


t = text


def button(text=None, callback=None, *arg, **kw):
    """
    # 插入行内控件：按钮
    """
    m.button(text, callback, *arg, **kw)


b = button


def link(text=None, callback=None, style=None, *arg, **kw):
    """
    # 插入行内控件：链接
    """
    m.link(text, callback, style, *arg, **kw)


l = link


def progress(now=0, max=100, style=None):
    """
    # 插入行内控件：进度条
    """
    m.progress(now, max, style)


def rate(now=0, max=5, callback=None, style=None):
    """
    # 插入行内控件：评分
    """
    return m.rate(now, max, callback, style)


def check(text=None, callback=None, default=False, style=None):
    """
    # 插入行内控件：多选
    """
    return m.check(text, callback, default, style)


def radio(text_list, callback=None, default_index=0, style=None):
    """
    # 插入行内控件：单选
    """
    return m.radio(text_list, callback, default_index, style)


def input(callback=None, default='', is_area=False, placeholder='', style=None):
    """
    # 插入行内控件：输入框
    """
    return m.input(callback, default, is_area, placeholder, style)


def dropdown(text_list=None, callback=None, default_index=0, search=False, multiple=False, placeholder='', allowAdditions=False, style=None):
    """
    # 插入行内控件：下拉列表
    """
    return m.dropdown(text_list, callback, default_index, search,
                      multiple, placeholder, allowAdditions, style)


########## 样式管理 ##########
def set_style(widget, style):
    """
    # 设置样式
    """
    m.set_style(widget, style)


def reset_style(widget):
    """
    # 重置样式
    """
    m.reset_style(widget)


########## 界面逻辑 ##########
def goto(ui_func, *arg, **kw):
    """
    # 将界面节点添加到界面栈的末尾，并触发
    """
    m.goto(ui_func, *arg, **kw)


def back(num=1, *arg, **kw):
    """
    # 从界面栈删除n（默认为1）个界面节点，并触发删除之后的末尾节点
    """
    m.back(num, *arg, **kw)


def repeat(*arg, **kw):
    """
    # 不对界面栈进行修改，并触发末尾节点
    """
    pass


def clear(num=0):
    """
    # 清空界面栈
    """
    pass


def insert(ui_func, *arg, **kw):
    """
    # 将界面节点添加到界面栈的末尾，但不触发
    """
    pass


def get_gui_stack():
    """
    # 返回界面栈，以界面名称列表的格式
    """
    pass


########## 数据管理 ##########
def cfg(dot_path=None):
    """
    # 返回设置数据
    """
    return m.cfg(dot_path)


def dat(dot_path=None):
    """
    # 返回静态数据
    """
    return m.dat(dot_path)


def sav(dot_path=None):
    """
    # 返回存档数据
    """
    return m.sav(dot_path)


def tmp(key=None):
    """
    # 返回临时数据
    """
    return m.tmp(key)


def write_cfg(dot_path=None, ext='ini'):
    """
    # 转储设置数据
    """
    return m.write_cfg(dot_path, ext)


def write_dat(dot_path=None, ext='ini'):
    """
    # 转储静态数据
    """
    return m.write_dat(dot_path, ext)


def write_sav(filename_without_ext=None):
    """
    # 转储存档数据
    """
    m.write_sav(filename_without_ext)


def read_sav(filename_without_ext=None):
    """
    # 转储存档数据
    """
    m.read_sav(filename_without_ext)


########## 事件 ##########
def on(event_name, listener):
    """
    # 注册侦听器
    """
    pass


def once(event_name, listener):
    """
    # 注册一次性侦听器
    """
    pass


def off(event_name, listener):
    """
    # 注销侦听器
    """
    pass


def emit(event_name, *arg, **kw):
    """
    # 发布事件
    """
    pass


########## 实验性 ##########
def dangerously_get_engine_core():
    """
    # 获取引擎核心（危险）
    """
    return m.dangerously_get_engine_core()


########## 工具 ##########
def random_hash(level=4):
    """
    # 获取哈希随机值
    """
    return m.random_hash(level)


########## 预设控件 ##########
def show_save_to_save():
    """
    # 插入块级复合控件：存档保存列表（单页）
    """
    pass


def show_save_to_load():
    """
    # 插入块级复合控件：存档加载列表（单页）
    """
    pass


########## 弃用 ##########
def get_full_time():
    pass


def tick():
    pass


def save_data_to_file():
    """
    弃用
    现在用`save_cfg`，`save_dat`，`save_sav`代替
    """
    pass


def shake():
    pass


def generate_map():
    pass


def clear(num=0):
    """
    # 初始化引擎
    """
    pass


def append_gui(ui_func, *arg, **kw):
    """
    # 添加界面节点但不触发
    """
    pass


def get_gui_list():
    """
    # 初始化引擎
    """
    pass
