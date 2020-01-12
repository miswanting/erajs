import erajs.API as a


def ui_cover():
    a.t('封面')
    a.b('开始游戏', ui_select_world)
    a.b('游戏设置')
    a.b('编辑游戏')
    a.b('退出游戏')


def ui_select_world():
    a.t('选择世界')
    a.b('新的世界', ui_new_world)
    a.b('旧的世界', ui_old_world)
    a.b('其他世界', ui_other_world)
    a.b('后退')


def ui_new_world():
    a.t('创建世界')
    a.b('确定')
    a.b('后退')


def ui_old_world():
    a.t('旧的世界')
    a.b('线上存档')
    a.b('导入存档')
    a.b('后退')


def ui_other_world():
    a.t('其他世界')
    a.b('确定')
    a.b('后退')


def ui_select_team():
    a.t('选择队伍')
    a.b('新的队伍', ui_new_team)
    a.b('旧的队伍', ui_old_team)
    a.b('后退')


def ui_new_team():
    a.t('新的队伍')
    a.b('确定')
    a.b('后退')


def ui_old_team():
    a.t('旧的队伍')
    a.b('线上存档')
    a.b('导入存档')
    a.b('后退')


if __name__ == "__main__":
    a.init()
    a.entry(ui_cover)
    a.run()
