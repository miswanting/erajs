import engine.game as g
c = g.src['character']


def gui_profile_list():
    g.new_page()
    g.h1('人物档案')
    g.p()
    g.p()
    for each in g.data['人物库']:
        if not '死亡' in each['flag']:
            g.cmd(each['姓名'], g.goto, gui_overview, each['hash'])
            g.p()
    g.p()
    g.cmd('返回', g.back)


def gui_overview(hash):
    g.new_page()
    p = c.get_person('hash', hash)[0]
    l = []
    if p['系统身份'] == '玩家':
        l.append(p['姓名']+'({})'.format(p['系统称呼']))
    else:
        l.append(p['姓名'])
    l.append(p['等级'])
    l.append(p['性别'])
    g.p('■ {}(LV:{})　性别:{}'.format(*l))
    g.p()
    l.clear()
    if p['系统身份'] == '玩家':
        l.append(p['体力上限'])
        l.append(p['耐力上限'])
        l.append(p['精力上限'])
        g.p('体力上限:{}　耐力上限:{}　精力上限:{}'.format(*l))
    else:
        l.append(p['好感'])
        l.append(p['体力上限'])
        l.append(p['耐力上限'])
        l.append(p['精力上限'])
        g.p('好感:{}　体力上限:{}　耐力上限:{}　精力上限:{}'.format(*l))
    g.p()
    l.clear()
    l.append(p['体型'])
    l.append(p['身高'])
    l.append(p['体重'])
    l.append(p['胸围'])
    l.append(p['腰围'])
    l.append(p['臀围'])
    if p['性别'] == '男':
        g.p('体型:{}　身高:{}cm　体重:{}kg　三围:{}/{}/{}'.format(*l))
    elif p['性别'] == '女':
        l.append(p['罩杯'])
        g.p('体型:{}　身高:{}cm　体重:{}kg　三围:{}/{}/{}　罩杯:{}'.format(*l))
    g.p()
    l = ''
    for each in p['特点']:
        l += '[' + each + ']'
    g.p('特点:{}'.format(l))
    g.p()
    g.p()
    g.cmd('返回', g.back)


def gui_love(hash):
    g.new_page()
    p = c.get_person('hash', hash)[0]
    l = []
    l.append(p['姓名'])
    l.append(p['等级'])
    l.append(p['性别'])
    g.p('■ {}(LV:{})　性别{}:'.format(*l))
    g.p()
    l.clear()
    l.append(p['好感'])
    l.append(p['体力上限'])
    l.append(p['耐力上限'])
    l.append(p['精力上限'])
    g.p('好感:{}　体力上限:{}　耐力上限:{}　精力上限:{}'.format(*l))
    g.p()
    l.clear()
    l.append(p['体型'])
    l.append(p['身高'])
    l.append(p['体重'])
    l.append(p['胸围'])
    l.append(p['腰围'])
    l.append(p['臀围'])
    l.append(p['罩杯'])
    g.p('体型:{}　身高:{}cm　体重:{}kg　三围:{}/{}/{}　罩杯:{}'.format(*l))
    g.p()
    l = ''
    for each in p['特点']:
        l += '[' + each + ']'
    g.p('特点:{}'.format(l))
    g.p()
    g.p('宝珠:')
    g.p()
    g.mode('grid', 4)
    g.p('测试')
    g.p()
    g.mode()
    l = []
    g.p('经验')
    g.p()
    g.p('异常经验:12')
    g.p()
    g.p('素质:')
    g.p()
    g.p('性格:')
    g.p()
    g.p('体质:')
    g.p()
    g.p('技能:')
    g.p()
    g.p('魔法:')
    g.p()
    g.p('后天:')
    g.p()
