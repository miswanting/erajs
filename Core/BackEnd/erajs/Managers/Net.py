from flask import Flask
from flask_socketio import SocketIO

from ..Prototypes.Singleton import Singleton


class NetManager(Singleton, Namespace):
    def bind(self, address):
        app = Flask(__name__)
        sio = SocketIO(app)
        sio.on_event('connect', self.on_connect)

    def on_connect(self, data):
        pass
