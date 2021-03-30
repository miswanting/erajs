from multiprocessing import Process, Queue
from socket import create_connection
from typing import Any, Dict


def core(sq, rq):
    with create_connection((host, port)) as conn:
        self.__connection = conn
        self.__is_connected = True
        while True:
            self.handle_recv_once(
                self.__connection.recv(self.__buf_size))
    print(sq, rq)


class NetManager:
    def __init__(self) -> None:
        self.__debug = False
        self.__buf_size = 4096
        self.__connection: Optional[socket.socket] = None
        self.__is_connected = False
        self.__state: Any = {
            'length': 0,
            'length_bytes': '',
            'content_bytes': b''
        }

    def connect(self, host: str = 'localhost', port: int = 11994):
        sendQ = Queue()
        recvQ = Queue()
        p = Process(target=core, args=(sendQ, recvQ,))
        p.start()
        p.join()

    def handle_recv_once(self, buf: bytes):
        pass

    def send(self, data: Any):
        pass

    def recv(self, msg: str):
        pass


if __name__ == '__main__':
    net = NetManager()
    net.connect()
