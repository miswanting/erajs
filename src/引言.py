import engine.game as g
cha = g.src['character']


def intro():
    g.new_page()
    g.p('请选择主角的创建方式')
    g.p()
    g.p()
    g.cmd("使用游戏默认初始角色", default_start)


def default_start():
    g.data['人物库'] = []
    player = cha.default_character()
    player['系统身份'] = '主角'
    g.data['人物库'].append(player)
    g.goto(g.src['主界面'].gui_main)
