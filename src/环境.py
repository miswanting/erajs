import engine.game as g


def init():
    g.data['自然'] = {
        '时间': [],
        '地点': []
    }
    g.data['社会'] = {
        '对方': [],
        '玩家': '',
        '助手': [],
        '队友': [],
        '中立': []
    }
