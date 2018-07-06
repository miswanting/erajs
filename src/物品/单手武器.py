import engine.game as g


def init():
    for item in get_items():
        g.item.append(item)


def get_items():
    items = []
    items.append({
        'type': '武器',
        'parent': '右手',
        '名称': '木剑',
        '攻击力': [10, 15],
    })
    return items
