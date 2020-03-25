from . import data, lock, protocol


class APIModule(data.DataModule, lock.LockModule, protocol.ProtocolModule):
    def register_entry(self, entry_func):
        pass
