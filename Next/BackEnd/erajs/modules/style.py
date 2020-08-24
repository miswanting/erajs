from . import net


class StyleModule(net.NetModule):
    def __init__(self):
        super().__init__()
        self.__data = {
            'header': {},
            'container': {},
            'footer': {},
            'page': {},
            'divider': {},
            'text': {},
            'button': {},
            'link': {},
            'progress': {},
            'rate': {},
            'check': {},
            'radio': {},
            'input': {},
            'dropdown': {}
        }
