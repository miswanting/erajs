import json
import socket
import threading
import time
from typing import Any, Dict, Optional


class NetManager:
    def __init__(self) -> None:
        self.__debug = True
        self.__address: Any = ['127.0.0.1', 12020]
        self.__buf_size = 4
        self.__connection: Optional[socket.socket] = None
        self.__is_connected = False
        self.__state: Any = {
            'length': 0,
            'length_bytes': '',
            'content_bytes': b''
        }

    def connect(self):
        def connect_core():
            socket.create_connection((self.__address[0], self.__address[1]))
            with socket.create_connection((self.__address[0], self.__address[1])) as conn:
                self.__connection = conn
                self.__is_connected = True
                while True:
                    self.handle_recv_once(
                        self.__connection.recv(self.__buf_size))

        t = threading.Thread(target=connect_core)
        t.start()
        while not self.__is_connected:
            time.sleep(0.1)

    def handle_recv_once(self, buf: bytes):
        if self.__state['length'] == 0:
            for i, char in enumerate(buf):
                c = chr(char)
                if c == ':':
                    self.__state['length'] = int(self.__state['length_bytes'])
                    self.__state['length_bytes'] = ''
                    self.handle_recv_once(buf[i+1:])
                    return
                else:
                    self.__state['length_bytes'] += c
        elif len(self.__state['content_bytes']) + len(buf) < self.__state['length']:
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

    def send(self, data: Dict[str, Any]):
        if self.__connection:
            msg = json.dumps(data)
            print(f'Send: {msg}') if self.__debug else None
            content = msg.encode()
            b = str(len(content)).encode()+b':'+content
            self.__connection.sendall(b)

    def recv(self, msg: str):
        print(f'Recv: {msg}') if self.__debug else None

    def close(self):
        if self.__connection:
            self.__connection.close()


net = NetManager()
net.connect()
net.send({'b': 2})
net.send({'啊': 2})
