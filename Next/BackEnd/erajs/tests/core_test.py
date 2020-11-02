from threading import Thread
import erajs.core as c
import socket


def test_hash():
    hash = c.Tools.random_hash()
    assert type(hash) == str


def test_timestamp():
    ts = c.Tools.timestamp()
    assert len(ts.split('-')) == 3


def test_uuid():
    uuid = c.Tools.uuid()
    assert len(uuid.split('-')) == 4


e = c.Engine()


class TestNetManager:
    def test_net(self):
        self.__data = {}
        t = Thread(target=self.__setup_server)
        t.start()
        self.__connect()

    def __setup_server(self):
        self.__data['server'] = socket.create_server(('localhost', 11994))
        for conn, addr in self.__data['server'].accept():
            self.__data['server'].close()
            print(addr)
            return

    def __connect(self):
        e.connect()
        print('!')
