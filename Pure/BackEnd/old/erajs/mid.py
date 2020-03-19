# coding:utf-8
from . import engine as e

data = {}

engine = e.Engine()

_ = e._


class Mid():
    def __init__(self):
        engine.info('Initializing...')
        engine.info('├─ Fixing Path...')
        engine.fix_path()
        engine.info('├─ Checking Program Integrity...')
        engine.self_check()
        engine.info('├─ Loading Engine Configuration...')
        engine.load_config(['config/config.ini'])
        engine.info('├─ Registering Native API...')
        engine.info('│  └─ {} Native APIs Registered!'.format(
            engine.register_api()))
        engine.info('├─ Scanning Plugins...')
        engine.info('│  └─ {} Plugins Scanned!'.format(engine.scan_plugin()))
        engine.info('├─ Loading Plugins...')
        engine.info('│  └─ {} Plugins Loaded!'.format(engine.load_plugin()))
        engine.info('├─ Connecting Server...')
        engine.connect()
        engine.info('├─ Transfering Configuration to Server...')
        engine.send_config()
        engine.info('├─ Loading Data Files...')
        data = engine.load_data(engine.scan('data'), engine.send)
        for each in data.keys():
            engine.data[each] = data[each]
        engine.info('│  └─ Data Files Loaded!')
        engine.info('├─ Scanning Scripts...')
        engine.info('│  └─ {} Scripts Scanned!'.format(engine.scan_script()))
        engine.info('├─ Loading Scripts...')
        engine.info('│  └─ {} Scripts Loaded!'.format(
            engine.load_script(engine.send)))
        engine.info('├─ Scanning DLCs...')
        engine.info('│  └─ {} DLCs Scanned!'.format(engine.scan_dlc()))
        engine.info('├─ Loading DLCs...')
        engine.info('│  └─ {} DLCs Loaded!'.format(engine.load_dlc()))
        engine.info('├─ Scanning MODs...')
        engine.info('│  └─ {} MODs Scanned!'.format(engine.scan_mod()))
        engine.info('├─ Loading MODs...')
        engine.info('│  └─ {} MODs Loaded!'.format(engine.load_mod()))
        engine.info('├─ Transferring Loading Complete Signal...')
        engine.send_loaded()
        engine.info('└─ Initialize Complete!')

    def debug(self, text):
        return engine.debug(text)

    def info(self, text):
        return engine.info(text)

    def warn(self, text):
        return engine.warn(text)

    def error(self, text):
        return engine.error(text)

    def critical(self, text):
        return engine.critical(text)

    def get_data(self):
        return engine.data

    def title(self, text):
        engine.title(text)

    def t(self, text='', wait=False, color='default', bcolor='default'):
        engine.t(text, wait, color, bcolor)

    def b(self, text, func, *arg, **kw):
        engine.b(text, func, *arg, **kw)

    def l(self, text, func, *arg, **kw):
        engine.b(text, func, *arg, isLink=True, **kw)

    def h(self, text, rank=1, color='default', bcolor='default'):
        engine.h(text, rank, color, bcolor)

    def rate(self, now=0,  max=5, func=None, disabled=True):
        return engine.data['api']['rate'](now, max, func, disabled)

    def progress(self, now, max=100, length='100px'):
        return engine.data['api']['progress'](now, max, length)

    def check(self, text: str = '', func=None, *arg, **kw):
        return engine.data['api']['check'](text, func, *arg, **kw)

    def radio(self, choice_list, func=None, default_index=0):
        return engine.data['api']['radio'](choice_list, default_index, func)

    def input(self, func=None, default='', is_area=False, placeholder=''):
        return engine.data['api']['input'](func, default, is_area, placeholder)

    def dropdown(self, options, func=None, default=None, search=False, multiple=False, placeholder='', allowAdditions=False):
        return engine.data['api']['dropdown'](options, func, default, search, multiple, placeholder, allowAdditions)

    def divider(self, text=''):
        return engine.data['api']['divider'](text)

    def chart(self, chart_type, data, width=200, height=200):
        return engine.data['api']['chart'](chart_type, data, width, height)

    def page(self, color='default'):
        engine.page(color)

    def clear(self, num=0):
        engine.clear(num)

    def goto(self, func, *arg, **kw):
        engine.goto(func, *arg, **kw)

    def back(self, num=1, *arg, **kw):
        engine.back(num, *arg, **kw)

    def repeat(self, *arg, **kw):
        engine.repeat(*arg, **kw)

    def clear_gui(self, num=0):
        engine.clear_gui(num)

    def append_gui(self, func, *arg, **kw):
        engine.append_gui(func, *arg, **kw)

    def get_gui_list(self):
        return engine.get_gui_list()

    def show_save_to_save(self):
        def save_to(save_num):
            engine.save_to(save_num)
            engine.repeat()
        # 获取列表
        save_file_list = engine.scan('save')
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

    def show_save_to_load(self, func_after_load):
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

    def save(self, filename):
        pass

    def load_save(self, filename):
        pass

    def add(self, item):
        return engine.add(item)

    def get(self, pattern):
        return engine.get(pattern)

    def get_full_time(self):
        print('即将废弃API: get_full_time')
        return engine.data['tm'].get_full_time()

    def tick(self):
        print('即将废弃API: tick')
        engine.data['api']['tick']()

    def new_hash(self):
        return e.new_hash()

    def exit(self, save=False):
        return engine.exit(save)

    def save_data_to_file(self, dot_path, ext='yaml'):
        return engine.save_data_to_file(dot_path, ext)

    def shake(self, duration=500):
        return engine.shake(duration)

    def mode(self, type='default', *arg, **kw):
        return engine.mode(type, *arg, **kw)

    def add_listener(self, type, listener, hash='', removable=True):
        return engine.add_listener(type, listener, hash, removable)

    def remove_listener(self, type, listener=None, hash=''):
        return engine.remove_listener(type, listener, hash)

    def dispatch_event(self, type, target='', value={}):
        return engine.dispatch_event(type, target, value)

    def generate_map(self):
        return engine.generate_map()


mid = Mid()
