import math

ORDER = ['日', '月', '火', '水', '木', '金', '土']
TIME_ORDER = ['昼', '夜']
SEASON_ORDER = ['春', '夏', '秋', '冬']
DAYS_IN_A_MONTH = 30
# 1...
CURRENT_DAY = 1
# 昼/夜
CURRENT_TIME = '昼'
# 第1天 日之周 日曜日 春昼


def tick():
    global CURRENT_TIME, CURRENT_DAY
    if CURRENT_TIME == TIME_ORDER[0]:
        CURRENT_TIME = TIME_ORDER[1]
    elif CURRENT_TIME == TIME_ORDER[1]:
        CURRENT_TIME = TIME_ORDER[0]
        CURRENT_DAY += 1


def get_full_time():
    full_time_list = []
    full_time_list.append('第{}日'.format(get_day()))
    full_time_list.append('{}之周'.format(get_week()))
    full_time_list.append('{}曜日'.format(get_weekday()))
    full_time_list.append('{}{}'.format(get_season(), get_time()))
    return ' '.join(full_time_list)


def get_time():
    return CURRENT_TIME


def get_day():
    return CURRENT_DAY


def get_weekday():
    index = ()
    return ORDER[(CURRENT_DAY - 1) % 7]


def get_week():
    i = int(math.floor((CURRENT_DAY - 1) / 7))
    i = i % 7
    return ORDER[i]


def get_season():
    i = int(math.floor((CURRENT_DAY - 1) / DAYS_IN_A_MONTH))
    i = i % 4
    return SEASON_ORDER[i]
