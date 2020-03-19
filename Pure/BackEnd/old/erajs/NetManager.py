import json
import os
import socket
import threading
import time

from . import EventManager, LogManager

# import LogManager

logger = LogManager.logger
dispatcher = EventManager.EventDispatcher()
event_type = EventManager.EventType


class NetManager:
    HOST = 'localhost'
    PORT = 11994
    _conn = None
    _cmd_list = []
    _gui_list = []
    isConnected = False

    def __init__(self):
        self.log = LogManager.LogManager()

        def handle_plugin_load_finished(e):
            self.connect()

        def handle_server_connected(e):
            self.send_config()

        listener_factory = [
            (
                event_type.PLUGIN_LOAD_FINISHED,
                handle_plugin_load_finished,
                True,
            ),
            (
                event_type.SERVER_CONNECTED,
                handle_server_connected,
                True,
            ),
        ]
        for each in listener_factory:
            dispatcher.add_listener(
                each[0],
                each[1],
                one_time=each[2],
            )

    def _parse_bag(self, bag):
        target = ''
        value = {}
        if 'hash' in bag:
            target = bag['hash']
        if 'value' in bag:
            value = bag['value']
        self.dispatch_event(bag['type'], target, value)

    def connect(self):
        def core():
            while True:
                data = self.recv()
                for each in data:
                    self._parse_bag(each)

        def func_connect():
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as c:
                self._conn = c
                try:
                    self._conn.connect((self.HOST, self.PORT))
                    self.isConnected = True
                    self.log.info('│  └─ Connected!')
                    core()
                except OSError as err:
                    if err.errno == 10061:
                        self.log.warn('前端未启动！')
                        os._exit(1)
                    else:
                        self.log.error(err)

        t = threading.Thread(name='func_connect', target=func_connect)
        t.start()
        while True:
            if self.isConnected:
                break
            time.sleep(0.1)
        dispatcher.dispatch(event_type.SERVER_CONNECTED)

    def send_config(self):
        bag = {
            'type': 'init',
            'value': {
                'resolution': (800, 600)},
            'from': 'b',
            'to': 'm'
        }
        self.send(bag)
        dispatcher.dispatch(event_type.SERVER_CONFIG_SENT)

    def send_loaded(self):
        bag = {
            'type': 'loaded',
            'from': 'b',
            'to': 'r'
        }
        self.send(bag)

    def send(self, bag):
        # self.debug("发送：{}".format(bag))
        self._conn.send(json.dumps(bag, ensure_ascii=False).encode())

    def recv(self):
        data = self._conn.recv(4096000)
        # self.debug("接收：{}".format(data))
        if not data:
            return
        data = data.decode().split('}{')
        for i in range(len(data)):
            if not i == 0:
                data[i] = '}' + data[i]
            if not i == len(data) - 1:
                data[i] = data[i] + '}'
        for i, each in enumerate(data):
            data[i] = json.loads(each)
        return data
