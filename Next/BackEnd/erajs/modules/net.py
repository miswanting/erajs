import json
import socket
import sys
import threading
import time
from typing import Any, Text

from . import event


class NetModule(event.EventModule):
    def __init__(self):
        super().__init__()
        self.__data = {
            'connected': False,
            'socket': None
        }

    def connect(self, host: Text = 'localhost', port: int = 11994):
        t = threading.Thread(
            target=self.__connector,
            args=(host, port)
        )
        t.start()
        o = 0
        while not self.__data['connected']:
            if o > 100:
                self.warn('Connect TimeOut!')
                break
            else:
                o += 1
            time.sleep(0.1)

    def send(self, data: Any):
        # self.debug('Send: '+str(data))
        s = json.dumps(data, ensure_ascii=False)
        s = str(len(s))+':'+s
        self.__data['socket'].sendall(s.encode())

    def recv(self, data: Any):
        # self.debug('Recv: '+str(data))
        data = json.loads(data)
        self.emit(data['type'], data)

    def __connector(self, host: Text, port: int):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            self.__data['socket'] = s
            try:
                self.__data['socket'].connect((host, port))
                self.__data['connected'] = True
                self.__core()
            except OSError as e:
                if e.errno == 10061:
                    self.warn('   └─ [!] Please Start FrontEnd First!')
                else:
                    self.warn(e)
                sys.exit(0)

    def __core(self):
        length = 0
        length_string = ''
        last_binary = ''
        next_binary = ''
        while True:
            raw_data: bytes = self.__data['socket'].recv(1024)
            if not raw_data:
                self.warn('Recv None Data!')
            else:
                if length == 0:
                    for i, char in enumerate(raw_data):
                        if char == ':':
                            length = int(length_string.decode())
                            length_string = ''
                            next_binary += raw_data[i+1:]
                            break
                        else:
                            length_string += char
                else:
                    next_binary += raw_data
                if len(next_binary) >= length:
                    self.recv(last_binary+next_binary[0:length])
                    length = 0
                    last_binary = ''
                    next_binary = next_binary[length:]
                else:
                    last_binary += next_binary
                    length -= len(next_binary)
