from . import data, lock, protocol


class APIModule(data.DataModule, lock.LockModule, protocol.ProtocolModule):
    def register_entry(self, entry_func, *arg, **kw):
        self.debug('Register Entry: {}'.format(entry_func.__name__))
        self.__entry = (entry_func, arg, kw)

    def get_entry_func(self):
        return self.__entry[0]

    def push(self, type, data, style):
        pkg = {
            'type': type,
            'data': data,
            'style': style
        }
        self.send(pkg)
