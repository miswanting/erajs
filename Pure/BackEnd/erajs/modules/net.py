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
        self.__core = NetCore(self)

    def listen(self, host='0.0.0.0', port=80):
        self.debug('Server Address: {}:{}'.format(host, port))
        self.info('Waiting for Connection...')
        self.__core.start()
        webbrowser.open_new('{}'.format('localhost'))

    def on_connect(self, id):
        self.get_entry_func()()

    def send(self, data):
        self.__core.send(data)

    def recv(self, data):
        self.emit(data['type'], data)


class NetCore(threading.Thread):
    def __init__(self, engine):
        """"""
        super().__init__()
        self.__engine = engine
        self.__app = Flask(__name__)
        self.__sio = SocketIO(self.__app)
        self.__address = None

    def run(self):
        """"""
        self.create_server(('localhost', 80))

    def create_server(self, address=None):
        """"""
        self.address = address
        self.__app.add_url_rule('/', 'core', self.core)
        self.__app.add_url_rule('/<path:path>', 'res', self.res)
        self.__sio.on_event('connect', self.on_connect)
        self.__sio.on_event('data', self.on_data)
        self.__sio.on_event('test', self.test)
        self.server_core()
        # t = threading.Thread(target=self.server_core)
        # t.run()

    def server_core(self):
        """"""
        if self.address:
            config = {
                'host': self.address[0],
                'port': self.address[1],
                'debug': False
            }
            self.__sio.run(self.__app, **config)
        else:
            self.__sio.run(self.__app)

    def on_connect(self):
        """"""
        self.__engine.info('Connected from ID: {}'.format(request.sid))
        self.__engine.on_connect(request.sid)
        # self.__sio.emit('msg', 'msg')
        resp = make_response()
        resp.set_cookie('sid', request.sid)
        return resp

    def on_data(self, data):
        """"""
        self.__engine.debug('RECV: {}'.format(data))
        self.__engine.emit(data['type'], data)

    def core(self):
        """"""
        resp = make_response(send_file('../ui/index.html'))
        resp.set_cookie('id', '123')
        return resp
        # with open('ui/index.html', encoding='utf-8') as f:
        #     return f.read()

    def res(self, path):
        """"""
        # print(path)
        if os.path.exists('ui/'+path):
            resp = make_response(send_file('../ui/'+path))
            return resp
            # with open('front/'+path, 'r', encoding='utf-8') as f:
            #     return f.read()
        print('FILE NOT FOUND: {}'.format('ui/'+path))
        return 'PAGE NOT FOUND: {}'.format(path)

    def test(self, msg):
        """"""
        print(msg)

    def send(self, data):
        self.__engine.debug('SEND: {}'.format(data))
        self.__sio.emit('data', data)
