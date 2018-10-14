# coding:utf-8
from . import engine as e

data = {}

engine = e.Engine()


def init():
    print('[DEBG]Initializing...')
    print('[DEBG]├─ Fixing Path...', end='')
    engine.fix_path()
    print('OK')
    print('[DEBG]├─ Checking Program Integrity...', end='')
    engine.self_check()
    print('OK')
    print('[DEBG]├─ Loading Engine Configuration...', end='')
    engine.load_config(['config/config.ini'])
    print('OK')
    print('[DEBG]├─ Registering Native API...')
    print('[FINE]│  └─ {} Native APIs Registered!'.format(engine.register_api()))
    print('[DEBG]├─ Scanning Plugins...')
    print('[FINE]│  └─ {} Plugins Scanned!'.format(engine.scan_plugin()))
    print('[DEBG]├─ Loading Plugins...')
    print('[FINE]│  └─ {} Plugins Loaded!'.format(engine.load_plugin()))
    print('[DEBG]├─ Connecting Server...', end='')
    engine.connect()
    print('OK')
    print('[DEBG]├─ Transfering Configuration to Server...', end='')
    engine.send_config()
    print('OK')
    print('[DEBG]├─ Loading Data Files...')
    data = engine.load_data(engine.scan('data'))
    for each in data.keys():
        engine.data[each] = data[each]
    print('[FINE]│  └─ Data Files Loaded!')
    print('[DEBG]├─ Scanning Scripts...')
    print('[FINE]│  └─ {} Scripts Scanned!'.format(engine.scan_script()))
    print('[DEBG]├─ Loading Scripts...')
    print('[FINE]│  └─ {} Scripts Loaded!'.format(engine.load_script()))
    print('[DEBG]├─ Scanning DLCs...')
    print('[FINE]│  └─ {} DLCs Scanned!'.format(engine.scan_dlc()))
    print('[DEBG]├─ Loading DLCs...')
    print('[FINE]│  └─ {} DLCs Loaded!'.format(engine.load_dlc()))
    print('[DEBG]├─ Scanning MODs...')
    print('[FINE]│  └─ {} MODs Scanned!'.format(engine.scan_mod()))
    print('[DEBG]├─ Loading MODs...')
    print('[FINE]│  └─ {} MODs Loaded!'.format(engine.load_mod()))
    print('[DEBG]├─ Transferring Loading Complete Signal...', end='')
    engine.send_loaded()
    print('OK')
    print('[FINE]└─ Initialize Complete!')
    return engine.data


def title(text):
    engine.title(text)


def t(text='', wait=False):
    engine.t(text, wait)


def b(text, func, *arg, **kw):
    engine.b(text, func, *arg, **kw)


def h(text, rank=1):
    engine.h(text, rank)


def rate(now=0,  max=5, func=None):
    return engine.data['api']['rate'](now, max, func)


def progress(now, max=100, length='100px'):
    return engine.data['api']['progress'](now, max, length)


def radio(choice_list, default_index=0, func=None):
    return engine.data['api']['radio'](choice_list, default_index, func)


def input(func=None):
    return engine.data['api']['input'](func)


def divider(text=''):
    return engine.data['api']['divider'](text)


def page():
    engine.page()


def clear(last=False):
    engine.clear(last)


def goto(func, *arg, **kw):
    engine.goto(func, *arg, **kw)


def back(*arg, **kw):
    engine.back(*arg, **kw)


def repeat(*arg, **kw):
    engine.repeat(*arg, **kw)


def clear_gui():
    engine.clear_gui()


def show_save_to_save():
    def save_to(save_num):
        engine.save_to(save_num)
        engine.repeat()
    # 获取列表
    save_file_list = engine.scan('save')
    # print(save_file_list)
    # 弱加载
    for each in save_file_list:
        pass
    # 计算显示
    save_list = []
    current_num = 1
    while True:
        if len(save_file_list) == 0:
            save_list.append((current_num, '未使用'))
            break
        elif int(save_file_list[0].split('\\')[-1].split('.')[0]) == current_num:
            save_list.append((current_num, str(current_num)))
            save_file_list = save_file_list[1:]
            current_num += 1
    # 显示
    for each in save_list:
        engine.b(str(each[0])+'. '+each[1], save_to, each[0])
        engine.t()
    # 处理
    pass


def show_save_to_load(func_after_load):
    def load_from(save_num):
        engine.load_from(save_num)
        engine.clear_gui()
        engine.goto(func_after_load)
    # 获取列表
    save_file_list = engine.scan('save')
    # 弱加载
    for each in save_file_list:
        pass
    # 计算显示
    save_list = []
    for each in save_file_list:
        save_list.append((int(each.split('\\')[-1].split('.')[0]), ''))
    # 显示
    for each in save_list:
        engine.b(str(each[0])+'. '+each[1], load_from, each[0])
        engine.t()
    # 处理
    pass


def save(filename):
    pass


def load_save(filename):
    pass


def add(item):
    return engine.add(item)


def get(pattern):
    return engine.get(pattern)


def get_full_time():
    return engine.data['api']['get_full_time']()


def tick():
    engine.data['api']['tick']()


def _______________________________________________________():
    pass


def new_hash():
    return e.new_hash()
