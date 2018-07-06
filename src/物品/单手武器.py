import engine.game as g


def init():
    for item in get_items():
        g.item.append(item)


def get_items():
    items = []
    items.append({
        'type': '武器',
        'parent': '右手',
        '量词':'把',
        '名称': '木剑',
        '体力消耗': 10,
        '耐力消耗': 10,
        '精力消耗': 10,
        '攻击力': 10,
        '攻击增幅': 0,
        '伤害类型': '物理',
        '暴击几率': 0.05,
        '暴击倍数': 0.1,
        '吸血': 0,
    })
    return items
