# coding:utf-8
import random
import erajs.api as a
# 注意！不推荐在此处定义变量，而应在 a.init() 之后将变量定义在 a.data['db'] 中，以获得数据持久性支持。

_version = '0.1.0'


def cover():
    a.page()
    a.h('Era.js v{}'.format(a.version))
    a.t()
    a.t()
    a.b('开始游戏', a.goto, start_new_game)
    a.t()
    a.b('加载游戏', a.goto, load_game)
    a.t()
    a.b('游戏设置', None, disabled=True)
    a.t()
    a.b('退出游戏', None, disabled=True)


def start_new_game():
    """开始新游戏"""
    a.page()
    a.h('开始新游戏')
    a.t()
    a.b('返回', a.back)


def save_game():
    a.page()
    a.h('保存游戏')
    a.t()
    print(a.data['db'])
    a.show_save_to_save()
    a.b('返回', a.back)


def load_game():
    a.page()
    a.h('读取游戏')
    a.t()
    a.show_save_to_load(None)
    a.b('返回', a.back)


a.init()
a.title('Era.js v{}'.format(_version, a.version))
a.goto(cover)
