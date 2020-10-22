import os
from typing import Any, Dict

from .core import Engine, Tools
from .modules.dot_path import DotPath

e = Engine()

# Tools
random_hash = Tools.random_hash
timestamp = Tools.timestamp
uuid = Tools.uuid

# Debug
debug = e.debug
info = e.info
warn = e.warn
error = e.error
critical = e.critical

# Event
on = e.on
off = e.off
emit = e.emit
remove_all_listeners = e.remove_all_listeners


# Data
def fix_fs_hierarchy():
    """
    # 维护文件系统架构
    """
    fs_hierarchy = {
        'config': {
            'sys.yaml': None
        },
        'data': {},
        'save': {},
        'mod': {}
    }

    def fix_one_layer(path: str, templete: Dict[str, Any]):
        for key in templete:
            if type(templete[key]) is dict:
                dir_path = os.path.join(path, key)
                if not os.path.isdir(dir_path):
                    os.mkdir(dir_path)
                fix_one_layer(dir_path, templete[key])
            else:
                file_path = os.path.join(path, key)
                if not os.path.isfile(file_path):
                    open(file_path).close()
    fix_one_layer('.', fs_hierarchy)


def scan_configs():
    files = e.scan('config')
    for path in files:
        dot_path = DotPath.path2dot(path)


def cfg(dot_path: str = ''):
    scope = 'config'
    if dot_path == '':
        return e.data[scope]
    elif dot_path in e.data:
        return e.data[scope][dot_path]
    elif e.mount(dot_path):
        return e.data[scope][dot_path]
    else:
        e.data[scope][dot_path]


def dat():
    pass


def sav():
    pass


def tmp():
    pass


def load_configs():
    pass


def init():
    Tools.fix_path()
    print(123)


def dangerously_get_engine_core():
    return e
