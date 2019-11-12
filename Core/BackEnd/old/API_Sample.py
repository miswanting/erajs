# coding:utf-8
import erajs.api as a


def start_new_game():
    a.page()
    a.h('玩家角色创建方式')
    a.t()
    a.t()
    a.b('使用默认主角', e.goto, default_person)


def default_person():
    a.page()
    a.h('默认玩家角色')
    a.t()
    a.t()


if __name__ == "__main__":
    a.init()
    a.title('EraLife')
    a.h('EraLife')
    a.t()
    a.t()
    a.b('新建游戏', a.goto, start_new_game)
