import engine.game as g
base = g.src['lib_base']
ti = g.src['time']
cha = g.src['character']


def gui_main():
    g.new_page()
    g.p(ti.get_full_time())
    g.p()
    my = cha.get_player()
    g.p(my['系统称呼'])
    g.p('　等级:')
    g.p(my['等级'])
    g.p('　金钱:')
    g.p(my['金钱'])
    g.p()
    g.p('体力:')
    g.progress(my['体力'], my['体力上限'])
    g.p('({}/{})'.format(my['体力'], my['体力上限']))
    g.p('　耐力:')
    g.progress(my['耐力'], my['耐力上限'])
    g.p('({}/{})'.format(my['耐力'], my['耐力上限']))
    g.p('　精力:')
    g.progress(my['精力'], my['精力上限'])
    g.p('({}/{})'.format(my['精力'], my['精力上限']))
    g.mode('grid', 5)
    g.cmd('外出探险', g.goto, g.src['探险'].explore)
    g.p()
    g.cmd('市场', g.goto, base.gui_save)
    g.p()
    g.cmd('人物档案', g.goto, g.src['人物档案'].gui_profile_list)
    g.p()
    g.cmd('装备管理', g.goto, base.gui_save)
    g.p()
    g.cmd('休息', g.goto, rest)
    g.p()
    g.cmd('和神秘人聊天', g.goto, base.gui_save)
    g.p()
    g.cmd('保存', g.goto, base.gui_save)
    g.p()
    g.cmd('读取', g.goto, base.gui_load, gui_main)
    g.p()
    g.cmd('设置', g.goto, base.gui_save)
    g.p()
    g.p(' ')


def rest():
    g.new_page()
    # 当天深夜
    g.p('一夜无事', True)
    g.p('')
    g.src['time'].tick()
    g.p('你起了个大早', True)
    # 次日清晨
    g.back()
