import engine.game as g
c = g.src['character']


def equip_manage():
    def show_eq(disp, valu):
        if c.get_person('系统身份', '玩家')[0][valu] == '':
            g.cmd(disp, g.goto, do_equip, valu)
        else:
            disp += ':{}'.format(c.get_person('系统身份', '玩家')[0][valu])
            g.cmd(disp, g.goto, do_equip, valu)
    g.new_page()
    g.h1('装备管理')
    g.p()
    g.p()
    g.mode('grid', 7)
    g.p()
    show_eq('头部', '头部')
    for i in range(7):
        g.p()
    show_eq('面部', '面部')
    for i in range(7):
        g.p()
    show_eq('颈部', '颈部')
    for i in range(7):
        g.p()
    show_eq('上身', '上身')
    for i in range(1):
        g.p()
    # g.cmd('背包', g.goto, do_equip, '背包')
    for i in range(5):
        g.p()
    show_eq('右手', '右手')
    g.p()
    show_eq('双手', '双手')
    g.p()
    show_eq('左手', '左手')
    for i in range(5):
        g.p()
    show_eq('手指', '右手指')
    g.p()
    show_eq('下身', '下身')
    g.p()
    show_eq('手指', '左手指')
    for i in range(6):
        g.p()
    show_eq('脚部', '脚部')
    for i in range(5):
        g.p()
    g.mode()
    g.p()
    g.cmd('返回', g.back)


def do_equip(part):
    g.new_page()
    cl = part
    if part in ['左手', '右手']:
        cl = '手部'
    elif part in ['左手指', '右手指']:
        cl = '手指'
    g.p()
    g.h1('请选择一个{}装备'.format(cl))
    l = g.get_item('parent', cl, c.get_person('系统身份', '玩家')[0]['背包'])
    for each in l:
        g.cmd(each['名称'], equip, part, each['名称'])
    g.p()
    g.p()
    g.cmd('返回', g.back)


def equip(part, item):
    if not c.get_person('系统身份', '玩家')[0][part] == '':
        c.get_person('系统身份', '玩家')[0]['背包'].append(p[part])
    c.get_person('系统身份', '玩家')[0][part] = item
    print('b', c.get_person('系统身份', '玩家')[0]['背包'])
    for i in range(len(c.get_person('系统身份', '玩家')[0]['背包'])):
        if item == c.get_person('系统身份', '玩家')[0]['背包'][i]['名称']:
            del c.get_person('系统身份', '玩家')[0]['背包'][i]

    print('a', c.get_person('系统身份', '玩家')[0]['背包'])
    g.back()
