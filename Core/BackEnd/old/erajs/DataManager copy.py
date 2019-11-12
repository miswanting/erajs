import os

from . import EventManager, LogManager, Prototypes
from .file_type_support import cfg, csv, json, text, yaml, zipfile


logger = LogManager.logger
dispatcher = EventManager.EventDispatcher()
event_type = EventManager.EventType


class DataManager(Prototypes.Singleton):
    # data = {}
    # pool = []

    def __init__(self):
        # logger = LogManager.LogManager()
        self.__data = {}

        def handle_engine_init_started(e):
            self.check_file_system()

        def handle_file_system_checked(e):
            self.load_config(['config/config.ini'])

        def handle_server_config_sent(e):
            self.scan_data_files()

        def handle_data_file_scan_finished(e):
            self.load_data_files()

        listener_factory = [
            (
                event_type.ENGINE_INIT_STARTED,
                handle_engine_init_started,
                True,
            ),
            (
                event_type.FILE_SYSTEM_CHECKED,
                handle_file_system_checked,
                True,
            ),
            (
                event_type.SERVER_CONFIG_SENT,
                handle_server_config_sent,
                True,
            ),
            (
                event_type.DATA_FILE_SCAN_FINISHED,
                handle_data_file_scan_finished,
                True,
            ),
        ]
        for each in listener_factory:
            dispatcher.add_listener(
                each[0],
                each[1],
                one_time=each[2],
            )

    @property
    def data(self):
        return self.__data

    @data.setter
    def data(self, value):
        self.__data = value

    def check_file_system(self):
        """
        # 数据初始化
        - 维护数据完整性
        - 维护数据文件夹完整性
        - 维护数据文件完整性
        """
        self.__data = {
            "config": {
                "plugins": {},  # 插件激活状态
                "dlcs": {},  # DLC激活状态
                "mods": {},  # MOD激活状态
            },
            "db": {},  # 存档的数据
            # "class": {},
            # "api": {},
            "tmp": {},
            # "entity": {},
            # "act": {},
            # "kojo": {}
        }
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
                logger.warn(
                    '│  ├─ Folder [{}] Missing. Creating...'.format(each))
                os.mkdir(each)
        # 补全文件
        for each in check_file_list:
            if not os.path.isfile(each):
                logger.warn(
                    '│  ├─ File [{}] Missing. Creating...'.format(each))
                open(each, 'w')
        dispatcher.dispatch(event_type.FILE_SYSTEM_CHECKED)

    def load_config(self, config_path):
        """
        从路径读入ConfigPath，并挂载到data config key
        """
        logger.info('├─ Loading Engine Config...')
        config = self.load_data(config_path)
        for each in config['config.config'].keys():
            self.data['config'][each] = config['config.config'][each]
        dispatcher.dispatch(event_type.ENGINE_CONFIG_LOADED)

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

    def scan_data_files(self):
        self.scan('data')

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

    def add(self, item):
        item['hash'] = new_hash()
        self.pool.append(item)
        return item['hash']

    def get(self, pattern):
        # 参考GraphQL的部分实现原理
        def match(item, pattern):
            found = True
            for each_key in pattern.keys():
                if each_key not in item.keys():
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
        """
        # 将路径转换为点路径
        # """
        path = path.replace('/', '\\')
        dot = '.'.join('.'.join(path.split('.')[0:-1]).split('\\'))
        ext = path.split('.')[-1]
        return dot, ext

    def dot2path(self, dot, ext):
        """
        # 将点路径转换为路径
        # """
        path = '.'.join(['\\'.join(dot.split('.')), ext])
        return path

    def load_data(self, files, send_func=None):
        data = {}
        for each in files:
            key = self.path2dot(each)[0]
            # 载入文件
            logger.info('│  ├─ Loading [{}]...'.format(each))
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
        """
        # 将一个data文件夹中加载的数据重新保存回去
        # """
        data = self.data[dot_path]
        path_to_file = self.dot2path(dot_path, ext)
        self.save_file(data, path_to_file)

    # def load_file(self, path_to_file):
    #     """
    #     # 从文件加载数据，并返回
    #     # """
    #     path_to_file = path_to_file.replace('/', '\\')
    #     ext = path_to_file.split('\\')[-1].split('.')[-1]
    #     data = None
    #     # time_start = time.time()
    #     if ext in ['cfg', 'config', 'ini', 'inf']:
    #         config = configparser.ConfigParser()
    #         config.read(path_to_file)
    #         d = dict(config._sections)
    #         for k in d:
    #             d[k] = dict(d[k])
    #         data = d
    #     elif ext == 'csv':
    #         with open(path_to_file, 'r', newline='', encoding='utf-8') as f:
    #             reader = csv.reader(f)
    #             new_list = []
    #             for row in reader:
    #                 new_list.append(row)
    #         data = new_list
    #     elif ext == 'json':
    #         with open(path_to_file, 'r', encoding='utf-8') as f:
    #             data = json.loads(''.join(f.readlines()))
    #     elif ext == 'yaml':
    #         with open(path_to_file, 'r', encoding='utf-8') as f:
    #             data = yaml.load(''.join(f.readlines()))
    #     elif ext == 'zip':
    #         with zipfile.ZipFile(path_to_file) as z:
    #             data = {}
    #             for file_name in z.namelist():
    #                 with z.open(file_name) as f:
    #                     data['.'.join(file_name.split('.')[0:-1])
    #                          ] = json.loads(f.read())
    #     elif ext == 'txt':
    #         data = []
    #         with open(path_to_file, 'r') as f:
    #             for line in f.readlines():
    #                 data.append(line[:-1])
    #     elif ext == 'kjml':
    #         data = []
    #         with open(path_to_file, 'r') as f:
    #             for line in f.readlines():
    #                 data.append(line[:-1])
    #     # time_stop = time.time()
    #     # print('加载{}文件用时：{}ms'.format(path_to_file,
    #     #                              int((time_stop-time_start)*1000)))
    #     return data

    # def save_file(self, data, path_to_file):
    #     """
    #     # 保存数据到某文件
    #     """
    #     path_to_file = path_to_file.replace('/', '\\')
    #     ext = path_to_file.split('\\')[-1].split('.')[-1]
    #     time_start = time.time()
    #     if ext in ['cfg', 'config', 'ini', 'inf']:
    #         config = configparser.ConfigParser()
    #         config.read_dict(data)
    #         with open(path_to_file, 'w')as f:
    #             config.write(f)
    #     elif ext == 'csv':
    #         with open(path_to_file, 'w', newline='', encoding='utf-8') as f:
    #             reader = csv.writer(f)
    #             reader.writerows(data)
    #     elif ext == 'json':
    #         with open(path_to_file, 'w', encoding='utf-8') as f:
    #             f.write(json.dumps(data, ensure_ascii=False))
    #     elif ext == 'yaml':
    #         with open(path_to_file, 'w', encoding='utf-8') as f:
    #             f.write(yaml.dump(data, allow_unicode=True,
    #                               default_flow_style=False))
    #     elif ext == 'zip':
    #         with zipfile.ZipFile(path_to_file, 'w', zipfile.ZIP_LZMA) as z:
    #             for key in data:
    #                 z.writestr('{}.json'.format(key), json.dumps(
    #                     data[key], ensure_ascii=False))
    #     elif ext == 'txt':
    #         with open(path_to_file, 'w') as f:
    #             for line in data:
    #                 f.write('{}\n'.format(line))
    #     time_stop = time.time()
        # print('保存{}文件用时：{}ms'.format(path_to_file,
        #                              int((time_stop-time_start)*1000)))

    def export_data(self, data, name, folder_path='.', ext='json'):
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
            cfg.write(file_path, data)
            # config = configparser.ConfigParser()
            # config.read_dict(data)
            # with open(file_path, 'w')as f:
            #     config.write(f)
        elif ext == 'csv':
            csv.write(file_path, data)
            # with open(file_path, 'w', newline='', encoding='utf-8') as f:
            #     reader = csv.writer(f)
            #     reader.writerows(data)
        elif ext == 'json':
            json.write(file_path, data)
            # with open(file_path, 'w', encoding='utf-8') as f:
            #     f.write(json.dumps(data, ensure_ascii=False))
        elif ext == 'yaml':
            yaml.write(file_path, data)
            # with open(file_path, 'w', encoding='utf-8') as f:
            #     f.write(yaml.dump(data, allow_unicode=True,
            #                       default_flow_style=False))
        elif ext == 'zip':
            zipfile.write(file_path, data)
            # with zipfile.ZipFile(file_path, 'w', zipfile.ZIP_LZMA) as z:
            #     for key in data:
            #         z.writestr('{}.json'.format(key), json.dumps(
            #             data[key], ensure_ascii=False))
        elif ext == 'txt':
            text.write(file_path, data)
            # with open(file_path, 'w') as f:
            #     for line in data:
            #         f.write('{}\n'.format(line))

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
        ext = os.path.splitext(file_path).lower()
        data = None
        if ext in ['cfg', 'config', 'ini', 'inf']:
            data = cfg.read(file_path)
            # config = configparser.ConfigParser()
            # config.read(file_path)
            # d = dict(config._sections)
            # for k in d:
            #     d[k] = dict(d[k])
            # data = d
        elif ext == 'csv':
            data = csv.read(file_path)
            # with open(file_path, 'r', newline='', encoding='utf-8') as f:
            #     reader = csv.reader(f)
            #     new_list = []
            #     for row in reader:
            #         new_list.append(row)
            # data = new_list
        elif ext == 'json':
            data = json.read(file_path)
            # with open(file_path, 'r', encoding='utf-8') as f:
            #     data = json.loads(''.join(f.readlines()))
        elif ext == 'yaml':
            data = yaml.read(file_path)
            # with open(file_path, 'r', encoding='utf-8') as f:
            #     data = yaml.load(''.join(f.readlines()))
        elif ext == 'zip':
            data = yaml.read(file_path)
            # with zipfile.ZipFile(file_path) as z:
            #     data = {}
            #     for file_name in z.namelist():
            #         with z.open(file_name) as f:
            #             data['.'.join(file_name.split('.')[0:-1])
            #                  ] = json.loads(f.read())
        elif ext == 'txt':
            data = text.read(file_path)
            # data = []
            # with open(file_path, 'r') as f:
            #     for line in f.readlines():
            #         data.append(line[:-1])
        elif ext == 'kjml':
            data = []
            with open(file_path, 'r') as f:
                for line in f.readlines():
                    data.append(line[:-1])
        return
