import os
from typing import Any, Dict, List

from . import DotPath  # EventManager, LogManager, Prototypes, Tools
from ..file_format_support import (cfg_file, csv_file, json_file, text_file,
                                   yaml_file, zip_file)
from . import event


class DataModule(event.EventModule):
    def __init__(self) -> None:
        """
        # 数据管理器
        ## 顶层设计
        Era.js游戏引擎通过数据管理器对所有数据进行管理。
        从历史的角度讲，数据管理器应当对原有的数据加载/引用/修改/卸载进行适配
        同时，也要向着未来的服务器化进行兼容。
        抽象地来讲，内存中的数据分为四级：
        1. cfg: 用于储存从config/中加载 **静态** 数据
        2. std：用于储存从data/中加载 **静态** 数据
        3. dat：用于储存从save/中加载的 **动态公共** 数据
        4. usr：用于储存从save/中加载的 **动态私有** 数据

        ## API
        ### import_data 导入数据
        ### export_data 导出数据到文件
        ### mount 挂载某数据到类属性
        ### umount 卸载某类属性数据（不写入硬盘）
        ### scan_config 扫描配置文件【流程】
        ### load_config 加载配置文件【流程】
        ### scan_data_files 扫描数据文件【流程】
        ### load_data_files 加载数据文件【流程】

        ## 关于懒加载
        为了优化引擎的内存占用，新的数据管理器将采用将一部分不常用的数据不进行预先加载的方法
        当游戏代码调用engine.data(dot_path)语法时，
        如果dot_path中的内容已经被加载到引擎中了，则直接返回引用，
        若这部分内容尚未被加载到引擎中，则对该部分数据进行即时加载。
        懒加载可由多种策略进行控制：
        - 固定内存占用模式
        - 按使用频率排序模式
        - 按加载速度排序模式
        - 手动管理模式

        ## 关于点路径
        点路径是用于方便地将保存于文件目录中地各种数据进行引用的别名
        为了更好地将点语法应用于游戏开发中，我们约定：
        1. 数据文件所存放的文件夹名和文件名中尽量不要出现【点】
        2. 文件名与文件夹名以简洁为佳
        3. 若文件夹名或文件名中有间断的需要（如加入【空格】、【点】），请使用下划线代替
        4. 路径与文件名尽量唯一.
        5. 对于一个文件data/a/b.yaml，请通过data.a.b调用；
        6. 如果在满足上一点的情况下，还存在文件data/a/b.json。
        则data.a.b默认调用data/a/b.json（优先级更高）。

        """
        super().__init__()
        self.__data: Dict[str, dict] = {  # data【OLD】
            "config": {  # cfg【NEW】
                "ENGINE": {},  # 引擎配置【NEW】
                "PLUGINs": {},  # 插件激活状态【OLD】
                "DLCs": {},  # DLC激活状态【OLD】
                "MODs": {},  # MOD激活状态【OLD】
            },
            "db": {},  # 存档的数据【OLD】
            "tmp": {},  # 【OLD】
            # 'standard':  {},  # std【NEW】
            'data': {},  # dat【NEW】
            # 'user': {},  # usr【NEW】
        }

    @property
    def cfg(self) -> Dict[Any, Any]:
        # NEW
        return self.__data['config']

    @property
    def std(self) -> Dict[Any, Any]:
        # NEW
        return self.__data['standard']

    @property
    def dat(self) -> Dict[Any, Any]:
        # NEW
        return self.__data['data']

    @property
    def usr(self) -> Dict[Any, Any]:
        # NEW
        return self.__data['user']

    @property
    def data(self) -> Dict[Any, Any]:
        # OLD
        return self.__data

    def check_file_system(self) -> None:
        """
        # 数据初始化
        - 维护数据完整性
        - 维护数据文件夹完整性
        - 维护数据文件完整性
        """
        check_folder_list = [
            'config',  # 配置文件存放处
            'data',  # 静态数据文件存放处
            'logic',  # 核心逻辑脚本存放处
            'cache',  # 缓冲数据文件
            'save',  # 存档文件存放处
            'scripts'  # 热加载脚本存放处
            'dlc',  # DLC包存放处
            'mod',  # MOD包存放处
            'resources',  # 二进制数据文件存放处（图片，视频，音频等）
            'plugins',  # 引擎插件
        ]
        check_file_list = [
            'config/config.ini'  # 配置信息统一存放于此
        ]
        # 补全文件夹
        for each in check_folder_list:
            if not os.path.isdir(each):
                event_data = {'value': each}
                self.emit('folder_missing', event_data)
                os.mkdir(each)
        # 补全文件
        for each in check_file_list:
            if not os.path.isfile(each):
                event_data = {'value': each}
                self.emit('file_missing', event_data)
                open(each, 'w')

    def import_data(self, file_path):
        """
        # 导入数据
        从数据文件导入数据
        ## 支持导入的数据文件格式
        - Setup Information file: *.inf
        - Configuration file: *.ini
        - Generic Preference file: *.cfg, *.config
        - Comma Separated Values file: *.csv
        - JavaScript Object Notation file: *.json
        - YAML Ain't Markup Language file: *.yaml
        - ZIP Compressed file: *.zip
        - Text file: *.txt
        """
        ext = os.path.splitext(file_path)[1].split('.')[1].lower()
        data = None
        if ext in ['cfg', 'config', 'ini', 'inf']:
            data = cfg_file.read(file_path)
        elif ext == 'csv':
            data = csv_file.read(file_path)
        elif ext == 'json':
            data = json_file.read(file_path)
        elif ext == 'yaml':
            data = yaml_file.read(file_path)
        elif ext == 'zip':
            data = yaml_file.read(file_path)
        elif ext == 'txt':
            data = text_file.read(file_path)
        # elif ext == 'kjml':
        #     data = []
        #     with open(file_path, 'r') as f:
        #         for line in f.readlines():
        #             data.append(line[:-1])
        return data

    def export_data(self, data, name, folder_path='.', ext='json') -> None:
        """
        # 导出数据
        导出数据到数据文件
        ## 支持导出的数据文件格式
        - Setup Information file: *.inf
        - Configuration file: *.ini
        - Generic Preference file: *.cfg, *.config
        - Comma Separated Values file: *.csv
        - JavaScript Object Notation file: *.json
        - YAML Ain't Markup Language file: *.yaml
        - ZIP Compressed file: *.zip
        - Text file: *.txt
        """
        ext = ext.lower()
        file_path = "{}/{}.{}".format(folder_path, name, ext)
        #
        if ext in ['cfg', 'config', 'ini', 'inf']:
            cfg_file.write(file_path, data)
        elif ext == 'csv':
            csv_file.write(file_path, data)
        elif ext == 'json':
            json_file.write(file_path, data)
        elif ext == 'yaml':
            yaml_file.write(file_path, data)
        elif ext == 'zip':
            zip_file.write(file_path, data)
        elif ext == 'txt':
            text_file.write(file_path, data)

    def mount(self, dot_path: str) -> None:
        """
        # 挂载数据文件数据到内存
        """
        pass

    def umount(self, dot_path: str) -> None:
        """
        # 从内存中卸载数据（不保存）
        """
        pass

    def scan(self, path):
        fileList = []
        for dirpath, dirnames, filenames in os.walk(path, True):
            for filename in filenames:
                fileList.append(dirpath + '\\' + filename)
                dispatcher.dispatch(
                    event_type.DATA_FILE_FOUND,
                    self.path2dot(dirpath + '\\' + filename)
                )
        return fileList

    def scan_config(self, config_path):
        pass

    def load_config(self, config_path):
        """
        从路径读入ConfigPath，并挂载到data config key
        """
        # self.info('├─ Loading Engine Config...')
        config = self.load_data(config_path)
        for each in config['config.config'].keys():
            self.data['config'][each] = config['config.config'][each]
        # dispatcher.dispatch(event_type.ENGINE_CONFIG_LOADED)

    def scan_data_files(self):
        file_list = self.scan('data')
        # dispatcher.dispatch(
        # event_type.DATA_FILES_SCAN_FINISHED, len(file_list)
        # )

    def load_data_files(self):
        file_list = self.scan('data')
        # dispatcher.dispatch(
        #     event_type.DATA_FILES_LOAD_FINISHED, len(file_list)
        # )

    # TODO：↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    def save_to(self, save_num, save_name=''):
        """
        将存档按序号保存到存档文件中
        """
        self.save_file(self.data['db'],
                       'save/{}.{}.zip'.format(save_num, save_name))

    def load_from(self, save_num):
        """
        将存档按数值保存到存档文件中
        """
        save_file_path_list = self.scan('save')
        for each in save_file_path_list:
            if each.split('\\')[-1].split('.')[0] == str(save_num):
                self.data['db'] = self.load_file(each)

    def read_file_by_dot_path(self, dot_path):
        """
        # 通过DOT_PATH读取数据文件
        若
        ## 用法
        ```python
        # 读取data文件夹中的test.json
        data = read_file_by_dot_path('test')
        # 当data文件夹中存在test文件与
        # 的test.json
        data = read_file_by_dot_path('test')
        ```
        """
        file_path = DotPath.dot2path(dot_path)
        return self.import_data(file_path)

    def write_file_by_dot_path(self, dot_path, ext='yaml'):
        """
        # 将一个data文件夹中加载的数据重新保存回去
        # """
        data = self.data[dot_path]
        path_to_file = DotPath.dot2path(dot_path)
        self.export_data(data,)
        self.save_file(data, path_to_file)

    def load_data(self, files, send_func=None):
        data = {}
        for each in files:
            key = DotPath.path2dot(each)[0]
            # 载入文件
            # self.emit('')
            # e.info('│  ├─ Loading [{}]...'.format(each))
            if send_func is not None:
                bag = {
                    'type': 'load_text',
                    'value': 'Data: [ {} ]...'.format(key),
                    'from': 'b',
                    'to': 'r'
                }
                send_func(bag)
            data[key] = self.import_data(each)
        return data

    def save_data_to_file(self, dot_path, ext='yaml'):
        """
        # 将一个data文件夹中加载的数据重新保存回去
        # """
        data = self.data[dot_path]
        path_to_file = self.dot2path(dot_path, ext)
        self.save_file(data, path_to_file)
    # TODO：↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

    def file_type_predict(self, file_path):
        pass

    def file_convert(self, from_file_path, to_file_path, from_format='',
                     to_format=''):
        # 格式强制转换
        if from_format == '':
            from_format = os.path.splitext(from_file_path).lower()
        if to_format == '':
            to_format = os.path.splitext(to_file_path).lower()

        data = None
        if from_format in ['cfg', 'config', 'ini', 'inf']:
            data = cfg_file.read(from_file_path)
        elif from_format == 'csv':
            data = csv_file.read(from_file_path)
        elif from_format == 'json':
            data = json_file.read(from_file_path)
        elif from_format == 'yaml':
            data = yaml_file.read(from_file_path)
        elif from_format == 'zip':
            data = yaml_file.read(from_file_path)
        elif from_format == 'txt':
            data = text_file.read(from_file_path)

        if to_format in ['cfg', 'config', 'ini', 'inf']:
            cfg_file.write(to_file_path, data)
        elif to_format == 'csv':
            csv_file.write(to_file_path, data)
        elif to_format == 'json':
            json_file.write(to_file_path, data)
        elif to_format == 'yaml':
            yaml_file.write(to_file_path, data)
        elif to_format == 'zip':
            zip_file.write(to_file_path, data)
        elif to_format == 'txt':
            text_file.write(to_file_path, data)
