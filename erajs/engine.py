# coding:utf-8
import os
import csv
import sys
import glob
import time
import json
import runpy
import random
import socket
import hashlib
import importlib
import threading
import configparser


def new_hash():
    m = hashlib.md5()
    m.update(str(random.random()).encode("utf-8"))
    return m.hexdigest().upper()


class DataEngine:
    data = {}
    pool = []

    def fix_path(self):
        if getattr(sys, 'frozen', False):
            # frozen
            d = os.path.dirname(sys.executable)
            gamepath = os.path.dirname(d)
        else:
            # unfrozen
            d = os.path.dirname(os.path.realpath(__file__))
            gamepath = os.path.dirname(os.path.dirname(d))
        sys.path.append(gamepath)

    def self_check(self):
        self.data = {
            "config": {
                "plugin": {},
                "dlc": {},
                "mod": {},
            },
            "plugin": {},
            "api": {},
            "entity": {},
            "db": {},
        }
        check_folder_list = [
            'config',
            'erajs/plugin',
            'erajs/prototype',
            'dlc',
            'game',
            'mod',
            'data',
            'save',
            'script'
        ]
        check_file_list = [
            'config/config.ini'
        ]
        for each in check_folder_list:
            if not os.path.isdir(each):
                print('[WARN]Folder {} is not Exist. Creating...'.format(each))
                os.mkdir(each)
        for each in check_file_list:
            if not os.path.isfile(each):
                print('[WARN]File {} is not Exist. Creating...'.format(each))
                open(each, 'w')

    def load_config(self, config_path):
        config = self.load_data(config_path)
        for each in config['config.config'].keys():
            self.data['config'][each] = config['config.config'][each]

    def scan(self, folderName):
        fileList = []
        for root, dirs, files in os.walk(folderName):
            for each in files:
                fileList.append(root + '\\' + each)
        return fileList

    def save_to(self, save_num, save_name=''):
        with open('save/'+str(save_num)+'.save', 'w', encoding='utf-8') as f:
            save_object = {
                'name': save_name,
                'data': self.data['db']
            }
            f.write(json.dumps(save_object))

    def load_from(self, save_num):
        with open('save/'+str(save_num)+'.save', 'r', encoding='utf-8') as f:
            self.data['db'] = json.loads(''.join(f.readlines()))['data']
            print('db', self.data['db'])

    def add(self, item):
        item['hash'] = new_hash()
        self.pool.append(item)
        return item['hash']

    def get(self, pattern):
        # 参考GraphQL的部分实现原理
        def match(item, pattern):
            found = True
            for each_key in pattern.keys():
                if not each_key in item.keys():
                    found = False
                    break
            if found:
                for each_key in pattern.keys():
                    if isinstance(pattern[each_key], dict):
                        if not match(item[each_key], pattern[each_key]):
                            found = False
                            break
                    elif not pattern[each_key] == item[each_key]:
                        found = False
                        break
                if found:
                    return True
            return False

        candidate_item = []
        for each in self.pool:
            if match(each, pattern):
                candidate_item.append(each)
        return candidate_item

    def load_data(self, files):
        data = {}
        for each in files:
            each = each.replace('/', '\\')
            key = '.'.join('.'.join(each.split('.')[0:-1]).split('\\'))
            ext = each.split('\\')[-1].split('.')[-1]
            # 载入文件
            print('[DEBG]│  ├─ Loading [{}]...'.format(each), end='')
            if ext in ['cfg', 'ini', 'inf', 'config']:
                config = configparser.ConfigParser()
                config.read(each)
                d = dict(config._sections)
                for k in d:
                    d[k] = dict(d[k])
                data[key] = d
            elif ext == 'csv':
                with open(each, newline='', encoding='utf-8') as f:
                    reader = csv.reader(f)
                    new_list = []
                    for row in reader:
                        new_list.append(row)
                    data[key] = new_list
            elif ext == 'json':
                with open(each, 'r', encoding='utf-8') as f:
                    data[key] = json.loads(''.join(f.readlines()))
            print('OK')
        return data


class LoadEngine(DataEngine):
    def scan_plugin(self):
        # 扫描插件文件
        plugin_path_list = self.scan('erajs/plugin')
        # 提取插件名称
        plugin_name_list = []
        for each in plugin_path_list:
            plugin_name = '.'.join(each.replace(
                '/', '\\').split('\\')[-1].split('.')[0:-1])
            print('[DEBG]│  ├─ Scanning [{}]...'.format(plugin_name), end='')
            plugin_name_list.append(plugin_name)
            print('OK')
        # 比对配置信息
        for each in plugin_name_list:
            if not each.lower() in self.data['config']['plugin'].keys():
                self.data['config']['plugin'][each.lower()] = 'no'
        # 同步
        config = configparser.ConfigParser()
        config.read_dict(self.data['config'])
        with open('config/config.ini', 'w') as configfile:
            config.write(configfile)
        return len(plugin_path_list)

    def load_plugin(self):
        num_of_loaded_plugins = 0
        for each in self.data['config']['plugin'].keys():
            if self.data['config']['plugin'][each] == 'yes':
                plugin_path_list = self.scan('erajs/plugin')
                for every in plugin_path_list:
                    module_name = '.'.join(every.replace(
                        '/', '\\').split('\\')[-1].split('.')[0:-1])
                    if module_name.lower() == each:
                        print('[DEBG]│  ├─ Loading [{}]...'.format(
                            module_name), end='')
                        with open(every, 'r', encoding='utf8') as target:
                            sys.argv = [self.data]
                            exec(''.join(target.readlines()))
                        num_of_loaded_plugins += 1
                        print('OK')
        return num_of_loaded_plugins

    def scan_script(self):
        # 扫描插件文件
        script_path_list = self.scan('script')
        # 提取插件名称
        script_name_list = []
        for each in script_path_list:
            script_name = '.'.join(each.replace(
                '/', '\\').split('\\')[-1].split('.')[0:-1])
            print('[DEBG]│  ├─ Scanning [{}]...'.format(script_name), end='')
            script_name_list.append(script_name)
            print('OK')
        return len(script_path_list)

    def load_script(self):
        num_of_loaded_script = 0
        script_path_list = self.scan('script')
        for every in script_path_list:
            module_name = '.'.join(every.replace(
                '/', '\\').split('\\')[-1].split('.')[0:-1])
            print('[DEBG]│  ├─ Loading [{}]...'.format(
                module_name), end='')
            with open(every, 'r', encoding='utf8') as target:
                sys.argv = [self.data]
                exec(''.join(target.readlines()))
            num_of_loaded_script += 1
            print('OK')
        return num_of_loaded_script

    def scan_dlc(self):
        # 扫描插件文件
        dlc_path_list = self.scan('dlc')
        # 提取插件名称
        dlc_name_list = []
        for each in dlc_path_list:
            dlc_name = '.'.join(each.replace(
                '/', '\\').split('\\')[-1].split('.')[0:-1])
            print('[DEBG]│  ├─ Scanning [{}]...'.format(dlc_name), end='')
            dlc_name_list.append(dlc_name)
            print('OK')
        # 比对配置信息
        for each in dlc_name_list:
            if not each.lower() in self.data['config']['dlc'].keys():
                self.data['config']['dlc'][each.lower()] = 'no'
        # 同步
        config = configparser.ConfigParser()
        config.read_dict(self.data['config'])
        with open('config/config.ini', 'w') as configfile:
            config.write(configfile)
        return len(dlc_path_list)

    def load_dlc(self):
        num_of_loaded_dlcs = 0
        for each in self.data['config']['dlc'].keys():
            if self.data['config']['dlc'][each] == 'yes':
                dlc_path_list = self.scan('dlc')
                for every in dlc_path_list:
                    module_name = '.'.join(every.replace(
                        '/', '\\').split('\\')[-1].split('.')[0:-1])
                    if module_name.lower() == each:
                        print('[DEBG]│  ├─ Loading [{}]...'.format(
                            module_name), end='')
                        with open(every, 'r', encoding='utf8') as target:
                            sys.argv = [self.data]
                            exec(''.join(target.readlines()))
                        num_of_loaded_dlcs += 1
                        print('OK')
        return num_of_loaded_dlcs

    def scan_mod(self):
        # 扫描插件文件
        mod_path_list = self.scan('mod')
        # 提取插件名称
        mod_name_list = []
        for each in mod_path_list:
            mod_name = '.'.join(each.replace(
                '/', '\\').split('\\')[-1].split('.')[0:-1])
            print('[DEBG]│  ├─ Scanning [{}]...'.format(mod_name), end='')
            mod_name_list.append(mod_name)
            print('OK')
        # 比对配置信息
        for each in mod_name_list:
            if not each.lower() in self.data['config']['mod'].keys():
                self.data['config']['mod'][each.lower()] = 'no'
        # 同步
        config = configparser.ConfigParser()
        config.read_dict(self.data['config'])
        with open('config/config.ini', 'w') as configfile:
            config.write(configfile)
        return len(mod_path_list)

    def load_mod(self):
        num_of_loaded_mods = 0
        for each in self.data['config']['mod'].keys():
            if self.data['config']['mod'][each] == 'yes':
                mod_path_list = self.scan('mod')
                for every in mod_path_list:
                    module_name = '.'.join(every.replace(
                        '/', '\\').split('\\')[-1].split('.')[0:-1])
                    if module_name.lower() == each:
                        print('[DEBG]│  ├─ Loading [{}]...'.format(
                            module_name), end='')
                        with open(every, 'r', encoding='utf8') as target:
                            sys.argv = [self.data]
                            exec(''.join(target.readlines()))
                        num_of_loaded_mods += 1
                        print('OK')
        return num_of_loaded_mods


class SocketEngine(LoadEngine):
    HOST = 'localhost'
    PORT = 11994
    _conn = None
    _cmd_list = []
    _gui_list = []
    isConnected = False

    def _parse_bag(self, bag):
        pass

    def connect(self):
        def core():
            while True:
                data = self.recv()
                for each in data:
                    self._parse_bag(each)

        def func_connect():
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as c:
                self._conn = c
                try:
                    self._conn.connect((self.HOST, self.PORT))
                    self.isConnected = True
                    print('Connected...', end='')
                    core()
                except OSError as err:
                    if err.errno == 10061:
                        print('[WARN]前端未启动！')
                    else:
                        print(err)

        t = threading.Thread(name='func_connect', target=func_connect)
        t.start()
        while True:
            if self.isConnected:
                break
            time.sleep(0.1)

    def send_config(self):
        bag = {
            'type': 'init',
            'value': {
                'resolution': (800, 600)},
            'from': 'b',
            'to': 'm'
        }
        self.send(bag)

    def send_loaded(self):
        bag = {
            'type': 'loaded',
            'from': 'b',
            'to': 'r'
        }
        self.send(bag)

    def send(self, bag):
        # print("[DEBG]发送：", bag)
        self._conn.send(json.dumps(bag, ensure_ascii=False).encode())

    def recv(self):
        data = self._conn.recv(4096)
        # print("[DEBG]接收：", data)
        if not data:
            return
        data = data.decode().split('}{')
        for i in range(len(data)):
            if not i == 0:
                data[i] = '}' + data[i]
            if not i == len(data) - 1:
                data[i] = data[i] + '}'
        for i, each in enumerate(data):
            data[i] = json.loads(each)
        return data


class LockEngine(SocketEngine):
    # lock 机制：
    # _lock_status 是指示当前 lock 状态的变量；
    # 0：无锁，可锁（默认）；1：有锁，可解锁；-1：无锁，不可锁；
    #  0：_unlock()        ：与 RENDERER 握手完成，鼠标左键，b；
    #  1：_lock()          ：开始游戏脚本前，p.wait；
    # -1：_unlock_forever()：鼠标右键；
    _lock_status = [0, 'mouse']

    def wait_for_unlock(self):
        # print('wait_for_unlock')
        while self.is_locked():
            time.sleep(0.1)

    def is_locked(self):
        # print('is_locked')
        if self._lock_status[0] == 1:
            return True
        else:
            return False

    def lock_passed(self):
        # print('lock_passed')
        if self._lock_status[0] == -1:
            return True
        else:
            return False

    def lock(self):
        # print('lock')
        self._lock_status[0] = 1

    def unlock(self):
        # print('unlock')
        self._lock_status[0] = 0

    def unlock_forever(self):
        # print('unlock_forever')
        self._lock_status[0] = -1


class BagEngine(LockEngine):
    _cmd_list = []
    _gui_list = []

    def _parse_bag(self, bag):
        def parse(bag):
            if bag['type'] == 'MOUSE_CLICK':
                if bag['value'] == 1:  # 左键
                    if self.is_locked:
                        self.unlock()
                elif bag['value'] == 3:  # 右键
                    if self.is_locked:
                        self.unlock_forever()
            elif bag['type'] == 'BUTTON_CLICK':
                for each in self._cmd_list:
                    if bag['hash'] == each[0]:
                        each[1](*each[2], **each[3])
            elif bag['type'] == 'RATE_CLICK':
                for each in self._cmd_list:
                    if bag['hash'] == each[0]:
                        each[1](bag['value'])
            elif bag['type'] == 'RADIO_CLICK':
                for each in self._cmd_list:
                    if bag['hash'] == each[0]:
                        each[1](bag['value'])
            elif bag['type'] == 'INPUT_CHANGE':
                for each in self._cmd_list:
                    if bag['hash'] == each[0]:
                        each[1](bag['value'])

        t = threading.Thread(target=parse, args=(bag, ))
        t.start()

    def title(self, text):
        bag = {
            'type': 'title',
            'value': text,
            'from': 'b',
            'to': 'r'
        }
        self.send(bag)

    def t(self, text='', wait=False):
        bag = {'type': 't',
               'value': text,
               'from': 'b',
               'to': 'r'}
        self.send(bag)
        if wait and not self.lock_passed():
            self.lock()
            self.wait_for_unlock()

    def b(self, text, func, *arg, **kw):
        hash = new_hash()
        bag = {
            'type': 'b',
            'value': {
                'text': text,
                'hash': hash
            },
            'from': 'b',
            'to': 'r'
        }
        bag['value']['disabled'] = False
        if 'disabled' in kw.keys():
            if kw['disabled']:
                bag['value']['disabled'] = True
            kw.pop('disabled')
        self._cmd_list.append((hash, func, arg, kw))
        self.send(bag)
        self.unlock()

    def h(self, text, rank=1):
        bag = {
            'type': 'h',
            'value': {
                'text': text,
                'rank': rank
            },
            'from': 'b',
            'to': 'r'
        }
        self.send(bag)

    def progress(self, now,  max=100, length='100px'):
        bag = {
            'type': 'progress',
            'value': {
                'now': now,
                'max': max,
                'length': length
            },
            'from': 'b',
            'to': 'r'
        }
        self.send(bag)

    def rate(self, now=0,  max=5, func=None):
        hash = new_hash()
        self._cmd_list.append((hash, func))
        bag = {
            'type': 'rate',
            'value': {
                'now': now,
                'max': max,
                'hash': hash
            },
            'from': 'b',
            'to': 'r'
        }
        self.send(bag)

    def radio(self, choice_list, default_index=0, func=None):
        hash = new_hash()
        self._cmd_list.append((hash, func))
        bag = {
            'type': 'radio',
            'value': {
                'list': choice_list,
                'default': default_index,
                'hash': hash
            },
            'from': 'b',
            'to': 'r'
        }
        self.send(bag)

    def input(self, func=None):
        hash = new_hash()
        self._cmd_list.append((hash, func))
        bag = {
            'type': 'input',
            'value': {
                'hash': hash
            },
            'from': 'b',
            'to': 'r'
        }
        self.send(bag)

    def divider(self, text=''):
        bag = {
            'type': 'divider',
            'value': text,
            'from': 'b',
            'to': 'r'
        }
        self.send(bag)

    def page(self):
        bag = {
            'type': 'page',
            'from': 'b',
            'to': 'r'
        }
        self.send(bag)
        global _cmd_list
        self._cmd_list.clear()

    def clear(self, last=False):
        bag = {'type': 'clear',
               'value': {
                   'last': last
               },
               'from': 'b',
               'to': 'r'}
        self.send(bag)

    def goto(self, func, *arg, **kw):
        print('[DEBG]GOTO: Append [{}] to [{}]'.format(
            func.__name__, self._show_gui_list()))
        self._gui_list.append((func, arg, kw))
        func(*arg, **kw)

    def back(self, *arg, **kw):
        print('[DEBG]BACK: Pop [{}] from [{}]'.format(
            self._gui_list[-1][0].__name__, self._show_gui_list()))
        self._gui_list.pop()
        self.repeat()

    def repeat(self, *arg, **kw):
        print('[DEBG]REPEAT: Repeat [{}] in [{}]'.format(
            self._gui_list[-1][0].__name__, self._show_gui_list()))
        self._gui_list[-1][0](*self._gui_list[-1][1], **self._gui_list[-1][2])

    def clear_gui(self):
        print('[DEBG]CLEAR_GUI: Set [{}] to []'.format(self._show_gui_list()))
        self._gui_list.clear()

    def _show_gui_list(self):
        gui_list = []
        for each in self._gui_list:
            gui_list.append(each[0].__name__)
        return ' → '.join(gui_list)


# # 核心技术
# HOST = 'localhost'
# PORT = 11994
# _conn = None
# _lock_status = [0, 'mouse']
# _cmd_list = []
# _gui_list = []


# def init():
#     _fix_path()
#     _connect_server()
#     _lock()
#     _wait_for_unlock()


# def init_done():
#     bag = {'type': 'LOAD_DONE', 'from': 'b', 'to': 'r'}
#     _send(bag)


# def title(text):
#     bag = {'type': 'title', 'from': 'b', 'to': 'r', 'value': text}
#     _send(bag)


# def t(text='', wait=False):
#     bag = {'type': 't', 'from': 'b', 'to': 'r', 'value': text}
#     _send(bag)
#     if wait and not _lock_passed():
#         _lock()
#         _wait_for_unlock()


# def b(text, func, *arg, **kw):
#     global _cmd_list
#     hash = _get_hash()
#     _cmd_list.append((hash, func, arg, kw))
#     bag = {
#         'type': 'b',
#         'from': 'b',
#         'to': 'r',
#         'value': {
#             'text': text,
#             'hash': hash
#         }
#     }
#     _send(bag)
#     _unlock()


# def h(text, rank=1):
#     bag = {
#         'type': 'h',
#         'from': 'b',
#         'to': 'r',
#         'value': {
#             'text': text,
#             'rank': rank
#         }
#     }
#     _send(bag)


# def progress(now, max=100, length=100):
#     bag = {
#         'type': 'progress',
#         'from': 'b',
#         'to': 'r',
#         'value': {
#             'now': now,
#             'max': max,
#             'length': length
#         }
#     }
#     _send(bag)


# def input(text=''):
#     package = {'type': 'input', 'value': text}
#     _send(package)
#     _lock('input')
#     _wait_for_unlock()


# def page():
#     bag = {'type': 'page', 'from': 'b', 'to': 'r'}
#     _send(bag)
#     global _cmd_list
#     _cmd_list.clear()


# def goto(func, *arg, **kw):
#     print('[DEBG]GOTO: Append {} in {}'.format(func.__name__, _gui_list))
#     _gui_list.append((func, arg, kw))
#     func(*arg, **kw)


# def back(*arg, **kw):
#     print('[DEBG]BACK: Pop {} from {}'.format(
#         _gui_list[-1][0].__name__, _gui_list))
#     _gui_list.pop()
#     repeat()


# def repeat(*arg, **kw):
#     print('[DEBG]REPEAT: Repeat {} in {}'.format(
#         _gui_list[-1][0].__name__, _gui_list))
#     _gui_list[-1][0](*_gui_list[-1][1], **_gui_list[-1][2])


# def mode(value='plain', *arg, **kw):
#     bag = {'type': 'mode', 'from': 'b', 'to': 'r', 'value': [value, arg, kw]}
#     _send(bag)


# def clear():
#     bag = {'type': 'clear', 'from': 'b', 'to': 'r'}
#     _send(bag)


# def _______________________________________________________():
#     pass


# # lock 机制：
# # _lock_status 是指示当前 lock 状态的变量；
# # 0：无锁，可锁（默认）；1：有锁，可解锁；-1：无锁，不可锁；
# #  0：_unlock()        ：与 RENDERER 握手完成，鼠标左键，b；
# #  1：_lock()          ：开始游戏脚本前，p.wait；
# # -1：_unlock_forever()：鼠标右键；
# def _wait_for_unlock():
#     global _lock_status
#     while _lock_status[0] == 1:
#         time.sleep(0.1)


# def _is_locked():
#     global _lock_status
#     if _lock_status[0] == 1:
#         return True
#     else:
#         return False


# def _lock_passed():
#     global _lock_status
#     if _lock_status[0] == -1:
#         return True
#     else:
#         return False


# def _lock(lock_type='mouse'):
#     global _lock_status
#     _lock_status = [1, lock_type]


# def _unlock(lock_type='mouse'):
#     global _lock_status
#     if lock_type == _lock_status[1]:
#         _lock_status = [0, lock_type]


# def _unlock_forever(lock_type='mouse'):
#     global _lock_status
#     if lock_type == _lock_status[1]:
#         _lock_status = [-1, lock_type]


# def _get_hash():
#     m = hashlib.md5()
#     m.update(str(random.random()).encode("utf-8"))
#     return m.hexdigest().upper()


# def _fix_path():
#     if getattr(sys, 'frozen', False):
#         # frozen
#         dir_ = os.path.dirname(sys.executable)
#         gamepath = os.path.dirname(dir_)
#     else:
#         # unfrozen
#         dir_ = os.path.dirname(os.path.realpath(__file__))
#         gamepath = os.path.dirname(os.path.dirname(dir_))
#     sys.path.append(gamepath)


# def _connect_server():
#     t = threading.Thread(name='socket', target=_connect)
#     t.start()


# def _connect():
#     with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as c:
#         global _conn
#         _conn = c
#         try:
#             _conn.connect((HOST, PORT))
#             print('[DONE]已连接上 MAIN ！')
#         except OSError as err:
#             if err.errno == 10061:
#                 print('[WARN]前端未启动！')
#             else:
#                 print(err)
#         # 传输客户端信息
#         print('[DEBG]开始与 MAIN 握手…')
#         syn = {'type': 'syn', 'from': 'b', 'to': 'm'}
#         _send(syn)
#         while True:
#             data = _conn.recv(4096)
#             print("[DEBG]接收：", data)
#             if not data:
#                 continue
#             data = data.decode().split('}{')
#             for i in range(len(data)):
#                 if not i == 0:
#                     data[i] = '}' + data[i]
#                 if not i == len(data) - 1:
#                     data[i] = data[i] + '}'
#             for each in data:
#                 bag = json.loads(each)
#                 if bag['type'] in ['exit', 'quit', 'close']:
#                     print("[DEBG]服务器即将关闭！")
#                     break
#                 _parse_bag(bag)


# def _send(bag):
#     print("[DEBG]发送：", bag)
#     _conn.send(json.dumps(bag, ensure_ascii=False).encode())


# def _parse_bag(bag):
#     def parse(bag):
#         if bag['type'] == 'ack':
#             pass
#         elif bag['type'] == 'syn':
#             ack = {'type': 'ack', 'from': 'b', 'to': bag['from'], 'value': bag}
#             _send(ack)
#             if bag['from'] == 'm':
#                 print('[DONE]与 MAIN 握手完成！')
#                 print('[DEBG]开始与 RENDERER 握手…')
#                 syn = {'type': 'syn', 'from': 'b', 'to': 'r'}
#                 _send(syn)
#             elif bag['from'] == 'r':
#                 print('[DONE]与 RENDERER 握手完成！')
#                 _unlock()
#         elif bag['type'] == 'MOUSE_CLICK':
#             if bag['value'] == 1:  # 左键
#                 if _is_locked:
#                     _unlock()
#             elif bag['value'] == 3:  # 右键
#                 if _is_locked:
#                     _unlock_forever()
#         elif bag['type'] == 'BUTTON_CLICK':
#             for each in _cmd_list:
#                 if bag['value'] == each[0]:
#                     each[1](*each[2], **each[3])

#     t = threading.Thread(target=parse, args=(bag, ))
#     t.start()


class Engine(BagEngine):
    version = '0.1.0'

    def register_api(self):
        # func_list = [
        #     self.fix_path,
        #     self.self_check,
        #     self.load_config,
        #     self.register_api,
        #     self.scan_plugin,
        #     self.load_plugin,
        #     self.connect,
        #     self.send_loaded,
        #     self.title,
        #     self.t,
        #     self.b,
        #     self.h,
        #     self.page,
        #     self.goto,
        #     self.back,
        #     self.repeat,
        #     self.add,
        #     self.get
        # ]
        def ban_sys(name):
            if not name[0] == '_':
                return True
            return False
        raw_func_list = dir(self)
        func_list = list(filter(ban_sys, raw_func_list))
        num_of_registered_API = 0
        for each in func_list:
            if '__call__' in dir(getattr(self, each)):
                print('[DEBG]│  ├─ Registering [{}]...'.format(each), end='')
                self.data['api'][each] = getattr(self, each)
                num_of_registered_API += 1
                print('OK')
        # print(self.data)
        return num_of_registered_API
