import datetime
import logging
import os
import secrets
import sys
import threading
from typing import Any, Callable, ClassVar, Dict, List, Optional

from .file_format_support import (cfg_file, csv_file, json_file, save_file,
                                  text_file, yaml_file, zip_file)
from .modules.dot_path import DotPath


class Tools:
    @staticmethod
    def fix_path():
        """
        # 修正根路径
        """
        if getattr(sys, 'frozen', False):
            # 生产环境（已打包）
            path = os.path.dirname(sys.executable)
        else:
            # 开发环境（未打包）
            path = os.path.join(os.path.dirname(__file__), '../..')
        os.chdir(path)

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
        """
        return datetime.datetime.today().strftime("%y%m%d-%H%M%S-%f")

    @staticmethod
    def uuid():
        """
        # UUID生成器
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

    def debug(self, *arg: List[Any], **kw: Dict[Any, Any]):
        self.__log(0, *arg, **kw)

    def info(self,  *arg: List[Any], **kw: Dict[Any, Any]):
        self.__log(1, *arg, **kw)

    def warn(self, *arg: List[Any], **kw: Dict[Any, Any]):
        self.__log(2, *arg, **kw)

    def error(self, *arg: List[Any], **kw: Dict[Any, Any]):
        self.__log(3, *arg, **kw)

    def critical(self,  *arg: List[Any], **kw: Dict[Any, Any]):
        self.__log(4, *arg, **kw)

    def __log(self, level: int, *arg: List[Any], **kw: Dict[Any, Any]):
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


class DataManager(EventManager):
    def __init__(self):
        super().__init__()
        self.__data = {
            'cfg': {
                'resolution': [800, 600]
            },
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

    def write(self, path: str, data: Any):
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


class DomainManager(DataManager):
    """
    1. 服务器上线，读取entry后待机
    2. 用户登入，
        - 游客：无User ID，无Cookie（登录/注册）
        - 注册用户：有User ID，无Cookie（登录/注册）
        - 非活动用户：有User ID，有Cookie
    3. 调用entry

    """

    def __init__(self):
        super().__init__()
        self.__data = {
            'domain': {}
        }

    def join(self):
        pass

    def leave(self):
        pass


class NetManager(DomainManager):
    pass


class ModManager(NetManager):
    pass


class Engine(ModManager):
    pass
