import os
import sys
from typing import Any, Dict
from semver import compare
from .engine import Engine, Tools
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
cfg = e.cfg
dat = e.cfg
sav = e.sav
tmp = e.tmp


def init():
    """
    # 初始化 Era.js 游戏引擎
    绝大部分游戏引擎的功能只能在初始化后使用
    """
    def fix_path():
        """
        # 修正根路径
        """
        e.info('├─ Fixing Path...')
        if getattr(sys, 'frozen', False):
            # 生产环境（已打包）
            path = os.path.dirname(sys.executable)
        else:
            # 开发环境（未打包）
            path = os.path.join(os.path.dirname(__file__), '..')
        os.chdir(path)
        e.info('│  └─ Path Fixed!')

    def fix_fs_hierarchy():
        """
        # 维护文件系统架构
        """
        fs_hierarchy = {
            'config': {
                'sys.yml': None
            },
            'data': {},
            'save': {},
            'mods': {}
        }

        def fix_one_layer(path: str, template: Dict[str, Any]):
            for key in template:
                if type(template[key]) is dict:
                    dir_path = os.path.join(path, key)
                    if not os.path.isdir(dir_path):
                        e.warn(f'│  ├─ Folder [{key}] Missing. Creating...')
                        os.mkdir(dir_path)
                    fix_one_layer(dir_path, template[key])
                else:
                    file_path = os.path.join(path, key)
                    if not os.path.isfile(file_path):
                        e.warn(f'│  ├─ File [{key}] Missing. Creating...')
                        data = None
                        if file_path == '.\\config\\sys.yml':
                            data = {
                                'resolution': [800, 600],
                                'mods': []
                            }
                        e.write(file_path, data)
        e.info('├─ Checking Data Integrity...')
        fix_one_layer('.', fs_hierarchy)
        e.info('│  └─ Data Integrity Checked!')

    def load_configs():
        e.info('├─ Scanning Configs...')
        files = e.scan('config')
        n = 0
        for path in files:
            if os.path.splitext(path)[1].lower() == '.yml':
                dot_path = '.'.join(DotPath.path2dot(path)[0].split('.')[1:])
                e.info(f'│  ├─ Config [{dot_path}] Found.')
                n += 1
        e.info(f'│  └─ {n} Configs Found!')
        e.info('├─ Loading Configs...')
        n = 0
        for path in files:
            if os.path.splitext(path)[1].lower() == '.yml':
                dot_path = '.'.join(DotPath.path2dot(path)[0].split('.')[1:])
                e.cfg()[dot_path] = e.read(path)
                e.info(f'│  ├─ Config [{dot_path}] Loaded.')
                n += 1
        e.info(f'│  └─ {n} Configs Loaded!')

    def send_config():
        e.info('├─ Sending Engine Config...')
        e.send({'type': 'cfg', 'data': e.cfg('sys')})
        e.info('│  └─ Configs Sent!')

    def load_data_files():
        e.info('├─ Scanning Data Files...')
        files = e.scan('data')
        for path in files:
            dot_path = '.'.join(DotPath.path2dot(path)[0].split('.')[1:])
            e.info(f'│  ├─ Data File [{dot_path}] Found.')
        e.info(f'│  └─ {len(files)} Data Files Found!')
        e.info('├─ Loading Data Files...')
        for path in files:
            dot_path = '.'.join(DotPath.path2dot(path)[0].split('.')[1:])
            e.dat()[dot_path] = e.read(path)
            e.info(f'│  ├─ Data File [{dot_path}] Loaded.')
        e.info(f'│  └─ {len(files)} Data Files Loaded!')

    def load_mods():
        e.info('├─ Scanning Mods...')
        mod_metas = e.scan_mods()
        mod_configs = e.cfg('sys')['mods']
        new_mcs = []
        for i, mc in enumerate(mod_configs):
            found = False
            for j, mm in enumerate(mod_metas):
                if mc['id'] == mm['id']:
                    if compare(mm['version'], mc['version']) == 1:
                        # New Version
                        mc['version'] = mm['version']
                        self.info(f'│  ├─ Update Mod [{mc["name"]}] Found.')
                    found = True
            if found:
                new_mcs.append(mc)
        files = e.scan('data')
        for path in files:
            dot_path = '.'.join(DotPath.path2dot(path)[0].split('.')[1:])
            e.info(f'│  ├─ Mod [{dot_path}] Found.')
        e.info(f'│  └─ {len(files)} Mods Found!')
        e.info('├─ Loading Mods...')
        for path in files:
            dot_path = '.'.join(DotPath.path2dot(path)[0].split('.')[1:])
            e.dat()[dot_path] = e.read(path)
            e.info(f'│  ├─ Mod [{dot_path}] Loaded.')
        e.info(f'│  └─ {len(files)} Mods Loaded!')
    # Init Start
    e.info('Era.js Engine Initializing...')
    fix_path()
    fix_fs_hierarchy()
    load_configs()
    if not e.connect('127.0.0.1', 11994):
        e.info('└─ Initialization Failed!')
        sys.exit(1)
    send_config()
    load_data_files()
    load_mods()
    print(e.cfg())
    print(e.dat())


def dangerously_get_engine_core():
    return e
