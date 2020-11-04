import json
import socket
import sys
import threading
import time
from typing import Any, Dict, Optional, Text

from . import event


class NetModule(event.EventModule):
    def __init__(self):
        super().__init__()
        self.__debug = True
        self.__buf_size = 4
        self.__connection: Optional[socket.socket] = None
        self.__is_connected = False
        self.__state: Any = {
            'length': 0,
            'length_string': '',
            'content_bytes': b''
        }

    def connect(self, host: str = '127.0.0.1', port: int = 12020):
        def connect_core(host: str = '127.0.0.1', port: int = 12020):
            with socket.create_connection((host, port)) as conn:
                self.__connection = conn
                self.__is_connected = True
                while True:
                    self.handle_recv_once(
                        self.__connection.recv(self.__buf_size)
                    )
        t = threading.Thread(
            target=connect_core,
            args=(host, port)
        )
        t.start()
        o = 0
        while not self.__is_connected:
            if o > 100:
                self.warn('Connect TimeOut!')
                break
            o += 1
            time.sleep(0.1)

    def handle_recv_once(self, buf: bytes):
        if self.__state['length'] == 0:
            for i, char in enumerate(buf):
                if char == b':':
                    self.__state['length'] = int(self.__state['length_bytes'])
                    self.__state['length_bytes'] = ''
                    self.handle_recv_once(buf[i+1:])
                    return
                else:
                    self.__state['length_bytes'] += char
        elif len(self.__state['content_bytes']) + self.__buf_size < self.__state['length']:
            self.__state['content_bytes'] += buf
        else:
            index = self.__state['length'] - len(self.__state['content_bytes'])
            self.__state['content_bytes'] += buf[0:index]
            s = self.__state['content_bytes'].decode()
            self.recv(s)
            self.__state['length'] = 0
            self.__state['content_bytes'] = b''
            self.handle_recv_once(buf[index:])
            return

    def send(self, data: Any):
        if self.__connection:
            s = json.dumps(data, ensure_ascii=False, separators=(',', ':'))
            print(f'Send: {s}') if self.__debug else None
            content = s.encode()
            b = str(len(content)).encode()+b':'+content
            self.__connection.sendall(b)

    def recv(self, msg: str):
        print(f'Recv: {msg}') if self.__debug else None
        data = json.loads(msg)
        self.emit(data['type'], data)
