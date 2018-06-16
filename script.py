# coding:utf-8
import src.game as g


def intro():
    g.new_page()
    g.pl('请选择主角的创建方式')
    g.pl()  # 空单独一行
    g.plcmd("使用游戏默认初始角色", default_start)


def load():
    pass


def default_start():
    pass


g.init()
g.pl('EraLife')
g.pl()  # 空单独一行
g.plcmd("开始游戏", g.goto, intro)
g.plcmd("读取游戏", g.goto, load)
