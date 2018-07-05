import engine.game as g


def gui_profile_list():
    g.new_page()
    g.p('人物档案')
    g.p()
    for each in g.data['人物库']:
        g.cmd(each['姓名'], g.goto, gui_profile, each['hash'])
        g.p()
    g.cmd('返回', g.back)


def gui_profile(hash):
    print(hash)
