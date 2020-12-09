import datetime
import importlib
import json
import logging
import os
import secrets
import socket
import sys
import threading
import time
from typing import Any, Callable, ClassVar, Dict, List, Optional

from . import lib
from .file_format_support import (cfg_file, csv_file, json_file, save_file,
                                  text_file, yaml_file, zip_file)
from .modules.dot_path import DotPath


class Tools:
    @staticmethod
    def random_hash(level: int = 4):
        """
        # 随机哈希值生成器
        返回随机生成的哈希字符串
        - level == n，返回长度为2n的字符串，在16^n个项目中随机，任意两个值相同的概率为1/16^n/2。
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
        - 示例：201231-030619-123456
        """
        timestamp = Tools.timestamp()
        hash = '{:0>6d}'.format(secrets.randbelow(1000000))
        uuid = '{}-{}'.format(timestamp, hash)
        return uuid

    @staticmethod
    def deprecated():
        """
        # 弃用指示器
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

    def __new__(
        cls,
        *args: List[Any],
        **kw: Dict[Any, Any]
    ):
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
        self.__data = {
            'listeners': {}
        }

    def on(self, event_type: str, callback: Callable[[Any], Any], once: bool = False, *tags: List[str]):
        listener = {
            'uuid': Tools.uuid(),
            'type': event_type,
            'callback': callback,
            'once': once,
            'tags': tags
        }
        self.__data['listeners'][listener['uuid']] = listener
        return listener

    def off(self, event_type: str, callback: Callable[[Any], Any]):
        for key in list(self.__data['listeners'].keys()):
            if self.__data['listeners'][key]['type'] == event_type and self.__data['listeners'][key]['callback'].__name__ == callback.__name__:
                del self.__data['listeners'][key]

    def emit(self, event_type: str, *arg: List[Any], **kw: Dict[Any, Any]):
        for key in list(self.__data['listeners'].keys()):
            if self.__data['listeners'][key]['type'] == event_type:
                threading.Thread(
                    target=self.__data['listeners'][key]['callback'],
                    args=arg,
                    kwargs=kw
                )
                if self.__data['listeners'][key]['once']:
                    del self.__data['listeners'][key]

    def remove_all_listeners(self, *exception_tags: List[str]):
        for key in list(self.__data['listeners'].keys()):
            is_exception = False
            for tag in self.__data['listeners'][key]['tags']:
                if tag in exception_tags:
                    is_exception = True
                    break
            if not is_exception:
                del self.__data['listeners'][key]


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
    def __init__(self):
        super().__init__()
        self.__data = {
            'cfg': {},
            'dat': {},
            'sav': {
                'meta': {},
                'data': {}
            },
            'tmp': {}
        }

    @property
    def data(self):
        return self.__data

    @data.setter
    def data(self, value: Any):
        self.__data = value

    def read(self, path: str):
        """
        # 读取文件到数据
        """
        ext = os.path.splitext(path)[1].lower()
        data: Any = None
        if ext in ['.inf', '.ini', '.cfg', '.conf', '.config']:
            data = cfg_file.read(path)
        elif ext == '.csv':
            data = csv_file.read(path)
        elif ext == '.json':
            data = json_file.read(path)
        elif ext in ['.yml', '.yaml']:
            data = yaml_file.read(path)
        elif ext == '.zip':
            data = zip_file.read(path)
        elif ext == '.txt':
            data = text_file.read(path)
        elif ext in ['.save', '.sav']:
            data = save_file.read(path)
        return data

    def write(self, path: str, data: Any = None):
        """
        # 写入数据到文件
        """
        ext = os.path.splitext(path)[1].lower()
        if ext in ['.inf', '.ini', '.cfg', '.conf', '.config']:
            cfg_file.write(path, data)
        elif ext == '.csv':
            csv_file.write(path, data)
        elif ext == '.json':
            json_file.write(path, data)
        elif ext in ['.yml', '.yaml']:
            yaml_file.write(path, data)
        elif ext == '.zip':
            zip_file.write(path, data)
        elif ext == '.txt':
            text_file.write(path, data)
        elif ext in ['.save', '.sav']:
            save_file.write(path, data)

    def scan(self, path: str):
        """
        # 递归文件夹路径下文件的路径
        """
        files: List[str] = []
        for dirpath, _, filenames in os.walk(path, True):
            for filename in filenames:
                files.append('{}\\{}'.format(dirpath, filename))
        return files

    def mount(self, dot_path: str, scope: str):
        pass

    def cfg(self, dot_path: Optional[str] = None):
        """
        # CFG
        """
        if dot_path is None:
            return self.__data['cfg']
        elif dot_path in self.__data['cfg']:
            return self.__data['cfg'][dot_path]
        elif self.mount(dot_path, 'cfg'):
            return self.__data['cfg'][dot_path]
        else:
            return None

    def dat(self, dot_path: Optional[str] = None):
        """
        # CFG
        """
        if dot_path is None:
            return self.__data['dat']
        elif dot_path in self.__data['dat']:
            return self.__data['dat'][dot_path]
        elif self.mount(dot_path, 'dat'):
            return self.__data['dat'][dot_path]
        else:
            return None

    def sav(self, dot_path: Optional[str] = None) -> Any:
        """
        # CFG
        除非你需要操作存档信息，否则请不要占用“meta”点路径，因为sav('meta')是内置的存档信息保存点。
        """
        if dot_path is None:
            return self.__data['sav']['data']
        elif dot_path == 'meta':
            return self.__data['sav']['meta']
        elif dot_path in self.__data['sav']['data']:
            return self.__data['sav']['data'][dot_path]
        else:
            return None

    def tmp(self, key: Optional[str] = None):
        """
        # TMP
        tmp
        """
        if key is None:
            return self.__data['tmp']
        elif key in self.__data['tmp']:
            return self.__data['tmp'][key]
        else:
            return None


class NetManager(DataManager):
    def __init__(self):
        super().__init__()
        self.__debug = True
        self.__buf_size = 1024
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


class ModManager(NetManager):
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

    def scan_mods(self) -> Dict[str, Any]:
        mods = {}
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

    def load_mod(self, id: str):
        configs = self.cfg('sys')['mods']
        config = configs[self.findModInCfg(id)]
        module = self.get_mod_module(config)
        if 'on_loaded' in dir(module):
            module.on_load()

    def enable_mod(self, id: str):
        configs = self.cfg('sys')['mods']
        config = configs[self.findModInCfg(id)]
        config['enabled'] = True
        module = self.get_mod_module(config)
        if 'on_enabled' in dir(module):
            module.on_enabled()

    def disable_mod(self, id: str):
        configs = self.cfg('sys')['mods']
        config = configs[self.findModInCfg(id)]
        config['enabled'] = False
        self.write(os.path.join('config', 'sys.yml'), self.cfg('sys'))
        module = self.get_mod_module(config)
        if 'on_disabled' in dir(module):
            module.on_disabled()

    def get_mod_module(self, config: str):
        meta_path = os.path.join(config['path'], 'meta.yml')
        meta = self.read(meta_path)
        main_path = os.path.join(config['path'], meta['main'])
        spec = importlib.util.spec_from_file_location(config['id'], main_path)
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        return module

    def findModInCfg(self, id: str):
        for i, cfg in enumerate(self.cfg('sys')['mods']):
            if id == cfg['id']:
                return i
        return -1


class Engine(ModManager):
    """
    # 这次重构的目的是使用”大中台“
    """

    def __init__(self):
        super().__init__()

    def push(self, type: str, data: Optional[Dict[str, Any]] = None, style: Optional[Dict[str, Any]] = None):
        self.send({
            'type': type,
            'data': data,
            'style': style,
        })
