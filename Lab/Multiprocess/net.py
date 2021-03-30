# pyright: reportMissingTypeStubs=true
from multiprocessing import Process
from socket import socket


def a(x):
    pass


class NetManager:
    def __init__(self):
        self.__debug = False
        self.__buf_size = 4096
        self.__connection = None
        self.__is_connected = False
        self.__state = {
            'length': 0,
            'length_bytes': '',
            'content_bytes': b''
        }

    def connect(self, host='localhost', port=11994):
        def core():
            with socket.create_connection((host, port)) as conn:
                self.__connection = conn
                self.__is_connected = True
                while True:
                    self.handle_recv_once(
                        self.__connection.recv(self.__buf_size))
        p = Process(target=core)
        p.start()
        p.join()
        # t = threading.Thread(target=core)
        # t.start()
        o = 0
        while not self.__is_connected:
            if o > 50:
                self.warn('├<<┴─ Connection TimeOut & Failed!')
                return False
            else:
                o += 1
            time.sleep(0.1)
        return True

    def handle_recv_once(self, buf):
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

    def send(self, data):
        pass

    def recv(self, msg):
        pass


if __name__ == '__main__':
    n = NetManager()
    n.connect()
