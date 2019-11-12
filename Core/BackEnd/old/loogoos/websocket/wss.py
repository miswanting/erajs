import socketio
from flask import Flask

sio = socketio.Server(async_mode='threading')
@sio.event
def connect(sid, environ):
    print('connect ', sid)


@sio.event
def disconnect(sid):
    print('disconnect ', sid)


@sio.event
def pkg(sid, data):
    # handle the message
    print("OK", sid, data)
    return "OK", sid, data


static_files = {
    '/': 'index.html'
}

if __name__ == '__main__':
    app = Flask(__name__)
    app.wsgi_app = socketio.WSGIApp(
        sio, app.wsgi_app, static_files=static_files)
    app.run(threaded=True)
