import engine.game as g
c = g.src['character']


def buy(sth):
    g.new_page()
    sb = c.get_person('系统身份', '玩家')[0]
    sth = g.get_item('名称', sth)[0]
    t = '{}买到了一{}{}'
    t = t.format(sb['系统称呼'], sth['量词'], sth['名称'])
    g.p(t, True)
    sb['背包'].append(sth)
    g.back()
