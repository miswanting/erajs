# coding:utf-8
import engine.game as g
import src.lib_base as base


def intro():
    g.new_page()
    g.p('请选择主角的创建方式', True)
    g.p(line=True)
    g.plcmd("使用游戏默认初始角色", default_start)


def load():
    pass


def default_start():
    g.data['人物库'] = [base.default_character()]
    print(g.data)


g.init()
g.p('EraLife', True)
g.p(line=True)
g.plcmd("开始游戏", g.goto, intro)
g.plcmd("读取游戏", g.goto, load)
