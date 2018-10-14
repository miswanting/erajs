import engine.game as g


def init():
    for item in get_items():
        g.item.append(item)


def get_items():
    items = []
    items.append({
        'type': '环境',
        'parent': '自然',
        '名称': '村庄后山',
        '玩家': '',
        '对方': [],
    })
    return items
