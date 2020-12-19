import os
import sys
from typing import Any, Callable, Dict, List, Optional, Tuple

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
dat = e.dat
sav = e.sav
tmp = e.tmp


def entry(entry_func: Callable[[], None]):
    pass


def start():
    pass


def exit():
    pass


def init(config: Optional[Dict[str, Any]]):
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
            'mods': {},
            'res': {}
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
        e.push('set_loading_title', {'value': 'Scanning Data Files...'})
        e.push('set_loading_text', {'value': ''})
        files = e.scan('data')
        for path in files:
            dot_path = '.'.join(DotPath.path2dot(path)[0].split('.')[1:])
            e.info(f'│  ├─ Data File [{dot_path}] Found.')
            e.push('set_loading_text', {
                   'value': f'Data File [{dot_path}] Found.'})
        e.info(f'│  └─ {len(files)} Data Files Found!')
        e.info('├─ Loading Data Files...')
        e.push('set_loading_title', {'value': 'Loading Data Files...'})
        e.push('set_loading_text', {'value': ''})
        for path in files:
            dot_path = '.'.join(DotPath.path2dot(path)[0].split('.')[1:])
            e.dat()[dot_path] = e.read(path)
            e.info(f'│  ├─ Data File [{dot_path}] Loaded.')
            e.push('set_loading_text', {
                   'value': f'Data File [{dot_path}] Loaded.'})
        e.info(f'│  └─ {len(files)} Data Files Loaded!')

    def register_resource_files():
        e.info('├─ Scanning Resource Files...')
        e.push('set_loading_title', {'value': 'Scanning Resource Files...'})
        e.push('set_loading_text', {'value': ''})
        files = e.scan('res')
        for path in files:
            dot_path = '.'.join(DotPath.path2dot(path)[0].split('.')[1:])
            e.info(f'│  ├─ Resource File [{dot_path}] Found.')
            e.push('set_loading_text', {
                   'value': f'Resource File [{dot_path}] Found.'})
        e.info(f'│  └─ {len(files)} Resource Files Found!')
        e.info('├─ Register Resource Files...')
        e.push('set_loading_title', {'value': 'Register Resource Files...'})
        e.push('set_loading_text', {'value': ''})
        for path in files:
            dp_pair = DotPath.path2dot(path)
            dot_path = '.'.join(dp_pair[0].split('.')[1:])
            e.data['res'][dot_path] = {'path': path, 'ext': dp_pair[1]}
            e.info(f'│  ├─ Resource File [{dot_path}] Registered.')
            e.push('set_loading_text', {
                   'value': f'Resource File [{dot_path}] Registered.'})
        e.info(f'│  └─ {len(files)} Resource Files Registered!')

    def load_mods():
        e.info('├─ Scanning Mods...')
        e.push('set_loading_title', {'value': 'Scanning Mods...'})
        e.push('set_loading_text', {'value': ''})
        # Config -> File System : Check Config Deletes
        metas = e.scan_mods()
        configs = e.cfg('sys')['mods']
        new_configs = []
        for config in configs:
            # Find If Config Item Exist.
            found = False
            for id in metas:
                if id == config['id']:
                    if compare(metas[id]['version'], config['version']) == 1:
                        # New Version
                        config['version'] = metas[id]['version']
                        e.info(f'│  ├─ Update Mod [{config["name"]}] Found.')
                    found = True
            if found:
                new_configs.append(config)
            else:
                e.info(
                    f'│  ├─ Mod [{config["name"] if "name" in config else config["id"]}] Deleted.')
        # File System -> Config : Check New Mods
        for id in metas:
            e.info(
                f'│  ├─ Mod [{metas[id]["name"] if "name" in metas[id] else id}] Found.')
            e.push('set_loading_text', {
                   'value': f'Mod [{metas[id]["name"] if "name" in metas[id] else id}] Found.'})
            index = e.findModInCfg(id)
            if index == -1:
                new_config = {
                    'id': id,
                    'version': metas[id]['version'],
                    'enabled': False,
                    'path': metas[id]['path']
                }
                if 'name' in metas[id]:
                    new_config['name'] = metas[id]['name']
                if 'alias' in metas[id]:
                    new_config['alias'] = metas[id]['alias']
                if 'description' in metas[id]:
                    new_config['description'] = metas[id]['description']
                if 'dependencies' in metas[id]:
                    new_config['dependencies'] = metas[id]['dependencies']
                e.cfg('sys')['mods'].append(new_config)
            e.write(os.path.join('config', 'sys.yml'), e.cfg('sys'))
        e.info(f'│  └─ {len(metas)} Mods Found!')
        # Load Mods
        e.info('├─ Loading Mods...')
        e.push('set_loading_title', {'value': 'Loading Mods...'})
        e.push('set_loading_text', {'value': ''})
        n = 0
        for config in configs:
            if config['enabled']:
                e.info(
                    f'│  ├─ Mod [{config["name"] if "name" in config else config["id"]}] Loading...')
                e.push('set_loading_text', {
                       'value': f'Mod [{config["name"] if "name" in config else config["id"]}] Loading...'})
                e.load_mod(config['id'])
                n += 1
        e.info(f'│  └─ {n} Mods Loaded!')
    # Init Start
    e.info('Era.js Engine Initializing...')
    fix_path()
    fix_fs_hierarchy()
    load_configs()
    if not e.connect('localhost', 11994):
        e.info('Initialization Failed!')
        sys.exit(1)
    send_config()
    load_data_files()
    register_resource_files()
    load_mods()
    e.push('loaded')
    e.info('Initialization Done!')


def window(style: Dict[str, Any]):
    e.push('window', style=style)


def title(text: str, style: Optional[Dict[str, Any]] = None):
    e.push('title', {'text': str(text)}, style)


def footer(text: str, style: Optional[Dict[str, Any]] = None):
    e.push('footer', {'text': str(text)}, style)


def msg(text: str, duration: float = 3, style: Optional[Dict[str, str]] = None):
    e.push('msg', {'text': str(text), 'duration': duration,
                   'hash': Tools.random_hash()}, style)


def page(style: Optional[Dict[str, str]] = None, *exception_tags: List[str]):
    e.remove_all_listeners(*exception_tags)
    e.push('page', None, style)


def cls(num: int = 0):
    e.push('cls', {'num': num})


def mode(type: str, *arg: List[Any], **kw: Dict[str, Any]):
    e.push('mode', {'type': type, 'arg': arg, 'kw': kw})


def divider(text: str, style: Dict[str, Any]):
    e.push('divider', {'text': text}, style)


def heading(text: str, rank: int, style: Dict[str, Any]):
    e.push('heading', {'text': str(text), 'rank': rank}, style)


def text(text: Optional[str] = None, wait: Optional[bool] = False, style: Optional[Dict[str, Any]] = None):
    if text is None or text == '':
        e.push('pass')
    else:
        e.push('text', {'text': text}, style)

    if wait and not e.lock_passed():
        e.lock()

        def on_click(event: Dict[str, Any]):
            print(event)
            if event['value'] == 1:  # 左键
                if e.is_locked():
                    e.unlock()
                    e.off('MOUSE_CLICK', on_click)
            elif event['value'] == 3:  # 右键
                if e.is_locked():
                    e.unlock_forever()
                    e.off('MOUSE_CLICK', on_click)
        e.on('MOUSE_CLICK', on_click)
        e.wait_for_unlock()


def button(text: str, callback: Optional[Callable[[], None]], *arg: List[Any], **kw: Dict[str, Any]):
    data = {
        'text': str(text),
        'hash': Tools.random_hash()
    }
    data['disabled'] = False
    if 'disabled' in kw:
        if kw['disabled']:
            data['disabled'] = True
        kw.pop('disabled')
    if callback == None:
        data['disabled'] = True
    if 'popup' in kw:
        data['popup'] = str(kw['popup'])
        kw.pop('popup')
    style = None
    if 'style' in kw:
        style = kw['style']
        del kw['style']
    e.push('button', data, style)

    def on_click(e):
        if e['hash'] == data['hash']:
            callback(*arg, **kw)
    e.on('BUTTON_CLICK', on_click)
    e.unlock()


def link(text: str, callback: Optional[Callable[[], None]], style: Optional[Dict[str, Any]], *arg: List[Any], **kw: Dict[str, Any]):
    data = {
        'text': str(text),
        'hash': Tools.random_hash()
    }
    data['disabled'] = False
    if 'disabled' in kw:
        if kw['disabled']:
            data['disabled'] = True
        kw.pop('disabled')
    if callback == None:
        data['disabled'] = True
    if 'popup' in kw:
        data['popup'] = str(kw['popup'])
        kw.pop('popup')
    e.push('link', data, style)

    def on_click(e):
        if e['hash'] == data['hash']:
            callback(*arg, **kw)
    e.on('LINK_CLICK', on_click)
    e.unlock()


def progress(now: float = 0, max: float = 100, style: Optional[List[Dict[str, Any]]] = None):
    if style is None:
        style = [{}, {}]
    e.push('progress', {'now': now, 'max': max}, style)


def rate(now: int = 0, max: int = 5, callback: Optional[Callable[[float], None]] = None, style: Optional[Dict[str, Any]] = None):
    data = {
        'now': now,
        'max': max,
        'hash': Tools.random_hash()
    }
    data['disabled'] = False
    if callback is None:
        data['disabled'] = True
    if style is None:
        style = {}
    e.push('rate', data, style)
    node = {'value': now}

    def on_click(e):
        # print(e)
        if e['hash'] == data['hash']:
            node['value'] = e['value']
            callback(e['value'])
    e.on('RATE_CLICK', on_click)
    return node


def check(text: str, callback: Callable[[bool], None], default: bool, style: Dict[str, Any]):
    data = {
        'text': str(text),
        'default': default,
        'hash': Tools.random_hash()
    }
    data['disabled'] = False
    if callback is None:
        data['disabled'] = True
    if style is None:
        style = {}
    e.push('check', data, style)
    node = {'value': default}

    def on_click(e):
        if e['hash'] == data['hash']:
            node['value'] = e['value']
            callback(e['value'])
    e.on('CHECK_CHANGE', on_click)
    return node


def radio(text_list: List[str], callback: Callable[[Dict[str, Tuple[int, str]]], None], default_index: int, style: Dict[str, Any]):
    data = {
        'text_list': text_list,
        'default_index': default_index,
        'hash': Tools.random_hash()
    }
    data['disabled'] = False
    if callback is None:
        data['disabled'] = True
    if style is None:
        style = {}
    e.push('radio', data, style)
    node = {
        'index': default_index,
        'value': text_list[default_index]
    }

    def on_click(e):
        if e['hash'] == data['hash']:
            node['index'] = e['index']
            node['value'] = text_list[node['index']]
            callback(node)
    e.on('RADIO_CHANGE', on_click)
    return node


def input(callback: Callable[[str], None], default: str, is_area: bool, placeholder: str, style: Dict[str, Any]):
    data = {
        'default': default,
        'is_area': is_area,
        'placeholder': placeholder,
        'hash': Tools.random_hash()
    }
    data['disabled'] = False
    if callback == None:
        data['disabled'] = True
    if style is None:
        style = {}
    e.push('input', data, style)
    node = {'value': default}

    def on_click(e):
        if e['hash'] == data['hash']:
            node['value'] = e['value']
            callback(e['value'])
    e.on('INPUT_CHANGE', on_click)
    return node


def dropdown(text_list: List[str], callback: Optional[Callable[[], None]], default_index: int, search: bool, multiple: bool, placeholder: str, allowAdditions: bool, style: Dict[str, Any]):
    data = {
        'text_list': text_list,
        'default_index': default_index,
        'search': search,
        'multiple': multiple,
        'placeholder': placeholder,
        'allowAdditions': allowAdditions,
        'hash': Tools.random_hash()
    }
    data['disabled'] = False
    if callback == None:
        data['disabled'] = True
    if style is None:
        style = {}
    e.push('dropdown', data, style)
    node = {
        'index': default_index,
        'value': text_list[default_index]
    }

    def on_click(e):
        if e['hash'] == data['hash']:
            node['index'] = e['index']
            node['value'] = text_list[node['index']]
            callback(node)
    e.on('DROPDOWN_CHANGE', on_click)
    return node


def img(dot_path: str, inline: bool, style: Optional[Dict[str, Any]]):
    if dot_path in e.data['res']:
        image_data = {
            'type': e.data['res'][dot_path]['ext'],
            'data': e.read(e.data['res'][dot_path]['path'])
        }
        if inline:
            e.push('img-inline', image_data, style)
        else:
            e.push('img-block', image_data, style)


def set_style():
    pass


def reset_style():
    pass


def goto(ui_func, *arg, **kw):
    e.goto(ui_func, *arg, **kw)


def back(num: int = 1, *arg, **kw):
    e.back(num, *arg, **kw)


def repeat(*arg, **kw):
    e.repeat(*arg, **kw)


def clear(num: int = 0):
    e.clear(num)


def append():
    pass


def get_gui_stack():
    pass


def dump_cfg():
    pass


def dump_dat():
    pass


def save(filename_without_ext: str = '', meta_info: Optional[Dict[str, Any]] = None):
    if meta_info:
        e.data['sav']['meta'] = meta_info
    else:
        e.data['sav']['meta'] = {
            'timestamp': Tools.timestamp(),
            'name': filename_without_ext
        }
        if not filename_without_ext:
            e.data['sav']['meta']['name'] = filename_without_ext
    path = ''
    if not filename_without_ext:
        path = 'save\\quick.sav'
    else:
        path: str = 'save\\'+DotPath.dot2path(filename_without_ext, 'sav')
    e.write(path, e.data['sav'])


def load(filename_without_ext: str = ''):
    path = ''
    if not filename_without_ext:
        path = 'save\\quick.sav'
        if not os.path.isfile(path):
            return
    else:
        path = 'save\\'+DotPath.dot2path(filename_without_ext, 'sav')
    e.data['sav']['meta'].clear()
    e.data['sav']['data'].clear()
    e.data['sav'] = e.read(path)


def scan_save_file():
    unsorted_list = []
    sorted_list = []
    save_file_path_list = e.scan('save')
    for save_file_path in save_file_path_list:
        filename_without_ext, ext = os.path.splitext(
            os.path.split(save_file_path)[1])
        if ext.lower() in ['.sav', '.save']:
            save_data = e.read(save_file_path)
            meta_info = save_data['meta']
            if filename_without_ext == 'quick':
                sorted_list.append([filename_without_ext, meta_info])
            else:
                unsorted_list.append([filename_without_ext, meta_info])
    sorted_list.extend(unsorted_list)
    return sorted_list


def set_console_parser(parser_func: Callable[[str], Any]):
    def on_console_input(pkg):
        e.push('console_output', {'value': parser_func(pkg['value'])})
    e.on('CONSOLE_INPUT', on_console_input)


def dangerously_get_engine_core():
    return e


def Experimental(func: Callable[[], Any]):
    """
    # 实验性接口
    """
    def wrapper(*args: Any, **kw: Any):
        print(f'API {func.__name__}() is unstable.')
        return func(*args, **kw)
    return wrapper


def Deprecated(func: Callable[[], Any]):
    """
    # 该接口即将被弃用
    """
    def wrapper(*args: Any, **kw: Any):
        print(f'API {func.__name__}() is unstable.')
        return func(*args, **kw)
    return wrapper
######################################


def old_data():
    return OldData()


class OldData:
    def __setitem__(self, key, value):
        scope = key.split('.')[0]
        if scope == 'data':
            dat()['.'.join(key.split('.')[1:])] = value
        elif scope == 'db':
            for key in value.keys():
                sav()[key] = value[key]
        else:
            tmp()

    def __getitem__(self, key):
        scope = key.split('.')[0]
        if scope == 'data':
            return dat('.'.join(key.split('.')[1:]))
        elif scope == 'db':
            return sav()
        else:
            return tmp(key)

    def __delitem__(self, key):
        print('del', key)

    def __len__(self):
        print('len')
