# coding:utf-8
import src.game as game
game.init()
game.p("测试文字")
game.p("测试不换行")
game.pl("测试换行")
game.p("测试文字")
game.pw("测试等待")
game.plw("测试换行等待")
game.pcmd("输出命令", next)


def next():
