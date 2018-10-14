import engine.game as g
base = g.src['base']


def cover():
    g.new_page()
    g.mode('cover')
    g.h1('EraLife: Ordinary Life')
    g.p()
    g.p()
    g.p()
    g.cmd("开始游戏", g.goto, g.src['引言'].intro)
    g.p('　　　')
    g.cmd("读取游戏", g.goto, base.gui_load, g.src['主界面'].gui_main)
