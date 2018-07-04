# coding:utf-8
# import gettext
import engine.game as g
import src.lib_base as base
import src.character as cha
import src.time as ti

# _ = gettext.gettext


def intro():
    g.new_page()
    g.p('请选择主角的创建方式')
    g.p()
    g.p()
    g.cmd("使用游戏默认初始角色", default_start)


def load():
    pass


def default_start():
    g.data['人物库'] = []
    player = cha.default_character()
    player['系统身份'] = '主角'
    g.data['人物库'].append(player)
    g.goto(gui_main)


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
    g.cmd('外出探险', g.goto, intro)
    g.p()
    g.cmd('市场', g.goto, intro)
    g.p()
    g.cmd('人物档案', g.goto, gui_profile_list)
    g.p()
    g.cmd('装备管理', g.goto, intro)
    g.p()
    g.cmd('休息', g.goto, intro)
    g.p()
    g.cmd('和神秘人聊天', g.goto, intro)
    g.p()
    g.cmd('保存', g.goto, base.gui_save)
    g.p()
    g.cmd('读取', g.goto, base.gui_load, gui_main)
    g.p()
    g.cmd('设置', g.goto, intro)
    g.p()
    g.p(' ')


def gui_profile_list():
    g.new_page()
    g.p('人物档案')
    g.p()
    for each in g.data['人物库']:
        g.cmd(each['姓名'], g.goto, gui_profile, True)
    g.p()
    g.cmd('返回', g.back, line=True)


def gui_profile():
    pass


g.init()
g.h1('EraLife')
g.p()
g.cmd("开始游戏", g.goto, intro)
g.p()
g.cmd("读取游戏", g.goto, base.gui_load, gui_main)
