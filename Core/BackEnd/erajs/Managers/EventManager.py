import enum
import threading
from typing import List

# Node Style


class EventType(enum.Enum):
    NEW_LISTENER = 'new_listener'
    REMOVE_LISTENER = 'remove_listener'


class EventManager:
    """
    # 事件调度器
    """

    def __init__(self):
        self.__listener_list: List[dict] = []
        self.sync: bool = False

    def on(self, eventType, listener):
        """
        # 123
        """
        new_listener = {
            'type': eventType,
            'listener': listener,
            'once': False
        }
        self.emit(EventType.NEW_LISTENER, eventType, listener)
        self.__listener_list.append(new_listener)

    def once(self, eventType, listener):
        new_listener = {
            'type': eventType,
            'listener': listener,
            'once': True
        }
        self.emit(EventType.NEW_LISTENER, eventType, listener)
        self.__listener_list.append(new_listener)

    def remove_listener(self, eventType, listener):
        for i, each in enumerate(self.__listener_list):
            if each['type'] == eventType and \
                    each['listener'].__name__ == listener.__name__:
                listener_data = self.__listener_list.pop(i)
                self.emit(EventType.REMOVE_LISTENER,
                          listener_data['type'], listener_data['listener'])
                break

    def remove_all_listeners(self):
        while self.__listener_list:
            listener_data = self.__listener_list.pop(0)
            self.emit(EventType.REMOVE_LISTENER,
                      listener_data['type'], listener_data['listener'])

    def emit(self, eventType, *arg, **kw):
        i = 0
        while i < len(self.__listener_list):
            listener = self.__listener_list[i]
            if self.sync:
                listener['listener'](*arg, **kw)
            else:
                t = threading.Thread(
                    target=listener['listener'],
                    args=arg,
                    kwargs=kw
                )
                if listener['once']:
                    self.__listener_list.pop(i)
                    i -= 1
                t.start()
            i += 1
    dispatch = emit
    add_listener = on
    off = remove_listener

    def has_listener(self, type):
        for each in self.__listener_list:
            if each['type'] == type:
                return True
        return False

    def get_listener_list(self):
        return self.__listener_list

    def show_listener_list(self):
        for each in self.__listener_list:
            print(each)


if __name__ == "__main__":
    def tmp(event, listener):
        if event == 'event':
            myEmitter.on('event', listener_B)

    def listener_A():
        print('A')

    def listener_B():
        print('B')
    myEmitter = EventManager()
    myEmitter.once(EventType.NEW_LISTENER, tmp)
    myEmitter.on('event', listener_A)
