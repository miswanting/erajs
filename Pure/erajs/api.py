from . import mw as m


def init():
    m.init()


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


def head(text=None, rank=1, style=None):
    m.head(text, rank, style)


h = head


def text(text=None, wait=False, style=None):
    m.text(text, wait, style)


t = text


def button(text=None, callback=None, style=None, *arg, **kw):
    m.button(text, callback, style, *arg, **kw)


b = button


def link(text=None, callback=None, style=None, *arg, **kw):
    m.link(text, callback, style, *arg, **kw)


l = link


def progress(now=0, max=100, width=100, style=None):
    m.progress(now, max, length)


def rate(now=0, max=5, callback=None):
    m.rate(now, max, callback)


def check(text=None, callback=None, default=False, style=None):
    m.check(text, callback, default, style)


def radio(text_list, callback=None, default_index=0):
    m.radio(text_list, callback, default_index)


def input(callback=None, default='', is_area=False, placeholder=''):
    m.input(callback, default, is_area, placeholder)


def dropdown(text_list=None, callback=None, default_index=0, search=False, multiple=False, placeholder='', allowAdditions=False):
    m.dropdown(text_list, callback, default_index, search,
               multiple, placeholder, allowAdditions)


def divider(text=None):
    m.divider(text)
