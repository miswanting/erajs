# coding:utf-8
from . import game as g

version = '0.1.0'
data = {}


# 显示控制
def init():
    global data
    data = g.init()


def title(text):
    g.title(text)


def t(text='', wait=False):
    g.t(text, wait)


def b(text, func, *arg, **kw):
    g.b(text, func, *arg, **kw)


def h(text):
    g.h(text)


def rate(now=0,  max=5, func=None):
    return g.rate(now, max, func)


def progress(now, max=100, length='100px'):
    return g.progress(now, max, length)


def radio(choice_list, default_index=0, func=None):
    return g.radio(choice_list, default_index, func)


def input(func=None):
    return g.input(func)


def divider(text=''):
    return g.divider(text)


def page():
    g.page()


def clear(last=False):
    g.clear(last)


def goto(func, *arg, **kw):
    g.goto(func, *arg, **kw)


def back(*arg, **kw):
    g.back(*arg, **kw)


def repeat(*arg, **kw):
    g.repeat(*arg, **kw)


def clear_gui():
    g.clear_gui()


def show_save_to_save():
    g.show_save_to_save()


def show_save_to_load(func_after_load):
    g.show_save_to_load(func_after_load)


def mode():
    pass


# 资源控制
def add(item):
    return g.add(item)


def get(pattern):
    return g.get(pattern)


# EraTime
def get_full_time():
    return g.get_full_time()


def tick():
    g.tick()


def ________________________________________________________________():
    pass


def new_hash():
    return g.new_hash()
