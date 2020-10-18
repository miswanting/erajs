from typing import Any, Callable, Dict, List, Text

from . import data, lock, protocol


class APIModule(data.DataModule, lock.LockModule, protocol.ProtocolModule):
    def __init__(self):
        super().__init__()
        self.__gui_list = []

    def register_entry(self, entry_func: Callable[[], None], *arg: List[Any], **kwargs: Dict[Text, Any]):
        self.debug('Register Entry: {}'.format(entry_func.__name__))
        self.__entry: List[Any] = [entry_func, arg, kwargs]

    def get_entry_func(self):
        return self.__entry[0]

    def push(self, type: Text, data: Any, style: Dict[Text, Any]):
        pkg: Dict[Text, Any] = {
            'type': type,
            'data': data,
            'style': style
        }
        self.send(pkg)

    def goto(self, ui_func: Callable[[], None], *arg: List[Any], **kw: Dict[Text, Any]):
        self.debug('GOTO: Append [{}] to [{}] & run'.format(
            ui_func.__name__, self._show_gui_list()))
        self.__gui_list.append((ui_func, arg, kw))  # append_gui
        ui_func(*arg, **kw)

    def back(self, num: int = 1, *arg: List[Any], **kw: Dict[Text, Any]):
        for _ in range(num):
            self.debug('BACK: Pop [{}] from [{}]'.format(
                self.__gui_list[-1][0].__name__, self._show_gui_list()))
            self.__gui_list.pop()
        self.debug('BACK: & run last')
        self.__gui_list[-1][0](*self.__gui_list[-1][1],
                               **self.__gui_list[-1][2])  # repeat

    def repeat(self, *arg: List[Any], **kw: Dict[Text, Any]):
        self.debug('REPEAT: Run [{}] in [{}]'.format(
            self.__gui_list[-1][0].__name__, self._show_gui_list()))
        self.__gui_list[-1][0](*self.__gui_list[-1][1],
                               **self.__gui_list[-1][2])

    def append_gui(self, func: Callable[[], None], *arg: List[Any], **kw: Dict[Text, Any]):
        self.debug('APPEND: Append [{}] to [{}]'.format(
            func.__name__, self._show_gui_list()))
        self.__gui_list.append((func, arg, kw))

    def clear(self, num: int = 0):
        if num == 0:
            self.debug('CLEAR_ALL_GUI: Set [{}] to []'.format(
                self._show_gui_list()))
            self.__gui_list.clear()
        else:
            for _ in range(num):
                self.debug('CLEAR_LAST_GUI: Pop [{}] from [{}]'.format(
                    self.__gui_list[-1][0].__name__, self._show_gui_list()))
                self.__gui_list.pop()

    def get_gui_list(self):
        gui_list = []
        for each in self.__gui_list:
            gui_list.append(each[0].__name__)
        return gui_list

    def _show_gui_list(self):
        gui_list = []
        for each in self.__gui_list:
            gui_list.append(each[0].__name__)
        return ' → '.join(gui_list)
