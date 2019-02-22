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
import gettext
import hashlib
import logging
import zipfile
import importlib
import threading
import configparser

import yaml

_ = gettext.gettext


def new_hash():
    m = hashlib.md5()
    m.update(str(random.random()).encode("utf-8"))
    return m.hexdigest().upper()


class DebugEngine:
    def __init__(self):
        formatter = logging.Formatter('')
        stream_handler = logging.StreamHandler(sys.stdout)
        stream_handler.setFormatter(formatter)
        file_handler = logging.FileHandler('Back.log', 'w', 'utf-8')
        file_handler.setFormatter(formatter)
        self.logger = logging.getLogger('logger')
        self.logger.setLevel(logging.DEBUG)
        self.logger.addHandler(stream_handler)
        self.logger.addHandler(file_handler)

    def debug(self, text):
        temp = '[DEBG]({:.7f}){}'
        text = temp.format(time.time(), text)
        self.logger.debug(text)

    def info(self, text):
        temp = '[INFO]({:.7f}){}'
        text = temp.format(time.time(), text)
        self.logger.info(text)

    def warn(self, text):
        temp = '[WARN]({:.7f}){}'
        text = temp.format(time.time(), text)
        self.logger.warning(text)

    def error(self, text):
        temp = '[ERRO]({:.7f}){}'
        text = temp.format(time.time(), text)
        self.logger.error(text)

    def critical(self, text):
        temp = '[!!!!]({:.7f}){}'
        text = temp.format(time.time(), text)
        self.logger.critical(text)


class EventEngine(DebugEngine):
    _listener_list = []

    def add_listener(self, type, listener, hash='', removable=True):
        new_listener = {
            'type': type,
            'listener': listener,
            'hash': hash,
            'removable': removable,
        }
        self._listener_list.append(new_listener)

    def remove_listener(self, type, listener=None, hash=''):
        for i, each in enumerate(self._listener_list):
            if each['type'] == type and each['listener'].__name__ == listener.__name__ and each['hash'] == hash:
                self._listener_list.pop(i)
                break

    def remove_all_listeners(self):
        new_listener_list = []
        for each in self._listener_list:
            if not each['removable']:
                new_listener_list.append(each)
        self._listener_list = new_listener_list

    def has_listener(self, type):
        found = False
        for each in self._listener_list:
            if each['type'] == type:
                found = True
        return found

    def dispatch_event(self, type, target='', value={}):
        event = {
            'type': type,
            'target': target,
            'value': value,
        }
        for each in self._listener_list:
            if event['type'] == each['type']:
                t = threading.Thread(
                    target=each['listener'],
                    args=(event, ),
                    kwargs={}
                )
                t.start()


class DataEngine(EventEngine):
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
            "class": {},
            "api": {},
            "tmp": {},
            "entity": {},
            "db": {},  # 可保存的数据
            "act": {},
            "kojo": {}
        }
        check_folder_list = [
            'config',
            'dlc',
            'logic',
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
                self.warn('Folder {} is not Exist. Creating...'.format(each))
                os.mkdir(each)
        for each in check_file_list:
            if not os.path.isfile(each):
                self.warn('File {} is not Exist. Creating...'.format(each))
                open(each, 'w')

    def load_config(self, config_path):
        config = self.load_data(config_path)
        for each in config['config.config'].keys():
            self.data['config'][each] = config['config.config'][each]

    def scan(self, path_to_folder):
        fileList = []
        for root, dirs, files in os.walk(path_to_folder):
            for each in files:
                fileList.append(root + '\\' + each)
        return fileList

    def save_to(self, save_num, save_name=''):
        self.save_file(self.data['db'],
                       'save/{}.{}.zip'.format(save_num, save_name))

    def load_from(self, save_num):
        save_file_path_list = self.scan('save')
        for each in save_file_path_list:
            if each.split('\\')[-1].split('.')[0] == str(save_num):
                self.data['db'] = self.load_file(each)

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

    def path2dot(self, path):
        """将路径转换为点路径"""
        path = path.replace('/', '\\')
        dot = '.'.join('.'.join(path.split('.')[0:-1]).split('\\'))
        ext = path.split('.')[-1]
        return dot, ext

    def dot2path(self, dot, ext):
        """将点路径转换为路径"""
        path = '.'.join(['\\'.join(dot.split('.')), ext])
        return path

    def load_data(self, files, send_func=None):
        data = {}
        for each in files:
            key = self.path2dot(each)[0]
            # 载入文件
            self.info('│  ├─ Loading [{}]...'.format(each))
            if not send_func == None:
                bag = {
                    'type': 'load_text',
                    'value': 'Data: [ {} ]...'.format(key),
                    'from': 'b',
                    'to': 'r'
                }
                send_func(bag)
            data[key] = self.load_file(each)
        return data

    def save_data_to_file(self, dot_path, ext='yaml'):
        """将一个data文件夹中加载的数据重新保存回去"""
        data = self.data[dot_path]
        path_to_file = self.dot2path(dot_path, ext)
        self.save_file(data, path_to_file)

    def load_file(self, path_to_file):
        """从文件加载数据，并返回"""
        path_to_file = path_to_file.replace('/', '\\')
        ext = path_to_file.split('\\')[-1].split('.')[-1]
        data = None
        time_start = time.time()
        if ext in ['cfg', 'config', 'ini', 'inf']:
            config = configparser.ConfigParser()
            config.read(path_to_file)
            d = dict(config._sections)
            for k in d:
                d[k] = dict(d[k])
            data = d
        elif ext == 'csv':
            with open(path_to_file, 'r', newline='', encoding='utf-8') as f:
                reader = csv.reader(f)
                new_list = []
                for row in reader:
                    new_list.append(row)
            data = new_list
        elif ext == 'json':
            with open(path_to_file, 'r', encoding='utf-8') as f:
                data = json.loads(''.join(f.readlines()))
        elif ext == 'yaml':
            with open(path_to_file, 'r', encoding='utf-8') as f:
                data = yaml.load(''.join(f.readlines()))
        elif ext == 'zip':
            with zipfile.ZipFile(path_to_file) as z:
                data = {}
                for file_name in z.namelist():
                    with z.open(file_name) as f:
                        data['.'.join(file_name.split('.')[0:-1])
                             ] = json.loads(f.read())
        elif ext == 'txt':
            data = []
            with open(path_to_file, 'r') as f:
                for line in f.readlines():
                    data.append(line[:-1])
        time_stop = time.time()
        # print('加载{}文件用时：{}ms'.format(path_to_file,
        #                              int((time_stop-time_start)*1000)))
        return data

    def save_file(self, data, path_to_file):
        """保存数据到某文件"""
        path_to_file = path_to_file.replace('/', '\\')
        ext = path_to_file.split('\\')[-1].split('.')[-1]
        time_start = time.time()
        if ext in ['cfg', 'config', 'ini', 'inf']:
            config = configparser.ConfigParser()
            config.read_dict(data)
            with open(path_to_file, 'w')as f:
                config.write(f)
        elif ext == 'csv':
            with open(path_to_file, 'w', newline='', encoding='utf-8') as f:
                reader = csv.writer(f)
                reader.writerows(data)
        elif ext == 'json':
            with open(path_to_file, 'w', encoding='utf-8') as f:
                f.write(json.dumps(data, ensure_ascii=False))
        elif ext == 'yaml':
            with open(path_to_file, 'w', encoding='utf-8') as f:
                f.write(yaml.dump(data, allow_unicode=True,
                                  default_flow_style=False))
        elif ext == 'zip':
            with zipfile.ZipFile(path_to_file, 'w', zipfile.ZIP_LZMA) as z:
                for key in data:
                    z.writestr('{}.json'.format(key), json.dumps(
                        data[key], ensure_ascii=False))
        elif ext == 'txt':
            with open(path_to_file, 'w') as f:
                for line in data:
                    f.write('{}\n'.format(line))
        time_stop = time.time()
        # print('保存{}文件用时：{}ms'.format(path_to_file,
        #                              int((time_stop-time_start)*1000)))


class LoadEngine(DataEngine):
    def scan_plugin(self):
        # 扫描插件文件
        path = os.path.dirname(os.path.abspath(__file__))
        plugin_path_list = self.scan('{}/plugin'.format(path))
        # 提取插件名称
        plugin_name_list = []
        for each in plugin_path_list:
            plugin_name = '.'.join(each.replace(
                '/', '\\').split('\\')[-1].split('.')[0:-1])
            self.info('│  ├─ Scanning [{}]...'.format(plugin_name))
            plugin_name_list.append(plugin_name)
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
        path = os.path.dirname(os.path.abspath(__file__))
        for each in self.data['config']['plugin'].keys():
            if self.data['config']['plugin'][each] == 'yes':
                plugin_path_list = self.scan('{}/plugin'.format(path))
                for every in plugin_path_list:
                    module_name = '.'.join(every.replace(
                        '/', '\\').split('\\')[-1].split('.')[0:-1])
                    if module_name.lower() == each:
                        self.info('│  ├─ Loading [{}]...'.format(module_name))
                        # importlib.import_module('')
                        with open(every, 'r', encoding='utf8') as target:
                            sys.argv = [self]
                            exec(''.join(target.readlines()))
                        num_of_loaded_plugins += 1
        return num_of_loaded_plugins

    def scan_script(self):
        # 扫描插件文件
        script_path_list = self.scan('script')
        # 提取插件名称
        script_name_list = []
        for each in script_path_list:
            script_name = '.'.join(each.replace(
                '/', '\\').split('\\')[-1].split('.')[0:-1])
            self.info('│  ├─ Scanning [{}]...'.format(script_name))
            script_name_list.append(script_name)
        return len(script_path_list)

    def load_script(self, send_func=None):
        num_of_loaded_script = 0
        script_path_list = self.scan('script')
        for every in script_path_list:
            module_name = '.'.join(every.replace(
                '/', '\\').split('\\')[-1].split('.')[0:-1])
            self.info('│  ├─ Loading [{}]...'.format(module_name))
            if not send_func == None:
                bag = {
                    'type': 'load_text',
                    'value': 'Script: [ {} ]...'.format(module_name),
                    'from': 'b',
                    'to': 'r'
                }
                send_func(bag)
            with open(every, 'r', encoding='utf8') as target:
                sys.argv = [self]
                exec(''.join(target.readlines()))
            num_of_loaded_script += 1
        return num_of_loaded_script

    def scan_dlc(self):
        # 扫描插件文件
        dlc_path_list = self.scan('dlc')
        # 提取插件名称
        dlc_name_list = []
        for each in dlc_path_list:
            dlc_name = '.'.join(each.replace(
                '/', '\\').split('\\')[-1].split('.')[0:-1])
            self.info('│  ├─ Scanning [{}]...'.format(dlc_name))
            dlc_name_list.append(dlc_name)
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
                        self.info('│  ├─ Loading [{}]...'.format(module_name))
                        with open(every, 'r', encoding='utf8') as target:
                            sys.argv = [self]
                            exec(''.join(target.readlines()))
                        num_of_loaded_dlcs += 1
        return num_of_loaded_dlcs

    def scan_mod(self):
        # 扫描插件文件
        mod_path_list = self.scan('mod')
        # 提取插件名称
        mod_name_list = []
        for each in mod_path_list:
            mod_name = '.'.join(each.replace(
                '/', '\\').split('\\')[-1].split('.')[0:-1])
            self.info('│  ├─ Scanning [{}]...'.format(mod_name))
            mod_name_list.append(mod_name)
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
                        self.info('│  ├─ Loading [{}]...'.format(module_name))
                        with open(every, 'r', encoding='utf8') as target:
                            sys.argv = [self]
                            exec(''.join(target.readlines()))
                        num_of_loaded_mods += 1
        return num_of_loaded_mods


class SocketEngine(LoadEngine):
    HOST = 'localhost'
    PORT = 11994
    _conn = None
    _cmd_list = []
    _gui_list = []
    isConnected = False

    def _parse_bag(self, bag):
        target = ''
        value = {}
        if 'hash' in bag:
            target = bag['hash']
        if 'value' in bag:
            value = bag['value']
        self.dispatch_event(bag['type'], target, value)

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
                    self.info('│  └─ Connected!')
                    core()
                except OSError as err:
                    if err.errno == 10061:
                        self.warn('前端未启动！')
                        os._exit(1)
                    else:
                        self.error(err)

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
        # self.debug("发送：{}".format(bag))
        self._conn.send(json.dumps(bag, ensure_ascii=False).encode())

    def recv(self):
        data = self._conn.recv(4096000)
        # self.debug("接收：{}".format(data))
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

    # def _parse_bag(self, bag):
    #     def parse(bag):
    #         if bag['type'] == 'MOUSE_CLICK':
    #             if bag['value'] == 1:  # 左键
    #                 if self.is_locked:
    #                     self.unlock()
    #             elif bag['value'] == 3:  # 右键
    #                 if self.is_locked:
    #                     self.unlock_forever()
    #         elif bag['type'] == 'BUTTON_CLICK':
    #             for each in self._cmd_list:
    #                 if bag['hash'] == each[0]:
    #                     each[1](*each[2], **each[3])
    #         elif bag['type'] == 'RATE_CLICK':
    #             for each in self._cmd_list:
    #                 if bag['hash'] == each[0]:
    #                     each[1](bag['value'])
    #         elif bag['type'] == 'RADIO_CLICK':
    #             for each in self._cmd_list:
    #                 if bag['hash'] == each[0]:
    #                     each[1](bag['value'])
    #         elif bag['type'] == 'INPUT_CHANGE':
    #             for each in self._cmd_list:
    #                 if bag['hash'] == each[0]:
    #                     each[1](bag['value'])
    #         elif bag['type'] == 'DROPDOWN_CHANGE':
    #             for each in self._cmd_list:
    #                 if bag['hash'] == each[0]:
    #                     each[1](bag['value'])
    #         elif bag['type'] == 'CMD':
    #             def result(data):
    #                 bag = {
    #                     'type': 'result',
    #                     'value': data,
    #                     'from': 'b',
    #                     'to': 'r'
    #                 }
    #                 self.send(bag)
    #             cmd = bag['value']
    #             if cmd[0] == 'fix':
    #                 result('OK!')
    #         else:
    #             for each in self._cmd_list:
    #                 if bag['hash'] == each[0]:
    #                     each[1](bag['value'])

    #     t = threading.Thread(target=parse, args=(bag, ))
    #     t.start()

    def title(self, text):
        bag = {
            'type': 'title',
            'value': text,
            'from': 'b',
            'to': 'r'
        }
        self.send(bag)

    def t(self, text='', wait=False, color='default', bcolor='default'):
        bag = {
            'type': 't',
            'value': {
                'text': text,
                'color': color,
                'bcolor': bcolor
            },
            'from': 'b',
            'to': 'r'
        }
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
        if func == None:
            bag['value']['disabled'] = True
        if 'isLink' in kw.keys():
            if kw['isLink']:
                bag['value']['isLink'] = True
            kw.pop('isLink')
        if 'popup' in kw.keys():
            bag['value']['popup'] = kw['popup']
            kw.pop('popup')
        else:
            bag['value']['popup'] = ''
        if 'color' in kw.keys():
            bag['value']['color'] = kw['color']
            kw.pop('color')
        else:
            bag['value']['color'] = ''

        def handle_callback(e):
            if e['target'] == hash:
                func(*arg, **kw)
        self.add_listener('BUTTON_CLICK', handle_callback, hash)
        # self._cmd_list.append((hash, func, arg, kw))
        self.send(bag)
        self.unlock()

    def h(self, text, rank=1, color='default', bcolor='default'):
        bag = {
            'type': 'h',
            'value': {
                'text': text,
                'rank': rank,
                'color': color,
                'bcolor': bcolor
            },
            'from': 'b',
            'to': 'r'
        }
        self.send(bag)

    def progress(self, now,  max=100, length=100):
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

    def rate(self, now=0,  max=5, func=None, disabled=True):
        hash = new_hash()

        def handle_callback(e):
            if e['target'] == hash:
                func(e['value'])
        self.add_listener('RATE_CLICK', handle_callback, hash)
        # self._cmd_list.append((hash, func))
        bag = {
            'type': 'rate',
            'value': {
                'now': now,
                'max': max,
                'hash': hash,
                'disabled': disabled
            },
            'from': 'b',
            'to': 'r'
        }
        self.send(bag)

    def radio(self, choice_list, default_index=0, func=None):
        hash = new_hash()

        def handle_callback(e):
            if e['target'] == hash:
                func(e['value'])
        self.add_listener('RADIO_CLICK', handle_callback, hash)
        # self._cmd_list.append((hash, func))
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

    def input(self, func=None, default=''):
        hash = new_hash()

        def handle_callback(e):
            if e['target'] == hash:
                func(e['value'])
        self.add_listener('INPUT_CHANGE', handle_callback, hash)
        # self._cmd_list.append((hash, func))
        bag = {
            'type': 'input',
            'value': {
                'hash': hash,
                'default': default
            },
            'from': 'b',
            'to': 'r'
        }
        self.send(bag)

    def dropdown(self, options, func=None, default='', search=False, multiple=False, placeholder='', allowAdditions=False):
        hash = new_hash()

        def handle_callback(e):
            if e['target'] == hash:
                func(e['value'])
        self.add_listener('DROPDOWN_CHANGE', handle_callback, hash)
        # self._cmd_list.append((hash, func))
        new_options = []
        for each in options:
            new_options.append({
                'value': each,
                'text': each
            })
        # default = {
        #     'value': default,
        #     'text': default
        # }
        bag = {
            'type': 'dropdown',
            'value': {
                'hash': hash,
                'options': new_options,
                'default': default,
                'search': search,
                'multiple': multiple,
                'placeholder': placeholder,
                'allowAdditions': allowAdditions
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

    def chart(self, chart_type, data, width=200, height=200):
        hash = new_hash()
        bag = {
            'type': 'chart',
            'value': {
                'type': chart_type,
                'data': data,
                'hash': hash,
                'width': width,
                'height': height
            },
            'from': 'b',
            'to': 'r'
        }
        self.send(bag)

    def page(self, color='default'):
        bag = {
            'type': 'page',
            'value': {
                'color': color
            },
            'from': 'b',
            'to': 'r'
        }
        self.send(bag)
        self.remove_all_listeners()
        self.mode()

    def clear(self, num=0):
        bag = {'type': 'clear',
               'value': {
                   'num': num
               },
               'from': 'b',
               'to': 'r'}
        self.send(bag)

    def goto(self, func, *arg, **kw):
        self.debug('GOTO: Append [{}] to [{}] & run'.format(
            func.__name__, self._show_gui_list()))
        self._gui_list.append((func, arg, kw))  # append_gui
        func(*arg, **kw)

    def back(self, num=1, *arg, **kw):
        for i in range(num):
            self.debug('BACK: Pop [{}] from [{}]'.format(
                self._gui_list[-1][0].__name__, self._show_gui_list()))
            self._gui_list.pop()
        self.debug('BACK: & run last')
        self._gui_list[-1][0](*self._gui_list[-1][1], **
                              self._gui_list[-1][2])  # repeat

    def repeat(self, *arg, **kw):
        self.debug('REPEAT: Run [{}] in [{}]'.format(
            self._gui_list[-1][0].__name__, self._show_gui_list()))
        self._gui_list[-1][0](*self._gui_list[-1][1], **self._gui_list[-1][2])

    def append_gui(self, func, *arg, **kw):
        self.debug('APPEND: Append [{}] to [{}]'.format(
            func.__name__, self._show_gui_list()))
        self._gui_list.append((func, arg, kw))

    def clear_gui(self, num=0):
        if num == 0:
            self.debug('CLEAR_ALL_GUI: Set [{}] to []'.format(
                self._show_gui_list()))
            self._gui_list.clear()
        else:
            for i in range(num):
                self.debug('CLEAR_LAST_GUI: Pop [{}] from [{}]'.format(
                    self._gui_list[-1][0].__name__, self._show_gui_list()))
                self._gui_list.pop()

    def get_gui_list(self):
        gui_list = []
        for each in self._gui_list:
            gui_list.append(each[0].__name__)
        return gui_list

    def exit(self, save=False):
        bag = {'type': 'exit',
               'value': {
                   'save': save
               },
               'from': 'b',
               'to': 'r'
               }
        self.send(bag)

    def shake(self, duration=500):
        bag = {'type': 'shake',
               'value': {
                   'duration': duration
               },
               'from': 'b',
               'to': 'r'
               }
        self.send(bag)

    def mode(self, type='default', *arg, **kw):
        bag = {'type': 'mode',
               'value': {
                   'mode': type
               },
               'from': 'b',
               'to': 'r'
               }
        if type == 'grid':
            bag['value']['celled'] = False
            bag['value']['compact'] = False
            if 'column' in kw:
                bag['value']['column'] == kw['column']
            if len(arg) == 1:
                bag['value']['column'] = arg[0]
            if 'celled'in kw:
                bag['value']['celled'] = kw['celled']
            if 'compact'in kw:
                bag['value']['compact'] = kw['compact']
        self.send(bag)

    def generate_map(self):
        bag = {'type': 'generate_map',
               'value': {},
               'from': 'b',
               'to': 'r'
               }
        self.send(bag)

    def _show_gui_list(self):
        gui_list = []
        for each in self._gui_list:
            gui_list.append(each[0].__name__)
        return ' → '.join(gui_list)


class Engine(BagEngine):
    version = '0.1.0'

    def __init__(self):
        super().__init__()

        def handle_lock(e):
            if e['value'] == 1:  # 左键
                if self.is_locked:
                    self.unlock()
            elif e['value'] == 3:  # 右键
                if self.is_locked:
                    self.unlock_forever()
        self.add_listener('MOUSE_CLICK', handle_lock, removable=False)

        def handle_cmd(e):
            def result(data):
                bag = {
                    'type': 'result',
                    'value': data,
                    'from': 'b',
                    'to': 'r'
                }
                self.send(bag)
            cmd = e['value']
            if cmd[0] == 'fix':
                result('OK!')
        self.add_listener('CMD', handle_cmd, removable=False)

        def handle_send(e):
            self.send(e['value'])
        self.add_listener('SEND', handle_send, removable=False)

    def register_api(self):
        def ban_sys(name):
            if not name[0] == '_':
                return True
            return False
        raw_func_list = dir(self)
        func_list = list(filter(ban_sys, raw_func_list))
        num_of_registered_API = 0
        for each in func_list:
            if '__call__' in dir(getattr(self, each)):
                self.info('│  ├─ Registering [{}]...'.format(each))
                self.data['api'][each] = getattr(self, each)
                num_of_registered_API += 1
        # print(self.data)
        return num_of_registered_API
