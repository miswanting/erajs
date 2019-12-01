import enum


class EventEmitter:
    """
    # 事件调度器
    """
    __listener_list: list = []
    # 别名
    add_listener = on
    off = remove_listener

    def on(self, type, listener):
        new_listener = {
            'type': type,
            'listener': listener
        }
        self.emit(EmitterEvent.NEW_LISTENER, new_listener)
        self.__listener_list.append(new_listener)

    def once(self):
        pass

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
                self.emit(EmitterEvent.NEW_LISTENER, new_listener)

    def remove_all_listeners(self):
        """
        removable == False的侦听器只能被remove_listener()单独移除。
        """
        new_listener_list = []
        for each in self.__listener_list:
            if not each['removable']:
                new_listener_list.append(each)
        self.__listener_list = new_listener_list

    def emit(self, type, data=None):
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

    def show_listener_list(self):
        for each in self.__listener_list:
            print(each)


class EmitterEvent(enum.Enum):
    NEW_LISTENER = enum.auto()
    REMOVE_LISTENER = enum.auto()
