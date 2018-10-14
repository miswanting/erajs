import engine.game as g
cha = g.src['person']


def intro():
    g.clear_page()
    g.new_page()
    g.p('请选择主角的创建方式')
    g.p()
    g.p()
    g.cmd("使用游戏默认初始角色", default_start)


def default_start():
    # 组装世界
    
    # 生成默认玩家
    player = cha.default_character()
    player['系统身份'] = '玩家'
    cha.give_birth(player)
    g.goto(g.src['主界面'].gui_main)
