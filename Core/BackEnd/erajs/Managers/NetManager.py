from flask import Flask
from flask_socketio import SocketIO

# from ..Prototypes.Singleton import Singleton


class NetManager:
    # class NetManager(Singleton):
    def __init__(self):
        self.app = Flask(__name__)
        self.sio = SocketIO(self.app)

    def create_server(self, address=None):
        self.app.add_url_rule('/', 'index', self.index)
        self.sio.on_event('connect', self.on_connect)
        if address:
            config = {
                'host': address[0],
                'port': address[1],
                'debug': False
            }
            self.sio.run(self.app, **config)
        else:
            self.sio.run(self.app)

    def on_connect(self, data):
        pass

    def index(self):
        return "123"


if __name__ == "__main__":
    nm = NetManager()
    nm.create_server(('0.0.0.0', 80))
