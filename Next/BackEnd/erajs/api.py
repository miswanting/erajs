from . import mw as m
version = '0.2.0'
aka = 'brandnew'
data = {}


def init():
    global data
    m.init()
    data = m.get_data()
    # print(data)


def debug(text):
    m.debug(text)


def info(text):
    m.info(text)


def warn(text):
    m.warn(text)


def error(text):
    m.error(text)


def critical(text):
    m.critical(text)


def config(conf_data):
    pass


def entry(entry_func):
    m.entry(entry_func)


def start():
    m.start()


def title(text):
    m.title(text)


def window(style=None):
    m.window(style)


def page(style=None):
    m.page(style)


def clear(num=0):
    m.clear(num)


def heading(text=None, rank=1, style=None):
    m.heading(text, rank, style)


h = heading


def text(text=None, wait=False, style=None):
    m.text(text, wait, style)


t = text


def button(text=None, callback=None, *arg, **kw):
    m.button(text, callback, *arg, **kw)


b = button


def link(text=None, callback=None, style=None, *arg, **kw):
    m.link(text, callback, style, *arg, **kw)


l = link


def progress(now=0, max=100, style=None):
    m.progress(now, max, style)


def rate(now=0, max=5, callback=None, style=None):
    return m.rate(now, max, callback, style)


def check(text=None, callback=None, default=False, style=None):
    return m.check(text, callback, default, style)


def radio(text_list, callback=None, default_index=0, style=None):
    return m.radio(text_list, callback, default_index, style)


def input(callback=None, default='', is_area=False, placeholder='', style=None):
    return m.input(callback, default, is_area, placeholder, style)


def dropdown(text_list=None, callback=None, default_index=0, search=False, multiple=False, placeholder='', allowAdditions=False, style=None):
    return m.dropdown(text_list, callback, default_index, search,
                      multiple, placeholder, allowAdditions, style)


def divider(text=None, style=None):
    m.divider(text, style)


def goto(ui_func, *arg, **kw):
    m.goto(ui_func, *arg, **kw)


def back(num=1, *arg, **kw):
    m.back(num=1, *arg, **kw)


def repeat(*arg, **kw):
    pass


def clear_gui(num=0):
    pass


def append_gui(ui_func, *arg, **kw):
    pass


def get_gui_list():
    pass


def show_save_to_save():
    pass


def show_save_to_load():
    pass


def mode(type='line', *arg, **kw):
    m.mode(type, *arg, **kw)


def exit(save=False):
    pass


def cfg(dot_path):
    return m.cfg(dot_path)


def dat(dot_path):
    return m.dat(dot_path)


def sav():
    return m.sav()


def dangerously_get_engine_core():
    return m.dangerously_get_engine_core()


def new_hash(level=4):
    return m.new_hash(level)
########################################


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


def add_listener():
    pass


def remove_listener():
    pass


def dispatch_event():
    pass
