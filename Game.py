# coding:utf-8
# import gettext
import engine.game as g
import src.lib_base as base
import src.character as character
import src.time as ti

# _ = gettext.gettext


def intro():
    g.new_page()
    g.p('请选择主角的创建方式', True)
    g.p()
    g.cmd("使用游戏默认初始角色", default_start)


def load():
    pass


def default_start():
    g.data['人物库'] = []
    player = character.default_character()
    player['系统身份'] = '主角'
    g.data['人物库'].append(player)
    g.goto(gui_main)


def gui_main():
    g.new_page()
    g.p(ti.get_full_time())
    g.p(' ')
    g.p(character.get_player()['金钱'])


g.init()
g.h1('EraLife')
g.p()
g.cmd("开始游戏", g.goto, True, intro)
g.cmd("读取游戏", g.goto, True, base.gui_load)
