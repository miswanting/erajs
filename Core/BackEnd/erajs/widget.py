from . import engine as e


class Widget:
    def __init__(self):
        self.data = {
            'hash': e.new_hash(),
            'child': []
        }


class Button(Widget):
    def __init__(self, data):
        super()
        self.data['type'] = 'button'


class Link(Widget):
    def __init__(self, data):
        super()
        self.data['type'] = 'link'


class Popup(Widget):
    def __init__(self, data):
        super()
        self.data['type'] = 'popup'
