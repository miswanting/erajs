import engine.game as g
print(g.src.keys())
c = g.src['person']


def buy(sth):
    g.new_page()
    sb = c.get_person('系统身份', '玩家')[0]
    sth = g.get_item('名称', sth)[0]
    t = '{}买到了一{}{}'
    t = t.format(sb['系统称呼'], sth['量词'], sth['名称'])
    g.p(t, True)
    sb['背包'].append(sth)
    g.back()


def get_alive(person_list):
    alive_list = []
    for each in person_list:
        if not '死亡'in c.get_person('hash', each)[0]['flag']:
            alive_list.append(each)
    return alive_list


def get_call_name(person_hash):
    name = c.get_person('hash', person_hash)[0]['姓名']
    if c.get_person('hash', person_hash)[0]['系统身份'] == '玩家':
        name = c.get_person('hash', person_hash)[0]['系统称呼']
    return name
