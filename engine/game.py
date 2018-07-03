# coding:utf-8
import os
import csv
import sys
import time
import json
import random
import socket
import hashlib
import graphene
import threading
import configparser

HOST = ''
PORT = 50012
conn = None
isConnected = False
break_type = 0
cmd_list = []
gui_tree = []
data = {}
error = None


def init():
    _fix_path()
    _load_data()
    _start_client()
    _run_server()


def _fix_path():
    if getattr(sys, 'frozen', False):
        # frozen
        dir_ = os.path.dirname(sys.executable)
        gamepath = os.path.dirname(dir_)
    else:
        # unfrozen
        dir_ = os.path.dirname(os.path.realpath(__file__))
        gamepath = os.path.dirname(os.path.dirname(dir_))
    sys.path.append(gamepath)


def _load_data():
    # 支持json、csv、cfg/config/ini
    global data
    for root, dirs, files in os.walk('data'):
        for file in files:
            if len(root) == 4:
                key = file.split('.')[0]
            else:
                key = root[5:].replace('\\', '.')
                key += '.' + file.split('.')[0]
            ext = file.split('.')[1]
            # 载入文件
            if ext in ['cfg', 'ini', 'config']:
                config = configparser.ConfigParser()
                config.read(root+'\\'+file)
                d = dict(config._sections)
                for k in d:
                    d[k] = dict(d[k])
                data[key] = d
            elif ext == 'csv':
                with open(root+'\\'+file, newline='', encoding='utf-8') as f:
                    reader = csv.reader(f)
                    new_list = []
                    for row in reader:
                        new_list.append(row)
                    data[key] = new_list
            elif ext == 'json':
                with open(root+'\\'+file, 'r', encoding='utf-8') as f:
                    data[key] = json.loads(''.join(f.readlines()))


def _run_server():
    # 运行Server
    global isConnected

    def server():
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            try:
                s.bind((HOST, PORT))
                s.listen(1)
                print('[FINE]服务器地址：{}:{}'.format(HOST, PORT))
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
                        data = data.decode().split('}{')
                        for i in range(len(data)):
                            if not i == 0:
                                data[i] = '}' + data[i]
                            if not i == len(data) - 1:
                                data[i] = data[i] + '}'
                        for each in data:
                            package = json.loads(each)
                            if package['type'] == 'close_window':
                                print("[DEBG]客户端关闭！")
                                break
                            _parse_package(package)
            except OSError as e:
                if e.errno == 10048:
                    global error
                    error = 10048
                    exit()
                    # return

    t = threading.Thread(name='socket', target=server)
    t.start()
    while not isConnected:
        time.sleep(0.1)
        if error == 10048:
            break
    # 测试连接畅通度
    isConnected = False
    while not isConnected:
        # if error == 10048:
        #     break
        package = {
            'type': 'test'
        }
        _send(package)
        time.sleep(0.1)


def _start_client():
    os.system('start client.bat')


def _parse_package(package):
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


def _send(package):
    print("[DEBG]发送：", package)
    # conn.send(json.dumps(package, ensure_ascii=False,
    #                      sort_keys=True, indent=4).encode())
    conn.send(json.dumps(package, ensure_ascii=False,
                         sort_keys=True).encode())


def _wait_for_break():
    global break_type
    while True:
        if break_type == 1:
            break_type = 0
            break
        elif break_type == 3:
            break


def p(text='', isolate=False, wait=False):
    package = {
        'type': 'p',
        'value': text,
        'isolate': isolate
    }
    _send(package)
    if wait:
        _wait_for_break()


def cmd(text, func,  *arg, line=False, **kw):
    cmd_list.append((text, func, arg, kw))
    package = {
        'type': 'cmd',
        'value': text,
        'line': line
    }
    _send(package)


def h1(text):
    package = {
        'type': 'h1',
        'value': text
    }
    _send(package)


def progress(now, max=100, length=100):
    package = {
        'type': 'progress',
        'now': now,
        'max': max,
        'length': length
    }
    _send(package)


def mode(name='plain', *arg, **kw):
    package = {
        'type': 'mode',
        'value': [name, *arg]
    }
    _send(package)


def new_page():
    package = {
        'type': 'new_page'
    }
    _send(package)
    cmd_list.clear()


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


class Query(graphene.ObjectType):
    hello = graphene.String(name=graphene.String(default_value="stranger"))

    def resolve_hello(self, info, name):
        return 'Hello ' + name


gql = graphene.Schema(Query)
