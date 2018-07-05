import engine.game as g
c = g.src['character']


def init():
    for item in get_items():
        g.item.append(item)


def get_items():
    items = []

    def 可行_轻拳(sub, obj):
        return True

    def 触发_轻拳(sub, obj):
        c.get_person('hash', sub)[0]['耐力'] -= 10
        t = '{}给了{}一记轻拳，造成了10点伤害。'
        sub_name = c.get_person('hash', sub)[0]['姓名']
        obj_name = c.get_person('hash', obj)[0]['姓名']
        player_hash = c.get_person('系统身份', '玩家')[0]['hash']
        if sub == player_hash:
            sub_name = c.get_person('系统身份', '玩家')[0]['系统称呼']
        if obj == player_hash:
            obj_name = c.get_person('系统身份', '玩家')[0]['系统称呼']
        print(c.get_person('hash', sub))
        t = t.format(sub_name, obj_name)
        g.p(t)
        g.p()
        c.get_person('hash', obj)[0]['体力'] -= 10
    items.append({
        'type': '行动',
        'parent': '战斗',
        '名称': '轻拳',
        '攻击力': 10,
        '可行': 可行_轻拳,
        '触发': 触发_轻拳,
    })

    def 可行_重拳(sub, obj):
        return True

    def 触发_重拳(sub, obj):
        c.get_person('hash', sub)[0]['耐力'] -= 15
        t = '{}给了{}一记重拳，造成了15点伤害。'
        sub_name = c.get_person('hash', sub)[0]['姓名']
        obj_name = c.get_person('hash', obj)[0]['姓名']
        player_hash = c.get_person('系统身份', '玩家')[0]['hash']
        if sub == player_hash:
            sub_name = c.get_person('系统身份', '玩家')[0]['系统称呼']
        if obj == player_hash:
            obj_name = c.get_person('系统身份', '玩家')[0]['系统称呼']
        print(c.get_person('hash', sub))
        t = t.format(sub_name, obj_name)
        g.p(t)
        g.p()
        c.get_person('hash', obj)[0]['体力'] -= 15
    items.append({
        'type': '行动',
        'parent': '战斗',
        '名称': '重拳',
        '攻击力': 15,
        '可行': 可行_重拳,
        '触发': 触发_重拳,
    })
    return items
