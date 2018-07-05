import random
import engine.game as g
c = g.src['character']


def explore():
    g.new_page()
    for i in range(5):
        result = random.choice([fight])()
        if result == 'lose':
            g.p('你狼狈地回家了', True)
            break
    g.src['time'].tick()
    g.back()


def fight():
    # 生成敌人
    e = c.generate_enemy()
    c.give_birth(e)
    g.p('一个自称为{}的{}出现了！'.format(e['姓名'], e['种族']), True)
    g.p()
    # 生成优先级队列（hash，优先属性，当前优先度）
    our_list = []
    our_list.append(g.data['社会']['玩家'])
    your_list = []
    your_list.extend(g.data['社会']['对方'])
    p_list = []
    p_list.extend(our_list)
    p_list.extend(your_list)
    new_list = []
    for h in p_list:
        person = c.get_person('hash', h)[0]
        value = person['智力']
        if value == 0:
            value = 0.5
        new_list.append([h, 1 / value, 1 / value])
    p_list = new_list
    while True:
        # 找到最低值
        min = p_list[0][2]
        for i in range(len(p_list)):
            if min > p_list[i][2]:
                min = p_list[i][2]
        # 扣除优先值
        for i in range(len(p_list)):
            p_list[i][2] -= min
        # 触发行动
        for i in range(len(p_list)):
            if p_list[i][2] <= 0:
                # 随机选择施放对象
                if p_list[i][0] in your_list:
                    obj = random.choice(our_list)
                elif p_list[i][0] in our_list:
                    obj = random.choice(your_list)
                # 随机选择技能释放
                tmp = g.get_item('type', '行动')
                avalible_list = []
                print('123', g.item)
                for each in tmp:
                    if each['可行'](p_list[i][0], obj):
                        avalible_list.append(each)
                random.choice(avalible_list)['触发'](p_list[i][0], obj)
                p_list[i][2] += p_list[i][1]
                # 胜负判定
                our_alive = 0
                for each in our_list:
                    if c.get_person('hash', each)[0]['体力'] > 0:
                        our_alive += 1
                your_alive = 0
                for each in your_list:
                    if c.get_person('hash', each)[0]['体力'] > 0:
                        your_alive += 1
                if your_alive == 0:
                    g.p('你战胜了对方', True)
                    g.p()
                    return 'win'
                    # 我方赢
                elif our_alive == 0:
                    g.p('你输了', True)
                    g.p()
                    return 'lose'
                    # 对方赢
