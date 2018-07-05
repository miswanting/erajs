import engine.game as g
cha = g.src['character']


def explore():
    fight()


def fight():
    # 召集人员
    e = cha.get_new_enemy()
