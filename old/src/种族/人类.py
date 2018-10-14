import engine.game as g


def init():
    for item in get_items():
        g.item.append(item)


def get_items():
    items = []
    items.append({
        'type': '种族',
        'parent': '',
        '名称': '人类',
        '攻击力': [10, 15],
    })
    return items
