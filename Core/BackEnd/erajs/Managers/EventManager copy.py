import enum
import threading

from ..Prototypes import Prototypes
from . import LogManager


class EventType(enum.Enum):
    NEW_LISTENER = 'new_listener'
    REMOVE_LISTENER = 'remove_listener'


# class EventType(enum.Enum):
#     """
#     # 事件枚举
#     - ENGINE_INIT
#         - 引擎初始化（由API: init触发）
#     - FILE_SYSTEM_CHECKED
#         - 文件系统完整性检查完成（由DataManager: check_file_system触发）
#     - ENGINE_CONFIG_LOADED
#         - 引擎配置文件加载完成（由DataManager: load_config触发）
#     - PLUGIN_FOUND
#         - 扫描到一个插件（由ModuleManager触发）
#     - PLUGIN_SCAN_FINISHED
#         - 插件扫描完成（由ModuleManager触发）
#     - PLUGIN_LOADED
#         - 加载完一个插件（由ModuleManager触发）
#     - PLUGIN_LOAD_FINISHED
#         - 插件加载完成（由ModuleManager触发）
#     - SERVER_CONNECTED
#         - 引擎配置文件加载完成（由DataManager: load_config触发）
#     - SERVER_CONFIG_SENT
#         - 引擎配置文件加载完成（由DataManager: load_config触发）
#     - DATA_FILE_FOUND
#         - 扫描到一个数据文件（由DataManager触发）
#     - DATA_FILE_SCAN_FINISHED
#         - 数据文件扫描完成（由DataManager触发）
#     - DATA_FILE_LOADED
#         - 加载完一个数据文件（由DataManager触发）
#     - DATA_FILE_LOAD_FINISHED
#         - 数据文件加载完成（由DataManager触发）
#     - SCRIPT_FOUND
#         - 扫描到一个脚本（由ModuleManager触发）
#     - SCRIPT_SCAN_FINISHED
#         - 脚本扫描完成（由ModuleManager触发）
#     - SCRIPT_LOADED
#         - 加载完一个脚本（由ModuleManager触发）
#     - SCRIPT_LOAD_FINISHED
#         - 脚本加载完成（由ModuleManager触发）
#     - DLC_FOUND
#         - 扫描到一个DLC（由ModuleManager触发）
#     - DLC_SCAN_FINISHED
#         - DLC扫描完成（由ModuleManager触发）
#     - DLC_LOADED
#         - 加载完一个DLC（由ModuleManager触发）
#     - DLC_LOAD_FINISHED
#         - DLC加载完成（由ModuleManager触发）
#     - MOD_FOUND
#         - 扫描到一个MOD（由ModuleManager触发）
#     - MOD_SCAN_FINISHED
#         - MOD扫描完成（由ModuleManager触发）
#     - MOD_LOADED
#         - 加载完一个MOD（由ModuleManager触发）
#     - MOD_LOAD_FINISHED
#         - MOD加载完成（由ModuleManager触发）
#     - ENGINE_INIT_FINISHED
#         - 引擎初始化完成（由Engine触发）
#     """
#     ENGINE_INIT_STARTED = 'engine_init_started'
#     FILE_SYSTEM_CHECKED = 'file_system_checked'
#     ENGINE_CONFIG_LOADED = 'engine_config_loaded'
#     PLUGIN_FOUND = 'plugin_found'
#     PLUGINS_SCAN_FINISHED = 'plugin_scan_finished'
#     PLUGIN_LOADED = 'plugin_loaded'
#     PLUGINS_LOAD_FINISHED = 'plugins_load_finished'
#     SERVER_CONNECTED = 'server_connected'
#     SERVER_CONFIG_SENT = 'server_config_sent'
#     DATA_FILE_FOUND = 'data_file_found'
#     DATA_FILES_SCAN_FINISHED = 'data_files_scan_finished'
#     DATA_FILE_LOADED = 'data_file_loaded'
#     DATA_FILES_LOAD_FINISHED = 'data_files_load_finished'
#     SCRIPT_FOUND = 'script_found'
#     SCRIPTS_SCAN_FINISHED = 'scripts_scan_finished'
#     SCRIPT_LOADED = 'script_loaded'
#     SCRIPTS_LOAD_FINISHED = 'scripts_load_finished'
#     DLC_FOUND = 'dlc_found'
#     DLCS_SCAN_FINISHED = 'dlcs_scan_finished'
#     DLC_LOADED = 'dlc_loaded'
#     DLCS_LOAD_FINISHED = 'dlcs_load_finished'
#     MOD_FOUND = 'mod_found'
#     MODS_SCAN_FINISHED = 'mods_scan_finished'
#     MOD_LOADED = 'mod_loaded'
#     MODS_LOAD_FINISHED = 'mods_load_finished'
#     ENGINE_INIT_FINISHED_SIGNAL_SENT = 'engine_init_finished_signal_sent'
#     ENGINE_INIT_FINISHED = 'engine_init_finished'


class Event:
    """
    # 事件类
    ## 构造方法
    - type
        - 事件的类型
    - data
        - 与事件相关的数据
    - cancelable: bool = False
        - 是否可被取消
        - 如果cancelable == True，在调用prevent_default()之后，
        后续的、优先级为0的侦听器（又称“默认行为”）将全部无法侦听到该事件。
    - stoppable: bool = False
        - 是否可被停止传播
        - 如果stoppable == True，在调用stop_propagation()之后，
        后续的侦听器将全部无法侦听到该事件。

    ## 公共属性
    - type
        - 事件的类型
    - data
        - 事件的数据
    - cancelable
        - 是否可被取消
        - 如果cancelable == True，在调用prevent_default()之后，
        后续的、优先级为0的侦听器（又称“默认行为”）将全部无法侦听到该事件。
    - is_default_prevented
        - 是否已被注销默认行为
        - 如果is_default_prevented() == True，说明该事件已被注销默认行为。
        后续的、优先级为0的侦听器（又称“默认行为”）将全部无法侦听到该事件。
    - stoppable
        - 是否可被停止传播
        - 如果stoppable == True，在调用stop_propagation()之后，
        后续的侦听器将全部无法侦听到该事件。

    ## 公共方法
    - prevent_default()
        - 调用该方法，如果cancelable == True，
        后续的、优先级为0的侦听器（又称“默认行为”）将全部无法侦听到该事件。
    - stop_propagation()
        - 调用该方法，如果stoppable == True，
        后续的侦听器将全部无法侦听到该事件。
    """

    def __init__(self, type, data=None, cancelable=False, stoppable=True):
        # 公共属性
        self.type = type  # 事件的类型
        self.data = data  # 事件数据
        # 私有属性
        self.__cancelable = cancelable
        self.__is_default_prevented = False
        self.__stoppable = stoppable
        self.__is_propagation_stopped = False

    @property
    def cancelable(self):
        return self.__cancelable

    @property
    def is_default_prevented(self):
        return self.__is_default_prevented

    @property
    def is_propagation_stopped(self):
        return self.__is_propagation_stopped

    @property
    def stoppable(self):
        return self.__stoppable

    def prevent_default(self):
        if self.__cancelable:
            self.__is_default_prevented = True

    def stop_propagation(self):
        self.__is_propagation_stopped = True


class EventEmitter:
    """
    # 事件调度器
    """
    __listener_list: list = []

    def __init__(self):
        self.log = LogManager.LogManager()

    def add_listener(self, type, listener, priority=0,
                     removable=True, one_time=False):
        new_listener = {
            'type': type,
            'listener': listener,
            'priority': priority,
            'removable': removable,
            'one_time': one_time,
        }
        self.emit(EventType.NEW_LISTENER)
        self.__listener_list.append(new_listener)
        self.__listener_list.sort(key=lambda x: -x['priority'])

    def has_listener(self, type):
        for each in self.__listener_list:
            if each['type'] == type:
                return True
        return False

    def remove_listener(self, type, listener):
        for i, each in enumerate(self.__listener_list):
            if each['type'] == type and \
                    each['listener'].__name__ == listener.__name__:
                self.__listener_list.pop(i)

    def remove_all_listeners(self):
        """
        removable == False的侦听器只能被remove_listener()单独移除。
        """
        new_listener_list = []
        for each in self.__listener_list:
            if not each['removable']:
                new_listener_list.append(each)
        self.__listener_list = new_listener_list

    def dispatch(self, type, data=None):
        event = Event(type, data)
        i = 0
        while i < len(self.__listener_list):
            listener = self.__listener_list[i]
            if event.is_propagation_stopped:
                break
            if event.is_default_prevented and listener['priority'] == 0:
                break
            if event.type != listener['type']:
                i += 1
                continue
            t = threading.Thread(
                target=listener['listener'],
                args=(event, ),
                kwargs={}
            )
            if listener['one_time']:
                self.__listener_list.pop(i)
                i -= 1
            t.start()
            i += 1
    emit = dispatch

    def show_listener_list(self):
        for each in self.__listener_list:
            print(each)
