# coding:utf-8

from .Managers import BrowserManager, NetManager
from .Prototypes.Singleton import Singleton


class Engine(Singleton):
    def __init__(self):
        super()
        self.net = NetManager.NetManager()
        self.browser = BrowserManager.BrowserManager()

    def init(self):
        self.net.create_server(('0.0.0.0', 80))
        self.browser.open_new_tab()

    def bind(self, address):
        pass
