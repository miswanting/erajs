import random
import engine.game as g


def init():
    g.data['人物库'] = []


def update(person):
    def add(x):
        return x + person['力量']
    person['攻击力'] = map(add, p['攻击力'])
    person['攻击力'] = g.get_item('名称', person['种族'])[0]['攻击力']
    return person


def default_character():
    p = init_character()
    p['姓名'] = random.choice(g.data['姓名库']['外文']['男名'])
    p['系统称呼'] = '你'
    p['种族'] = random.choice(g.get_item('type', '种族'))['名称']
    return p


def give_birth(person):
    if person['系统身份'] == '玩家':
        g.data['社会']['玩家'] = person['hash']
    if person['系统身份'] == '敌人':
        g.data['社会']['对方'].append(person['hash'])
    g.data['人物库'].append(person)


def generate_enemy():
    e = random_person(0)
    e['系统身份'] = '敌人'
    # e['姓名'] = generate_name('女')
    # e['种族'] = random.choice(g.get_item('type', '种族'))['名称']
    return e


def generate_name(男女, 中外='外'):
    name = ''
    if 中外 == '中':
        name += random.choice(g.data['姓名库']['中文']['姓'])
        name += random.choice(g.data['姓名库']['中文'][男女+'名'])
    if 中外 == '外':
        name += random.choice(g.data['姓名库']['外文'][男女+'名'])
    return name


def random_person(level):
    p = init_character()
    p['性别'] = random.choice(['男', '女'])
    p['姓名'] = generate_name(p['性别'])
    p['等级'] = level
    l_upgrade = ['力量', '敏捷', '智力']
    # 属性加点
    for i in range(p['等级']):
        p[random.choice(l_upgrade)] += 1
    p['种族'] = random.choice(g.get_item('type', '种族'))['名称']
    if len(g.get_item('type', '职业')) > 0:
        p['职业'] = random.choice(g.get_item('type', '职业'))
    p['经验上限'] = (level+1) ** 3 * 100
    p['体力上限'] = 100 + p['等级']*100 + p['力量']*100
    p['耐力上限'] = 100 + p['等级']*100 + p['力量']*100
    p['精力上限'] = 100 + p['等级']*100 + p['智力']*100
    p['体力'] = p['体力上限']
    p['耐力'] = p['耐力上限']
    p['精力'] = p['精力上限']
    p['经验'] = random.randint(0, p['经验上限'])
    p['年龄'] = int(random.normalvariate(24/2, 24/6))
    p.update(p)
    return p


def init_character():
    character = {
        # 灵
        '姓名': '',
        '系统身份': '',  # '主角'/''
        'hash': g.get_hash(),
        'flag': [],
        '等级': 0,
        '特点': [],
        # 称呼
        '系统称呼': '',
        '自称': '',
        '尊称': '',
        '蔑称': '',
        '职业': '',
        '精力': 100,
        '精力上限': 100,
        # 关系
        '父亲': '',
        '母亲': '',
        '子女': [],
        '恋人': [],
        '妻子': [],
        '朋友': [],
        '仇人': [],
        '好感': 0,
        '智力': 0,
        '经验': 0,
        '经验上限': 0,
        '宝珠': [],
        '属性': [],
        '刻印': [],
        '性格': [],
        '技能': [],
        '魔法': [],
        '后天': [],
        '履历': [],
        # 肉
        '性别': '',
        '年龄': 0,
        '种族': '',
        '体力': 100,
        '体力上限': 100,
        '耐力': 100,
        '耐力上限': 100,
        '攻击力': [0, 0],
        '体型': '',
        '身高': 150,
        '体重': 50,
        '胸围': 50,
        '腰围': 50,
        '臀围': 50,
        '罩杯': 'A',
        '力量': 0,
        '敏捷': 0,
        '体质': [],
        # 服装
        # 内
        '内衣': '',
        '内裤': '',
        '袜子': '',
        # 中
        '帽子': '',
        '面具': '',
        '衣服': '',
        '手套': '',
        '裤子': '',
        '鞋子': '',
        # 外
        '外套': '',
        '项链': '',
        '手镯': [],
        '戒指': [],
        ##
        '纹身': [],
        # 装备
        '头部': '',
        '面部': '',
        '颈部': '',
        '上身': '',
        '左手': '',
        '右手': '',
        '双手': '',
        '手指': [],
        '下身': '',
        '脚部': '',
        '背包': [],
        '金钱': 0,

    }
    return character


def get_person(key, value):
    person_list = []
    for person in g.data['人物库']:
        if person[key] == value:
            person_list.append(person)
    return person_list
