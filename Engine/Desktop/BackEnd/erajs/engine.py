import datetime
import json
import logging
import os
import secrets
import socket
import sys
import threading
import time
from importlib.util import module_from_spec, spec_from_file_location
from typing import Any, Callable, ClassVar, Dict, List, Optional, Tuple

from .file_format_support import (cfg_file, csv_file, json_file, raw_file,
                                  save_file, text_file, yaml_file, zip_file)
from .modules.dot_path import DotPath


class Tools:
    @staticmethod
    def random_hash(level: int = 4):
        """
        # 随机哈希值生成器
        返回随机生成的哈希字符串
        - level == n，返回长度为2n的字符串，在16^n个项目中随机，任意两个值相同的概率为1/16^n/2。
        - 示例：U2S3T7F5
        """
        return secrets.token_hex(level).upper()

    @staticmethod
    def timestamp():
        """
        # 时间戳生成器
        - 示例：201231-030619-123456
        """
        return datetime.datetime.today().strftime("%y%m%d-%H%M%S-%f")

    @staticmethod
    def uuid():
        """
        # UUID生成器
        - 示例：201231-030619-123456-394527
        """
        timestamp = Tools.timestamp()
        hash = '{:0>6d}'.format(secrets.randbelow(1000000))
        uuid = '{}-{}'.format(timestamp, hash)
        return uuid


class Singleton:
    """
    # 单例模式原型
    """
    __instance: ClassVar[Optional['Singleton']] = None

    def __new__(cls, *args: Any, **kw: Any):
        if not cls.__instance:
            cls.__instance = super(Singleton, cls).__new__(cls, *args, **kw)
        return cls.__instance


class DebugManager(Singleton):
    """
    # 调试管理器
    """
    DEBUG_LEVEL_PREFIX_TEXT = ['DEBG', 'INFO', 'WARN', 'ERRO', '!!!!']

    def __init__(self):
        super().__init__()

        formatter = logging.Formatter()

        stream_handler = logging.StreamHandler(sys.stdout)
        stream_handler.setFormatter(formatter)

        file_handler = logging.FileHandler('Erajs.log', 'w', 'utf-8')
        file_handler.setFormatter(formatter)

        self.__logger = logging.getLogger()
        self.__logger.setLevel(logging.DEBUG)

        if len(self.__logger.handlers) == 0:
            self.__logger.addHandler(stream_handler)
            self.__logger.addHandler(file_handler)

    def debug(self, *arg: Any, **kw: Any):
        self.__log(0, *arg, **kw)

    def info(self,  *arg: Any, **kw: Any):
        self.__log(1, *arg, **kw)

    def warn(self, *arg: Any, **kw: Any):
        self.__log(2, *arg, **kw)

    def error(self, *arg: Any, **kw: Any):
        self.__log(3, *arg, **kw)

    def critical(self,  *arg: Any, **kw: Any):
        self.__log(4, *arg, **kw)

    def __log(self, level: int, *arg: Any, **kw: Any):
        template = '[{}]({}){}'
        prefix = self.DEBUG_LEVEL_PREFIX_TEXT[level]
        timestamp = Tools.timestamp()
        text = ' '.join([str(msg) for msg in arg])
        text = template.format(prefix, timestamp, text)
        self.__logger.debug(text)


class EventManager(DebugManager):
    def __init__(self):
        super().__init__()
        self.__listeners: Dict[str, Any] = {}

    def on(self, event_type: str, callback: Callable[[Any], None], once: bool = False, tags: Optional[List[str]] = None):
        listener: Dict[str, Any] = {
            'hash': Tools.random_hash(),
            'type': event_type,
            'callback': callback,
            'once': once,
            'tags': [] if tags is None else tags
        }
        self.__listeners[str(listener['hash'])] = listener
        return listener

    def off(self, event_type: str, callback: Callable[[Any], None]):
        for key in list(self.__listeners.keys()):
            if self.__listeners[key]['type'] == event_type and str(self.__listeners[key]['callback'].__name__) == callback.__name__:
                del self.__listeners[key]

    def emit(self, event_type: str, *arg: Any, **kw: Any):
        for hash in list(self.__listeners.keys()):
            if hash in self.__listeners and self.__listeners[hash]['type'] == event_type:
                t = threading.Thread(target=self.__listeners[hash]['callback'], args=arg, kwargs=kw)
                if self.__listeners[hash]['once']:
                    del self.__listeners[hash]
                t.start()

    def remove_all_listeners(self, *exception_tags: str):
        for key in list(self.__listeners.keys()):
            is_exception = False
            for tag in self.__listeners[key]['tags']:
                if tag in exception_tags:
                    is_exception = True
                    break
            if not is_exception:
                del self.__listeners[key]

    def get_listener_list(self):
        return self.__listeners


class LockManager(EventManager):
    # lock 机制：
    # __lock_status 是指示当前 lock 状态的变量；
    # 0：无锁，可锁（默认）；1：有锁，可解锁；-1：无锁，不可锁；
    #  0：_unlock()        ：与 RENDERER 握手完成，鼠标左键，b；
    #  1：_lock()          ：开始游戏脚本前，p.wait；
    # -1：_unlock_forever()：鼠标右键；
    __lock_status = [0, 'mouse']

    def __init__(self):
        super().__init__()

    def wait_for_unlock(self):
        # print('wait_for_unlock')
        while self.is_locked():
            time.sleep(0.1)

    def is_locked(self):
        # print('is_locked')
        if self.__lock_status[0] == 1:
            return True
        else:
            return False

    def lock_passed(self):
        # print('lock_passed')
        if self.__lock_status[0] == -1:
            return True
        else:
            return False

    def lock(self):
        # print('lock')
        self.__lock_status[0] = 1

    def unlock(self):
        # print('unlock')
        self.__lock_status[0] = 0

    def unlock_forever(self):
        # print('unlock_forever')
        self.__lock_status[0] = -1


class DataManager(LockManager):
    SCOPE_MAP = {
        'config': 'cfg',
        'data': 'dat',
        'save': 'sav',
        'res': 'res',
        'mods': 'mod'
    }

    def __init__(self):
        super().__init__()
        self.__raw: Dict[str, Any] = {}
        self.__cfg: Dict[str, Any] = {}
        self.__dat: Dict[str, Any] = {}
        self.__sav: Dict[str, Dict[str, Any]] = {
            'meta': {},
            'data': {}
        }
        self.__res: Dict[str, Any] = {}
        self.__tmp: Dict[str, Any] = {}
        self.registry: Dict[str, str] = {}

    def register(self, path: str, mod_id: Optional[str] = None):
        """
        ['mod.era.items'] = \\mods\\EraLifeEraizationMod\\data\\items.yml
        """
        GDP = self.P2GDP(path, mod_id)
        self.registry[GDP[0]] = path
        return GDP

    def get_registries(self, scope: str):
        candidates: List[str] = []
        for gdp in self.registry:
            if gdp.split('.')[0] == scope:
                candidates.append(gdp)
        return candidates

    def get_io_by_ext(self, ext: str):
        if ext in ['.inf', '.ini', '.cfg', '.conf', '.config']:
            return cfg_file
        elif ext == '.csv':
            return csv_file
        elif ext == '.json':
            return json_file
        elif ext in ['.yml', '.yaml']:
            return yaml_file
        elif ext == '.zip':
            return zip_file
        elif ext == '.txt':
            return text_file
        elif ext in ['.save', '.sav']:
            return save_file
        else:
            return raw_file

    def read(self, path: str):
        """
        # 读取文件到数据
        """
        ext = os.path.splitext(path)[1].lower()
        reader = self.get_io_by_ext(ext)
        return reader.read(path)

    def write(self, path: str, data: Any = None):
        """
        # 写入数据到文件
        """
        ext = os.path.splitext(path)[1].lower()
        writer = self.get_io_by_ext(ext)
        writer.write(path, data)

    def P2GDP(self, path: str, mod_id: Optional[str] = None):
        pieces = path.replace('/', '\\').replace('\\', '.').split('.')
        pieces[0] = self.SCOPE_MAP[pieces[0]]
        if pieces[0] == 'mod' and mod_id is not None:
            pieces[1] = mod_id
        dot = '.'.join(pieces[0:-1])
        ext = pieces[-1].lower()
        return dot, ext

    def GDP2DP(self, gdp: str):
        pieces = gdp.split(".")
        scope = pieces[0]
        dp = '.'.join(pieces[1:])
        return dp, scope

    def DP2GDP(self, dp: str, scope: str, mod_id: Optional[str] = None):
        if scope == 'mod' and mod_id is not None:
            dp = '{}.{}'.format(mod_id, dp)
        gdp = '{}.{}'.format(scope, dp)
        return gdp

    def scan(self, path: str):
        """
        # 递归文件夹路径下文件的路径
        """
        files: List[str] = []
        for dirpath, _, filenames in os.walk(path, True):
            for filename in filenames:
                files.append('{}\\{}'.format(dirpath, filename))
        return files

    def mount(self, gdp: str):
        if gdp in self.registry:
            if gdp not in self.__raw:
                self.__raw[gdp] = self.read(self.registry[gdp])

    def umount(self, gdp: str):
        if gdp in self.__raw:
            del self.__raw[gdp]

    def umount_all(self):
        self.__raw.clear()

    def mounted(self, gdp: str):
        return gdp in self.__raw

    def save(self, gdp: str):
        if self.mounted(gdp):
            self.write(self.registry[gdp], self.__raw[gdp])

    def raw(self, gdp: str):
        """
        ('era.items', 'dat') = \\mods\\EraLifeEraizationMod\\data\\items.yml
        """
        if gdp in self.__raw:
            return self.__raw[gdp]
        elif gdp in self.registry:
            self.mount(gdp)
            return self.__raw[gdp]
        return None

    def cfg(self, dp: Optional[str] = None) -> Optional[Dict[str, str]]:
        """
        # CFG
        """
        if dp is None:
            return self.__cfg
        elif dp in self.__cfg:
            return self.__cfg[dp]
        else:
            gdp = self.DP2GDP(dp, 'cfg')
            if gdp in self.__raw:
                self.__cfg[dp] = self.__raw[gdp]
                return self.__cfg[dp]
            elif gdp in self.registry:
                if self.mount(gdp):
                    self.__cfg[dp] = self.__raw[gdp]
                    return self.__cfg[dp]
        return None

    def dat(self, dp: Optional[str] = None) -> Optional[Dict[str, str]]:
        """
        # DAT
        """
        if dp is None:
            return self.__dat
        elif dp in self.__dat:
            return self.__dat[dp]
        else:
            gdp = self.DP2GDP(dp, 'dat')
            if gdp in self.__raw:
                self.__dat[dp] = self.__raw[gdp]
                return self.__dat[dp]
            elif gdp in self.registry:
                if self.mount(gdp):
                    self.__dat[dp] = self.__raw[gdp]
                    return self.__dat[dp]
        return None

    def sav(self, dp: Optional[str] = None) -> Optional[Dict[str, str]]:
        """
        # SAV
        除非你需要操作存档信息，否则请不要占用“meta”点路径，因为sav('meta')是内置的存档信息保存点。
        """
        if dp is None:
            return self.__sav['data']
        elif dp == 'meta':
            return self.__sav['meta']
        elif dp in self.__sav['data']:
            return self.__sav['data'][dp]
        else:
            return None

    def tmp(self, key: Optional[str] = None) -> Dict[str, str]:
        """
        # TMP
        tmp
        """
        if key is None:
            return self.__tmp
        elif key in self.__tmp:
            return self.__tmp[key]
        else:
            self.__tmp[key] = {}
            return self.__tmp[key]

    @property
    def data(self):
        """
        Deprecated
        """
        data: Dict[str, Any] = {
            'cfg': self.__cfg,
            'dat': self.__dat,
            'sav': self.__sav,
            'tmp': self.__tmp,
            'res': self.__res,
        }
        return data


class NetManager(DataManager):
    def __init__(self):
        super().__init__()
        self.__debug = False
        self.__buf_size = 4096
        self.__connection: Optional[socket.socket] = None
        self.__is_connected = False
        self.__state: Any = {
            'length': 0,
            'length_bytes': '',
            'content_bytes': b''
        }

    def connect(self, host: str = '127.0.0.1', port: int = 11994):
        def core():
            try:
                with socket.create_connection((host, port)) as conn:
                    self.info('│  └─ Connected!')
                    self.__connection = conn
                    self.__is_connected = True
                    while True:
                        self.handle_recv_once(
                            self.__connection.recv(self.__buf_size))
            except ConnectionRefusedError:
                self.warn('│  ├─ [!] FrontEnd Not Running!')
                self.warn('│  ├─ [.] Please Start the FrontEnd First!')
        self.info('├─ Connecting...')
        t = threading.Thread(target=core)
        t.start()
        o = 0
        while not self.__is_connected:
            if o > 50:
                self.warn('├<<┴─ Connection TimeOut & Failed!')
                return False
            else:
                o += 1
            time.sleep(0.1)
        return True

    def handle_recv_once(self, buf: bytes):
        if self.__state['length'] == 0:
            for i, char in enumerate(buf):
                c = chr(char)
                if c == ':':
                    self.__state['length'] = int(self.__state['length_bytes'])
                    self.__state['length_bytes'] = ''
                    self.handle_recv_once(buf[i+1:])
                    return
                else:
                    self.__state['length_bytes'] += c
        elif len(self.__state['content_bytes']) + len(buf) < self.__state['length']:
            self.__state['content_bytes'] += buf
        else:
            index = self.__state['length'] - len(self.__state['content_bytes'])
            self.__state['content_bytes'] += buf[0:index]
            s = self.__state['content_bytes'].decode()
            self.recv(s)
            self.__state['length'] = 0
            self.__state['content_bytes'] = b''
            self.handle_recv_once(buf[index:])

    def send(self, data: Any):
        if self.__connection:
            msg = json.dumps(data)
            self.debug(f'Send: {msg}') if self.__debug else None
            content = msg.encode()
            b = str(len(content)).encode()+b':'+content
            self.__connection.sendall(b)

    def recv(self, msg: str):
        self.debug(f'Recv: {msg}') if self.__debug else None
        data = json.loads(msg)
        self.emit(data['type'], data)


class UiManager(NetManager):
    def __init__(self):
        super().__init__()
        self.__gui_list: List[Tuple[Any, ...]] = []

    def register_entry(self, entry_func: Callable[[], None], *arg: List[Any], **kwargs: Dict[str, str]):
        self.debug('Register Entry: {}'.format(entry_func.__name__))
        self.__entry: List[Any] = [entry_func, arg, kwargs]

    def get_entry_func(self):
        return self.__entry[0]

    def push(self, type: str, data: Any, style: Dict[str, str]):
        pkg: Dict[str, Any] = {
            'type': type,
            'data': data,
            'style': style
        }
        self.send(pkg)

    def goto(self, ui_func: Callable[[], None], *arg: Any, **kw: Dict[str, str]):
        self.debug('GOTO: Append [{}] to [{}] & run'.format(
            ui_func.__name__, self._show_gui_list()))
        self.__gui_list.append((ui_func, arg, kw))  # append_gui
        ui_func(*arg, **kw)

    def back(self, num: int = 1, *arg: List[Any], **kw: Dict[str, str]):
        for _ in range(num):
            self.debug('BACK: Pop [{}] from [{}]'.format(
                self.__gui_list[-1][0].__name__, self._show_gui_list()))
            self.__gui_list.pop()
        self.debug('BACK: & run last')
        self.__gui_list[-1][0](*self.__gui_list[-1][1],
                               **self.__gui_list[-1][2])  # repeat

    def repeat(self, *arg: List[Any], **kw: Dict[str, str]):
        self.debug('REPEAT: Run [{}] in [{}]'.format(
            self.__gui_list[-1][0].__name__, self._show_gui_list()))
        self.__gui_list[-1][0](*self.__gui_list[-1][1],
                               **self.__gui_list[-1][2])

    def append_gui(self, func: Callable[[], None], *arg: List[Any], **kw: Dict[str, str]):
        self.debug('APPEND: Append [{}] to [{}]'.format(
            func.__name__, self._show_gui_list()))
        self.__gui_list.append((func, arg, kw))

    def clear(self, num: int = 0):
        if num == 0:
            self.debug('CLEAR_ALL_GUI: Set [{}] to []'.format(
                self._show_gui_list()))
            self.__gui_list.clear()
        else:
            for _ in range(num):
                self.debug('CLEAR_LAST_GUI: Pop [{}] from [{}]'.format(
                    self.__gui_list[-1][0].__name__, self._show_gui_list()))
                self.__gui_list.pop()

    def get_gui_list(self):
        gui_list: List[str] = []
        for each in self.__gui_list:
            gui_list.append(each[0].__name__)
        return gui_list

    def _show_gui_list(self):
        gui_list: List[str] = []
        for each in self.__gui_list:
            gui_list.append(each[0].__name__)
        return ' → '.join(gui_list)


class ModManager(UiManager):
    """
    # 模组管理器
    # Mod File Structure
    ```
    Mod
    ├─ config
    │  ├─ *.yml
    │  ├─ *.json
    │  └─ ...
    ├─ data
    │  ├─ *.yml
    │  ├─ *.json
    │  └─ ...
    ├─ res
    │  ├─ *.svg
    │  ├─ *.png
    │  └─ ...
    ├─ meta.yml
    ├─ *.py
    └─ ...
    ```
    # Mod Meta File Structure(meta.yml)
    ```yml
    id: test #(required)[Short,NoSpace]
    name: A Friendly Name #(optional)[AnyStr]
    version: v0.1.0-beta+201112.fix #(required)[QualifiedSemVer]
    main: test.py #(required)
    ```
    """

    def __init__(self):
        super().__init__()

    def scan_mods(self) -> Dict[str, str]:
        mods: Dict[str, str] = {}
        for entry_name in os.listdir('mods'):
            path = os.path.join('mods', entry_name)
            if os.path.isdir(path):
                meta_path = os.path.join(path, 'meta.yml')
                if os.path.isfile(meta_path):
                    meta = self.read(meta_path)
                    meta['path'] = path
                    if meta['id'] in mods:
                        new_dot_path = DotPath.path2dot(path)[0]
                        old_dot_path = DotPath.path2dot(
                            mods[meta['id']]['path']
                        )[0]
                        self.warn(
                            f'│  ├─ [!] Mod ID Conflict! [{new_dot_path}] will overwrite [{old_dot_path}]!'
                        )
                    mods[meta['id']] = meta
        return mods

    def load_mod_data(self, id: str):
        sys_config = self.cfg('sys')
        if sys_config is None:
            return
        configs = sys_config['mods']
        config = configs[self.findModInCfg(id)]
        data_file_paths = self.scan(config['path'])
        data_file_dot_paths = []
        for path in data_file_paths:
            path = path.replace('/', '\\')
            if path.split('\\')[2] == 'data':
                data_file_dot_paths.append(['{}.'.format(config['id'])+DotPath.path2dot('\\'.join(path.split('\\')[3:]))[0], path])
                self.register(path)
        for pair in data_file_dot_paths:
            self.dat()[pair[0]] = self.read(pair[1])

    def load_mod(self, id: str):
        sys_config = self.cfg('sys')
        if sys_config is None:
            return
        configs = sys_config['mods']
        config = configs[self.findModInCfg(id)]
        module = self.get_mod_module(config)
        if 'on_loaded' in dir(module):
            module.on_loaded()

    def enable_mod(self, id: str):
        sys_config = self.cfg('sys')
        if sys_config is None:
            return
        configs = sys_config['mods']
        config = configs[self.findModInCfg(id)]
        config['enabled'] = True
        module = self.get_mod_module(config)
        if 'on_enabled' in dir(module):
            module.on_enabled()

    def disable_mod(self, id: str):
        sys_config = self.cfg('sys')
        if sys_config is None:
            return
        configs = sys_config['mods']
        config = configs[self.findModInCfg(id)]
        config['enabled'] = False
        self.write(os.path.join('config', 'sys.yml'), self.cfg('sys'))
        module = self.get_mod_module(config)
        if 'on_disabled' in dir(module):
            module.on_disabled()

    def get_mod_module(self, config: Dict[str, str]):
        meta_path = os.path.join(config['path'], 'meta.yml')
        meta = self.read(meta_path)
        main_path = os.path.join(config['path'], meta['main'])
        modFolderName = os.path.split(config['path'])[1]
        spec = spec_from_file_location(
            f'mods.{modFolderName}.', main_path)
        module = module_from_spec(spec)
        spec.loader.exec_module(module)
        return module

    def findModInCfg(self, id: str):
        sys_config = self.cfg('sys')
        if sys_config is None:
            return
        configs = sys_config['mods']
        for i, cfg in enumerate(configs):
            if id == cfg['id']:
                return i
        return -1


class Engine(ModManager):
    """
    # 这次重构的目的是使用”大中台“
    """

    def __init__(self):
        super().__init__()

    def push(self, type: str, data: Optional[Dict[str, Any]] = None, style: Any = None):
        self.send({'type': type, 'data': data, 'style': style})
