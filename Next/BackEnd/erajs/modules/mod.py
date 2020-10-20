import configparser
import importlib.util
import os
import sys
from pathlib import Path
from typing import Any, Dict, Text

import semver

from . import api


class ModModule(api.APIModule):
    """
    # 模块管理器
    扫描
    启用/禁用
    升级
    卸载
    """

    def __init__(self):
        super().__init__()
        self.__data: Dict[Text, Any] = {
            'load_queue': []
        }

    def isExist(self, mod_name: Text):
        cfg = self.get_data('sys', 'config')
        for i, mod in enumerate(cfg['mod']):
            if mod_name == mod['name']:
                return i
        return -1

    def scan_mods(self) -> None:
        mod_info_list = []
        # 验证配置有效性
        cfg = self.get_data('sys', 'config')
        for i, mod in enumerate(cfg['mod']):
            if os.path.isdir(mod['path']):
                meta_path = mod['path']+'\\meta.json'
                if os.path.isfile(meta_path):
                    mod_info = self.read(meta_path)
                    compare_result = semver.compare(
                        mod_info['version'], mod['version'])
                    if compare_result == 1:
                        # 新版本：更新信息
                        self.send({
                            'type': 'upgrade_mod',
                            'data': mod_info
                        })
            else:
                del cfg['mod'][i]
        # 搜索mod文件夹
        for entry_name in os.listdir('mod'):
            path = 'mod\\{}'.format(entry_name)
            if os.path.isdir(path):
                meta_path = path+'\\meta.json'
                if os.path.isfile(meta_path):
                    mod_info = self.read(meta_path)
                    mod_info['path'] = path
                    # self.__data['load_queue'].append([mod_info['name'], path])
                    self.emit('mod_found', {'value': mod_info['name']})
                    if 'mod' not in cfg:
                        cfg['mod'] = []
                    index = self.isExist(mod_info['name'])
                    if index > -1:
                        if semver.compare(mod_info['version'], cfg['mod'][index]['version']) == 1:
                            # TODO 当前版本更大
                            pass
                    if index == -1:
                        new_item = {
                            'name': mod_info['name'],
                            'version': mod_info['version'],
                            'enabled': False,
                            'path': path
                        }
                        if 'alias' in mod_info:
                            new_item['alias'] = mod_info['alias']
                        if 'description' in mod_info:
                            new_item['description'] = mod_info['description']
                        if 'dependencies' in mod_info:
                            new_item['dependencies'] = mod_info['dependencies']
                        cfg['mod'].append(new_item)
                    self.write(cfg, 'config\\sys.yaml')

    def load_mods(self):
        cfg = self.get_data('sys', 'config')
        for i, mod in enumerate(cfg['mod']):
            if mod['enabled']:
                # print(mod)
                # print(self.__data['load_queue'])
                # pair = self.__data['load_queue'].pop()
                self.emit('mod_loading', {'value': mod['name']})
                self.load_mod(mod['name'])
                self.emit('mod_loaded', {'value': mod['name']})

    def load_mod(self, name: Text):
        cfg = self.get_data('sys', 'config')
        path = cfg['mod'][self.isExist(name)]['path']
        meta_path = path+'\\meta.json'
        info = self.read(meta_path)
        main_path = '{}\\{}'.format(path, info['main'])
        spec = importlib.util.spec_from_file_location(name, main_path)
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        if 'init' in dir(module):
            module.init()

        # def scan_plugins(self):
        #     # scan收集文件信息
        #     # path = Path('plugins')
        #     # logger.info('├─ Scanning Plugins...')
        #     # dispatcher.dispatch(event_type.PLUGINS_SCAN_FINISHED)
        #     pass

        # def load_plugins(self):
        #     # logger.info('├─ Loading Plugins...')
        #     # dispatcher.dispatch(event_type.PLUGINS_LOAD_FINISHED)
        #     pass

        # def scan_plugin(self, plugin_config):
        #     "扫描插件的现状"
        #     config = {
        #         'plugin': {}
        #     }
        #     path = os.path.dirname(os.path.abspath(__file__))
        #     plugin_path_list = self.scan('{}/plugin'.format(path))
        #     # 提取插件名称
        #     plugin_name_list = []
        #     for each in plugin_path_list:
        #         plugin_name = '.'.join(each.replace(
        #             '/', '\\').split('\\')[-1].split('.')[0:-1])
        #         # self.log.info('│  ├─ Scanning [{}]...'.format(plugin_name))
        #         plugin_name_list.append(plugin_name)
        #     # 比对配置信息
        #     for plugin_name in plugin_name_list:
        #         if not plugin_name.lower() in plugin_config:
        #             plugin_config[each.lower()] = 'no'
        #     # 同步
        #     return plugin_config  # TODO: 写回到文件
        #     # config = configparser.ConfigParser()
        #     # config.read_dict(e.data.data['config'])
        #     # with open('config/config.ini', 'w') as configfile:
        #     #     config.write(configfile)
        #     # return len(plugin_path_list)

        # def scan(self, path_to_folder):
        #     fileList = []
        #     for root, dirs, files in os.walk(path_to_folder):
        #         for each in files:
        #             fileList.append(root + '\\' + each)
        #     return fileList

        # def load_plugin(self, plugin_config):
        #     num_of_loaded_plugins = 0
        #     path = os.path.dirname(os.path.abspath(__file__))
        #     for each in plugin_config:
        #         if e.data.data['config']['plugin'][each] == 'yes':
        #             plugin_path_list = self.scan('{}/plugin'.format(path))
        #             for every in plugin_path_list:
        #                 Manager_name = '.'.join(every.replace(
        #                     '/', '\\').split('\\')[-1].split('.')[0:-1])
        #                 if Manager_name.lower() == each:
        #                     # self.log.info(
        #                     #     '│  ├─ Loading [{}]...'.format(Manager_name))
        #                     # importlib.import_Manager('')
        #                     with open(every, 'r', encoding='utf8') as target:
        #                         sys.argv = [self]
        #                         exec(''.join(target.readlines()))
        #                     num_of_loaded_plugins += 1
        #     return num_of_loaded_plugins

        # def scan_scripts(self):
        #     # logger.info('├─ Scanning Scripts...')
        #     # 扫描插件文件
        #     script_path_list = self.scan('script')
        #     # 提取插件名称
        #     script_name_list = []
        #     for each in script_path_list:
        #         script_name = '.'.join(each.replace(
        #             '/', '\\').split('\\')[-1].split('.')[0:-1])
        #         # self.log.info('│  ├─ Scanning [{}]...'.format(script_name))
        #         script_name_list.append(script_name)
        #     # dispatcher.dispatch(event_type.SCRIPTS_SCAN_FINISHED)
        #     # return len(script_path_list)

        # def load_scripts(self, send_func=None):
        #     # logger.info('├─ Loading Scripts...')
        #     num_of_loaded_script = 0
        #     script_path_list = self.scan('script')
        #     for every in script_path_list:
        #         Manager_name = '.'.join(every.replace(
        #             '/', '\\').split('\\')[-1].split('.')[0:-1])
        #         # self.log.info('│  ├─ Loading [{}]...'.format(Manager_name))
        #         if not send_func == None:
        #             bag = {
        #                 'type': 'load_text',
        #                 'value': 'Script: [ {} ]...'.format(Manager_name),
        #                 'from': 'b',
        #                 'to': 'r'
        #             }
        #             send_func(bag)
        #         with open(every, 'r', encoding='utf8') as target:
        #             sys.argv = [self]
        #             exec(''.join(target.readlines()))
        #         num_of_loaded_script += 1
        #     # dispatcher.dispatch(event_type.SCRIPTS_LOAD_FINISHED)
        #     # return num_of_loaded_script
        #     pass

        # def scan_dlcs(self):
        #     # logger.info('├─ Scanning DLCs...')
        #     # # 扫描插件文件
        #     # dlc_path_list = self.scan('dlc')
        #     # # 提取插件名称
        #     # dlc_name_list = []
        #     # for each in dlc_path_list:
        #     #     dlc_name = '.'.join(each.replace(
        #     #         '/', '\\').split('\\')[-1].split('.')[0:-1])
        #     #     self.log.info('│  ├─ Scanning [{}]...'.format(dlc_name))
        #     #     dlc_name_list.append(dlc_name)
        #     # # 比对配置信息
        #     # for each in dlc_name_list:
        #     #     if not each.lower() in e.data.data['config']['dlc'].keys():
        #     #         e.data.data['config']['dlc'][each.lower()] = 'no'
        #     # # 同步
        #     # config = configparser.ConfigParser()
        #     # config.read_dict(e.data.data['config'])
        #     # with open('config/config.ini', 'w') as configfile:
        #     #     config.write(configfile)
        #     # return len(dlc_path_list)
        #     # dispatcher.dispatch(event_type.DLCS_SCAN_FINISHED)
        #     pass

        # def load_dlcs(self):
        #     # logger.info('├─ Loading DLCs...')
        #     # num_of_loaded_dlcs = 0
        #     # for each in e.data.data['config']['dlc'].keys():
        #     #     if e.data.data['config']['dlc'][each] == 'yes':
        #     #         dlc_path_list = self.scan('dlc')
        #     #         for every in dlc_path_list:
        #     #             Manager_name = '.'.join(every.replace(
        #     #                 '/', '\\').split('\\')[-1].split('.')[0:-1])
        #     #             if Manager_name.lower() == each:
        #     #                 self.log.info(
        #     #                     '│  ├─ Loading [{}]...'.format(Manager_name))
        #     #                 with open(every, 'r', encoding='utf8') as target:
        #     #                     sys.argv = [self]
        #     #                     exec(''.join(target.readlines()))
        #     #                 num_of_loaded_dlcs += 1
        #     # dispatcher.dispatch(event_type.DLCS_LOAD_FINISHED)
        #     # return num_of_loaded_dlcs
        #     pass

        # def scan_mods(self):
        #     # logger.info('├─ Scanning MODs...')
        #     # # 扫描插件文件
        #     # mod_path_list = self.scan('mod')
        #     # # 提取插件名称
        #     # mod_name_list = []
        #     # for each in mod_path_list:
        #     #     mod_name = '.'.join(each.replace(
        #     #         '/', '\\').split('\\')[-1].split('.')[0:-1])
        #     #     self.log.info('│  ├─ Scanning [{}]...'.format(mod_name))
        #     #     mod_name_list.append(mod_name)
        #     # # 比对配置信息
        #     # for each in mod_name_list:
        #     #     if not each.lower() in e.data.data['config']['mod'].keys():
        #     #         e.data.data['config']['mod'][each.lower()] = 'no'
        #     # # 同步
        #     # config = configparser.ConfigParser()
        #     # config.read_dict(e.data.data['config'])
        #     # with open('config/config.ini', 'w') as configfile:
        #     #     config.write(configfile)
        #     # dispatcher.dispatch(event_type.MODS_SCAN_FINISHED)
        #     # return len(mod_path_list)
        #     pass

        # def load_mods(self):
        #     # logger.info('├─ Loading MODs...')
        #     # num_of_loaded_mods = 0
        #     # for each in e.data.data['config']['mod'].keys():
        #     #     if e.data.data['config']['mod'][each] == 'yes':
        #     #         mod_path_list = self.scan('mod')
        #     #         for every in mod_path_list:
        #     #             Manager_name = '.'.join(every.replace(
        #     #                 '/', '\\').split('\\')[-1].split('.')[0:-1])
        #     #             if Manager_name.lower() == each:
        #     #                 self.log.info(
        #     #                     '│  ├─ Loading [{}]...'.format(Manager_name))
        #     #                 with open(every, 'r', encoding='utf8') as target:
        #     #                     sys.argv = [self]
        #     #                     exec(''.join(target.readlines()))
        #     #                 num_of_loaded_mods += 1
        #     # dispatcher.dispatch(event_type.MODS_LOAD_FINISHED)
        #     # return num_of_loaded_mods
        #     pass
