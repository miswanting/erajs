import engine.game as g
base = g.src['lib_base']


def cover():
    g.h1('EraLife')
    g.p()
    g.cmd("开始游戏", g.goto, g.src['引言'].intro)
    g.p()
    g.cmd("读取游戏", g.goto, base.gui_load, g.src['主界面'].gui_main)
