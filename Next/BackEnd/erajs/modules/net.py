import json
import os
import socket
import threading
import time

from . import debug, event


class NetModule(event.EventModule):
    def __init__(self):
        super().__init__()
        self.isConnected = False
        self.s = None  # socket

    def connect(self, host='localhost', port=11994):
        t = threading.Thread(
            None,
            self.connector,
            'connector',
            (host, port)
        )
        t.start()
        while not self.isConnected:
            time.sleep(0.1)

    def send(self, data):
        self.debug(data)
        self.s.send(json.dumps(data, ensure_ascii=False).encode())

    def recv(self, data):
        self.debug(data)
        self.emit(data['type'], data)

    def connector(self, host, port):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            self.s = s
            try:
                # self.s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                self.s.connect((host, port))
                self.isConnected = True
                self.core()
            except OSError as err:
                if err.errno == 10061:
                    self.warn('   └─ [!] Please Start FrontEnd!')
                else:
                    self.warn(err)
                os._exit(1)

    def core(self):
        while True:
            data = self.s.recv(4096000)
            if not data:
                self.warn('Recieve None Data!')
            data = data.decode().split('}{')
            for i in range(len(data)):
                if not i == 0:
                    data[i] = '}' + data[i]
                if not i == len(data) - 1:
                    data[i] = data[i] + '}'
            for i, each in enumerate(data):
                if each != '':
                    data[i] = json.loads(each)
            for each in data:
                self.recv(each)
