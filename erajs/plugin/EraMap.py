import sys


class Plugin:
    pass


class EraMap:
    def generate_map(self):
        pass


# def register():
#     global a, EraTime
#     a.data['class']['time'] = EraTime
#     a.data['entity']['time'] = EraTime(a.data)
#     if not 'time' in a.data['db'].keys():
#         a.data['db']['time'] = {
#             'CURRENT_DAY': 0
#         }
#     else:
#         a.data['entity']['time'].CURRENT_DAY = a.data['db']['time']['CURRENT_DAY']
#     # data['entity']['time'].load(data['db']['time'])
#     func_list = [
#         a.data['entity']['time'].get_time,
#         a.data['entity']['time'].get_day,
#         a.data['entity']['time'].get_week,
#         a.data['entity']['time'].get_month,
#         a.data['entity']['time'].get_season,
#         a.data['entity']['time'].get_year,
#         a.data['entity']['time'].get_day_in_week,
#         a.data['entity']['time'].get_day_in_month,
#         a.data['entity']['time'].get_day_in_year,
#         a.data['entity']['time'].get_month_in_year,
#         a.data['entity']['time'].get_season_in_year,
#         a.data['entity']['time'].get_sys_time,
#         a.data['entity']['time'].set_sys_time,
#         a.data['entity']['time'].get_full_time,
#         a.data['entity']['time'].tick
#     ]
#     for each in func_list:
#         a.data['api'][each.__name__] = each


# a = sys.argv[0]
# register()
