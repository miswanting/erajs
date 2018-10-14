import engine.game as g


def gui_market():
    g.new_page()
    g.h1('市场')
    g.p()
    g.p()
    l_market = g.get_item('type', '商店')
    for each in l_market:
        g.cmd(each['名称'], g.goto, each['func'])
        g.p()
    g.p()
    g.cmd('返回', g.back)
