import threading
from typing import Any, Callable, Dict, List, Text, Tuple

from . import debug


class EventModule(debug.DebugModule):
    """
    # 事件管理器
    """

    def __init__(self) -> None:
        super().__init__()
        self.__listener_list: List[Dict[str, Any]] = []

    def on(self, type: str, listener: Callable[[], Any], *arg: Tuple[Any, Any], **kw: Dict[Any, Any]) -> None:
        new_listener = {
            'type': type,
            'listener': listener,
            'one_time': False,
            'arg': arg,
            'kw': kw
        }
        # print('On:', new_listener)
        self.__listener_list.append(new_listener)
    add_listener = on

    def once(self, type: str, listener: Callable[[Any, Any], Any], *arg: Tuple[Any, Any], **kw: Dict[Any, Any]) -> None:
        new_listener = {
            'type': type,
            'listener': listener,
            'one_time': True,
            'arg': arg,
            'kw': kw
        }
        self.__listener_list.append(new_listener)

    def remove_listener(self, type: str, listener: Callable[[Any, Any], Any]) -> None:
        for i, each in enumerate(self.__listener_list):
            if each['type'] == type and each['listener'] == listener:
                self.__listener_list.pop(i)
    off = remove_listener

    def remove_all_listeners(self) -> None:
        new_listener_list = []
        for listener in self.__listener_list:
            if listener['type'] == 'CONSOLE_INPUT':
                new_listener_list.append(listener)
        self.__listener_list = new_listener_list

    def emit(self, type: str, data: Any = None) -> None:
        # print('Emit:', data)
        event = {
            'type': type,
            'data': data
        }
        i = 0
        # print('Emit:', self.__listener_list)
        while i < len(self.__listener_list):
            listener = self.__listener_list[i]
            if event['type'] != listener['type']:
                i += 1
                continue
            if listener['one_time']:
                self.__listener_list.pop(i)
                i -= 1
            ##
            t = threading.Thread(
                target=listener['listener'], args=(data,))
            t.start()
            # /
            # listener['listener'](data)
            ##
            i += 1
    dispatch = emit

    def has_listener(self, type: str, listener: Callable[[Any, Any], Any]) -> bool:
        for each in self.__listener_list:
            if each['type'] == type and each['listener'] == listener:
                return True
        return False

    def show_listener_list(self) -> None:
        for each in self.__listener_list:
            print(each)

    def get_listener_list(self) -> List[Dict[Text, Any]]:
        return self.__listener_list
