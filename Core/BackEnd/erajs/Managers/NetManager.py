import threading
from urllib.parse import urlparse

from flask import Flask, request
from flask_socketio import SocketIO


class NetManager:
    def __init__(self):
        self.app = Flask(__name__)
        self.sio = SocketIO(self.app)

    def create_server(self, address=None):
        def run():
            if address:
                config = {
                    'host': address[0],
                    'port': address[1],
                    'debug': False
                }
                self.sio.run(self.app, **config)
            else:
                self.sio.run(self.app)
        self.app.add_url_rule('/', 'core', self.core)
        self.app.add_url_rule('/<path:path>', 'res', self.res)
        self.sio.on_event('connect', self.on_connect)
        t = threading.Thread(target=run)
        t.run()

    def on_connect(self, data):
        pass

    def core(self):
        return "123"

    def res(self, path):
        print(path)
        return "123"


if __name__ == "__main__":
    nm = NetManager()
    nm.create_server(('0.0.0.0', 80))
