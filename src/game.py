# coding:utf-8
import time
import json
import socket
import threading

HOST = ''
PORT = 50012
conn = None
isConnected = False
break_type = 0
cmd_list = []


def init():
    global isConnected
    # 运行Server

    def server():
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.bind((HOST, PORT))
            s.listen(1)
            global conn
            conn, addr = s.accept()
            global isConnected
            isConnected = True
            with conn:
                print('[FINE]已连接上：', addr)
                while True:
                    data = conn.recv(4096)
                    if not data:
                        break
                    print("[DEBG]接收：", data)
                    package = json.loads(data.decode())
                    parsePackage(package)
                    # conn.send(data)
    t = threading.Thread(name='socket', target=server)
    t.start()
    while not isConnected:
        time.sleep(0.1)
    # 测试连接畅通度
    isConnected = False
    while not isConnected:
        package = {
            'type': 'test'
        }
        send(package)
        time.sleep(0.1)


def parsePackage(package):
    if package['type'] == 'test':
        global isConnected
        isConnected = True
    elif package['type'] == 'mouse_down':
        global break_type
        break_type = package['value']


def send(package):
    print("[DEBG]发送：", package)
    # conn.send(json.dumps(package, ensure_ascii=False,
    #                      sort_keys=True, indent=4).encode())
    conn.send(json.dumps(package, ensure_ascii=False,
                         sort_keys=True).encode())


def wait():
    global break_type
    while True:
        if break_type == 1:
            break_type = 0
            break
        elif break_type == 3:
            break


def p(text):
    package = {
        'type': 'p',
        'value': text
    }
    send(package)


def pl(text):
    package = {
        'type': 'pl',
        'value': text
    }
    send(package)


def pw(text):
    package = {
        'type': 'pw',
        'value': text
    }
    send(package)
    wait()


def plw(text):
    package = {
        'type': 'plw',
        'value': text
    }
    send(package)
    wait()


def pcmd(text, func):
    cmd_list.append((text, func))
    package = {
        'type': 'pcmd',
        'value': text
    }
    send(package)
