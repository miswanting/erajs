import os.path
import threading
import webbrowser
from urllib.parse import urlparse

from flask import Flask, make_response, request, send_file
from flask_socketio import SocketIO

from . import debug, event


class NetModule(event.EventModule):
    def __init__(self):
        super().__init__()
        self.__core = NetCore(self.recv)

    def listen(self, host='0.0.0.0', port=80):
        self.__core.start()
        webbrowser.open_new('{}'.format('localhost'))

    def on_connect(self):
        pass

    def send(self, data):
        pass

    def recv(self, data):
        pass


class NetCore(threading.Thread, debug.DebugModule):
    def __init__(self, callback_func):
        super().__init__()
        self.hook = callback_func
        self.app = Flask(__name__)
        self.sio = SocketIO(self.app)
        self.address = None

    def run(self):
        self.create_server(('localhost', 80))

    def create_server(self, address=None):
        self.address = address
        self.app.add_url_rule('/', 'core', self.core)
        self.app.add_url_rule('/<path:path>', 'res', self.res)
        self.sio.on_event('connect', self.on_connect)
        self.sio.on_event('msg', self.on_msg)
        self.sio.on_event('test', self.test)
        self.server_core()
        # t = threading.Thread(target=self.server_core)
        # t.run()

    def server_core(self):
        print('Open localhost...')
        self.debug(open)
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
        with open('ui/index.html', encoding='utf-8') as f:
            return f.read()

    def res(self, path):
        print(path)
        if os.path.exists('ui/'+path):
            resp = make_response(send_file('../ui/'+path))
            return resp
            # with open('front/'+path, 'r', encoding='utf-8') as f:
            #     return f.read()
        print('FILE NOT FOUND: {}'.format('ui/'+path))
        return 'PAGE NOT FOUND: {}'.format(path)

    def test(self, msg):
        print(msg)
