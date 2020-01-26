import os.path
import threading
from urllib.parse import urlparse

from flask import Flask, request, make_response
from flask_socketio import SocketIO


class NetManager:
    def __init__(self):
        self.core = NetCore()

    def create_server(self, address=None):
        self.core.create_server(address)


class NetCore:
    def __init__(self):
        self.app = Flask(__name__)
        self.sio = SocketIO(self.app)
        self.address = None

    def create_server(self, address=None):
        self.address = address
        self.app.add_url_rule('/', 'core', self.core)
        self.app.add_url_rule('/<path:path>', 'res', self.res)
        self.sio.on_event('connect', self.on_connect)
        self.sio.on_event('msg', self.on_msg)
        self.sio.on_event('test', self.test)
        t = threading.Thread(target=self.server_core)
        t.run()

    def server_core(self):
        if self.address:
            config = {
                'host': self.address[0],
                'port': self.address[1],
                'debug': False
            }
            self.sio.run(self.app, **config)
        else:
            self.sio.run(self.app)

    def on_connect(self):
        print('Connected!')
        print('ID: {}'.format(request.sid))
        print('Cookie ID: {}'.format(request.cookies.get('sid')))
        self.sio.emit('msg', 'msg')
        res = make_response()
        res.set_cookie('sid', request.sid)
        return res

    def on_msg(self, msg):
        print(msg)

    def core(self):
        with open('front/index.html', encoding='utf-8') as f:
            return f.read()

    def res(self, path):
        if os.path.exists('front/'+path):
            with open('front/'+path, 'r', encoding='utf-8') as f:
                return f.read()
        print('FILE NOT FOUND: {}'.format('front/'+path))
        return 'PAGE NOT FOUND: {}'.format(path)

    def test(self, msg):
        print(msg)


if __name__ == "__main__":
    nm = NetManager()
    nm.create_server(('0.0.0.0', 80))
