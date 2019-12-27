import enum
import threading

from . import LogManager


# Node Style


class EventType(enum.Enum):
    NEW_LISTENER = 'new_listener'
    REMOVE_LISTENER = 'remove_listener'


class EventEmitter:
    """
    # 事件调度器
    """
    __listener_list: list = []
    sync: bool = False

    def __init__(self):
        self.log = LogManager.LogManager()

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
                self.__listener_list.pop(i)
                break

    def remove_all_listeners(self):
        new_listener_list = []
        for each in self.__listener_list:
            if not each['removable']:
                new_listener_list.append(each)
        self.__listener_list = new_listener_list

    def has_listener(self, type):
        for each in self.__listener_list:
            if each['type'] == type:
                return True
        return False

    def emit(self, eventType, *arg, **kw):
        i = 0
        while i < len(self.__listener_list):
            listener = self.__listenerif_list[i]
            if self.sync:
                listener['listener'](*arg, **kw)
            else:
                t = threading.Thread(
                    target=listener['listener'],
                    args=arg,
                    kwargs=kw
                )
                if listener['one_time']:
                    self.__listener_list.pop(i)
                    i -= 1
                t.start()
            i += 1
    dispatch = emit
    add_listener = on
    off = remove_listener

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
    myEmitter = EventEmitter()
    myEmitter.once(EventType.NEW_LISTENER, tmp)
    myEmitter.on('event', listener_A)
