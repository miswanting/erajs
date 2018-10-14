import engine.game as g
c = g.src['character']


def init():
    for item in get_items():
        g.item.append(item)


def get_items():
    items = []
    items.append({
        'type': '武器',
        'parent': '手部',
        '量词': '把',
        '名称': '木剑',
    })

    def 木剑敲击able(sub, obj):
        sub = c.get_person('hash', sub)[0]
        obj = c.get_person('hash', obj)[0]
        if '木剑' in [sub['左手'], sub['右手']]:
            return True
        return False

    def 木剑敲击(sub, obj, act):
        sub = c.get_person('hash', sub)[0]
        obj = c.get_person('hash', obj)[0]
        c.get_person('hash', sub['hash'])[0]['体力'] -= act['体力消耗']
        c.get_person('hash', sub['hash'])[0]['耐力'] -= act['耐力消耗']
        c.get_person('hash', sub['hash'])[0]['精力'] -= act['精力消耗']
        d = {}
        d['sub'] = sub['姓名']
        d['obj'] = obj['姓名']
        d['dmg'] = act['攻击力']
        player_hash = c.get_person('系统身份', '玩家')[0]['hash']
        if sub['hash'] == player_hash:
            d['sub'] = c.get_person('系统身份', '玩家')[0]['系统称呼']
        if obj['hash'] == player_hash:
            d['obj'] = c.get_person('系统身份', '玩家')[0]['系统称呼']
        t = '{sub}对{obj}使用木剑敲击，造成了{dmg}点伤害。'
        g.p(t.format(**d))
        g.p()
        c.get_person('hash', obj['hash'])[0]['体力'] -= d['dmg']
    items.append({
        'type': '行动',
        'parent': '战斗',
        '名称': '木剑敲击',
        '体力消耗': 0,
        '耐力消耗': 10,
        '精力消耗': 0,
        '攻击力': 20,
        '攻击增幅': 0,
        '伤害类型': '物理',
        '暴击几率': 0.05,
        '暴击倍数': 0.1,
        '吸血': 0,
        '可行': 木剑敲击able,
        '触发': 木剑敲击
    })
    return items
