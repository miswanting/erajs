import math

ORDER = ['日', '月', '火', '水', '木', '金', '土']
TIME_ORDER = ['昼', '夜']
SEASON_ORDER = ['春', '夏', '秋', '冬']
DAYS_IN_A_MONTH = 29
# 1...
CURRENT_DAY = 1
# 昼/夜
CURRENT_TIME = '昼'
# 第1天 日之周 日曜日 春昼
# 第1年1月1日 日之周 日曜日 春昼
SYS_TIME = [0, 0, 0, 0, 0, 0, 0]  # 年，月，日，时，周，星，总


def tick():
    global CURRENT_TIME, CURRENT_DAY, SYS_TIME
    if CURRENT_TIME == TIME_ORDER[0]:
        CURRENT_TIME = TIME_ORDER[1]
    elif CURRENT_TIME == TIME_ORDER[1]:
        CURRENT_TIME = TIME_ORDER[0]
        CURRENT_DAY += 1
    if SYS_TIME[3] == 0:  # 白天到晚上
        SYS_TIME[3] = 1
    elif SYS_TIME[3] == 1:  # 晚上到白天
        SYS_TIME[3] = 0
        SYS_TIME[2] += 1
        SYS_TIME[5] += 1
        SYS_TIME[6] += 1
        if SYS_TIME[2] >= DAYS_IN_A_MONTH:  # 过了一个月
            SYS_TIME[2] = 0
            SYS_TIME[1] += 1
            if SYS_TIME[1] >= 4:  # 过了一年
                SYS_TIME[1] = 0
                SYS_TIME[0] += 1
        if SYS_TIME[5] >= 7:
            SYS_TIME[5] = 0
            SYS_TIME[4] += 1
            if SYS_TIME[4] >= 7:
                SYS_TIME[4] = 0


# def get_full_time():
#     full_time_list = []
#     full_time_list.append('第{}日'.format(get_day()))
#     full_time_list.append('{}之周'.format(get_week()))
#     full_time_list.append('{}曜日'.format(get_weekday()))
#     full_time_list.append('{}{}'.format(get_season(), get_time()))
#     return ' '.join(full_time_list)
def get_full_time():
    full_time_list = []
    text = '{}年{}月{}日'
    text = text.format(SYS_TIME[0]+1, SYS_TIME[1]+1, SYS_TIME[2]+1)
    full_time_list.append(text)
    full_time_list.append('{}之周'.format(get_week()))
    full_time_list.append('{}曜日'.format(get_star()))
    full_time_list.append('{}{}'.format(get_season(), get_time()))
    return ' '.join(full_time_list)


# def get_time():
#     return CURRENT_TIME
def get_time():
    return TIME_ORDER[SYS_TIME[3]]


def get_day():
    return CURRENT_DAY


def get_weekday():
    index = ()
    return ORDER[(CURRENT_DAY - 1) % 7]


def get_star():
    return ORDER[SYS_TIME[5]]


# def get_week():
#     i = int(math.floor((CURRENT_DAY - 1) / 7))
#     i = i % 7
#     return ORDER[i]
def get_week():
    return ORDER[SYS_TIME[4]]

# def get_season():
#     i = int(math.floor((CURRENT_DAY - 1) / DAYS_IN_A_MONTH))
#     i = i % 4
#     return SEASON_ORDER[i]


def get_season():
    return SEASON_ORDER[SYS_TIME[1]]


def get_total():
    return SYS_TIME[6]
