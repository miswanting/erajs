from flask import Flask
from flask_socketio import SocketIO

from ..Prototypes.Singleton import Singleton


class NetManager(Singleton):
    def bind(self, address):
        app = Flask(__name__)
        sio = SocketIO(app)

    def connect(self, address):
        pass
