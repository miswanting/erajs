import threading
from typing import Any, Callable, List

from . import debug


class EventModule(debug.DebugModule):
    """
    # 事件管理器
    """

    def __init__(self) -> None:
        super().__init__()
        self.__listener_list: List[dict] = []

    def on(self, type: str, listener: Callable, *arg, **kw) -> None:
        new_listener = {
            'type': type,
            'listener': listener,
            'one_time': False,
            'arg': arg,
            'kw': kw
        }
        self.__listener_list.append(new_listener)
    add_listener = on

    def once(self, type: str, listener: Callable, *arg, **kw) -> None:
        new_listener = {
            'type': type,
            'listener': listener,
            'one_time': True,
            'arg': arg,
            'kw': kw
        }
        self.__listener_list.append(new_listener)

    def remove_listener(self, type: str, listener: Callable) -> None:
        for i, each in enumerate(self.__listener_list):
            if each['type'] == type and each['listener'] == listener:
                self.__listener_list.pop(i)
    off = remove_listener

    def remove_all_listeners(self) -> None:
        self.__listener_list.clear()

    def emit(self, type: str, data: Any = None) -> None:
        event = {
            'type': type,
            'data': data
        }
        i = 0
        while i < len(self.__listener_list):
            listener = self.__listener_list[i]
            if event['type'] != listener['type']:
                i += 1
                continue
            if listener['one_time']:
                self.__listener_list.pop(i)
                i -= 1
            t = threading.Thread(
                target=listener['listener'], args=(data,))
            t.start()
            # listener['listener'](data)
            i += 1
    dispatch = emit

    def has_listener(self, type: str, listener: Callable) -> bool:
        for each in self.__listener_list:
            if each['type'] == type and each['listener'] == listener:
                return True
        return False

    def show_listener_list(self) -> None:
        for each in self.__listener_list:
            print(each)

    def get_listener_list(self) -> List[dict]:
        return self.__listener_list
