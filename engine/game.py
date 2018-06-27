# coding:utf-8
import os
import sys
import time
import json
import random
import socket
import hashlib
import threading

HOST = ''
PORT = 50012
conn = None
isConnected = False
break_type = 0
cmd_list = []
gui_tree = []
data = {}


def init():
    if getattr(sys, 'frozen', False):
        # frozen
        dir_ = os.path.dirname(sys.executable)
        gamepath = os.path.dirname(dir_)
    else:
        # unfrozen
        dir_ = os.path.dirname(os.path.realpath(__file__))
        gamepath = os.path.dirname(os.path.dirname(dir_))
    sys.path.append(gamepath)
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
                    try:
                        data = conn.recv(4096)
                    except expression as e:
                        pass
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
    elif package['type'] == 'cmd_return':
        for each in cmd_list:
            if package['value'] == each[0]:
                each[1](*each[2], **each[3])


def send(package):
    print("[DEBG]发送：", package)
    # conn.send(json.dumps(package, ensure_ascii=False,
    #                      sort_keys=True, indent=4).encode())
    conn.send(json.dumps(package, ensure_ascii=False,
                         sort_keys=True).encode())


def wait_for_break():
    global break_type
    while True:
        if break_type == 1:
            break_type = 0
            break
        elif break_type == 3:
            break


def p(text='', line=False, wait=False, align='left'):
    package = {
        'type': 'p',
        'value': text,
        'line': line,
        'align': align
    }
    send(package)
    if wait:
        wait_for_break()


def pcmd(text, func, *arg, **kw):
    cmd_list.append((text, func, arg, kw))
    package = {
        'type': 'pcmd',
        'value': text
    }
    send(package)


def plcmd(text, func, *arg, **kw):
    cmd_list.append((text, func, arg, kw))
    package = {
        'type': 'plcmd',
        'value': text
    }
    send(package)


def new_page():
    package = {
        'type': 'new_page'
    }
    send(package)


def goto(func, *arg, **kw):
    gui_tree.append((func, arg, kw))
    func(*arg, **kw)


def back():
    gui_tree.pop()
    repeat()


def repeat():
    gui_tree[-1][0](*gui_tree[-1][1], **gui_tree[-1][2])


def get_hash():
    m = hashlib.md5()
    m.update(str(random.random()).encode("utf-8"))
    return m.hexdigest().upper()
