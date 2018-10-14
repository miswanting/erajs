import engine.game as g
era = g.src['era']


def init():
    for item in get_items():
        g.item.append(item)


def get_items():
    items = []
    items.append({
        'type': '商店',
        'parent': '市场',
        '名称': '武器商店',
        'func': gui_商店
    })
    return items


def gui_商店():
    g.new_page()
    g.h1('武器商店')
    g.p()
    g.p()
    g.mode('grid', 5)
    l_weapon = g.get_item('type', '武器')
    fix = 5 - len(l_weapon) % 5
    for each in l_weapon:
        g.cmd(each['名称'], g.goto, era.buy, each['名称'])
        g.p()
    for i in range(fix-1):
        g.p(' ')
        g.p('')
    g.p(' ')
    g.mode('plain')
    g.cmd('返回', g.back)
