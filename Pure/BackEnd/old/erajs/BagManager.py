
class BagManager:
    _cmd_list = []
    _gui_list = []

    # def _parse_bag(self, bag):
    #     def parse(bag):
    #         if bag['type'] == 'MOUSE_CLICK':
    #             if bag['value'] == 1:  # 左键
    #                 if self.is_locked:
    #                     self.unlock()
    #             elif bag['value'] == 3:  # 右键
    #                 if self.is_locked:
    #                     self.unlock_forever()
    #         elif bag['type'] == 'BUTTON_CLICK':
    #             for each in self._cmd_list:
    #                 if bag['hash'] == each[0]:
    #                     each[1](*each[2], **each[3])
    #         elif bag['type'] == 'RATE_CLICK':
    #             for each in self._cmd_list:
    #                 if bag['hash'] == each[0]:
    #                     each[1](bag['value'])
    #         elif bag['type'] == 'RADIO_CLICK':
    #             for each in self._cmd_list:
    #                 if bag['hash'] == each[0]:
    #                     each[1](bag['value'])
    #         elif bag['type'] == 'INPUT_CHANGE':
    #             for each in self._cmd_list:
    #                 if bag['hash'] == each[0]:
    #                     each[1](bag['value'])
    #         elif bag['type'] == 'DROPDOWN_CHANGE':
    #             for each in self._cmd_list:
    #                 if bag['hash'] == each[0]:
    #                     each[1](bag['value'])
    #         elif bag['type'] == 'CMD':
    #             def result(data):
    #                 bag = {
    #                     'type': 'result',
    #                     'value': data,
    #                     'from': 'b',
    #                     'to': 'r'
    #                 }
    #                 self.send(bag)
    #             cmd = bag['value']
    #             if cmd[0] == 'fix':
    #                 result('OK!')
    #         else:
    #             for each in self._cmd_list:
    #                 if bag['hash'] == each[0]:
    #                     each[1](bag['value'])

    #     t = threading.Thread(target=parse, args=(bag, ))
    #     t.start()

    def title(self, text):
        bag = {
            'type': 'title',
            'value': str(text),
            'from': 'b',
            'to': 'r'
        }
        self.send(bag)

    def t(self, text='', wait=False, color='default', bcolor='default'):
        bag = {
            'type': 't',
            'value': {
                'text': str(text),
                'color': color,
                'bcolor': bcolor
            },
            'from': 'b',
            'to': 'r'
        }
        self.send(bag)
        if wait and not self.lock_passed():
            self.lock()
            self.wait_for_unlock()

    def b(self, text, func=None, *arg, **kw):
        hash = new_hash()
        bag = {
            'type': 'b',
            'value': {
                'text': str(text),
                'hash': hash
            },
            'from': 'b',
            'to': 'r'
        }
        bag['value']['disabled'] = False
        if 'disabled' in kw.keys():
            if kw['disabled']:
                bag['value']['disabled'] = True
            kw.pop('disabled')
        if func == None:
            bag['value']['disabled'] = True
        if 'isLink' in kw.keys():
            if kw['isLink']:
                bag['value']['isLink'] = True
            kw.pop('isLink')
        if 'popup' in kw.keys():
            bag['value']['popup'] = str(kw['popup'])
            kw.pop('popup')
        else:
            bag['value']['popup'] = ''
        if 'color' in kw.keys():
            bag['value']['color'] = kw['color']
            kw.pop('color')
        else:
            bag['value']['color'] = ''

        def handle_callback(e):
            if e['target'] == hash:
                func(*arg, **kw)
        self.add_listener('BUTTON_CLICK', handle_callback, hash)
        # self._cmd_list.append((hash, func, arg, kw))
        self.send(bag)
        self.unlock()

    def h(self, text, rank=1, color='default', bcolor='default'):
        bag = {
            'type': 'h',
            'value': {
                'text': str(text),
                'rank': rank,
                'color': color,
                'bcolor': bcolor
            },
            'from': 'b',
            'to': 'r'
        }
        self.send(bag)

    def progress(self, now,  max=100, length=100):
        bag = {
            'type': 'progress',
            'value': {
                'now': now,
                'max': max,
                'length': length
            },
            'from': 'b',
            'to': 'r'
        }
        self.send(bag)

    def rate(self, now=0,  max=5, func=None, disabled=True):
        hash = new_hash()

        def handle_callback(e):
            if e['target'] == hash:
                func(e['value'])
        self.add_listener('RATE_CLICK', handle_callback, hash)
        # self._cmd_list.append((hash, func))
        bag = {
            'type': 'rate',
            'value': {
                'now': now,
                'max': max,
                'hash': hash,
                'disabled': disabled
            },
            'from': 'b',
            'to': 'r'
        }
        self.send(bag)

    def check(self, text='', func=None, *arg, **kw):
        def handle_callback(e):
            if e['target'] == hash:
                func(e['value'])
        hash = new_hash()
        self.add_listener('CHECK_CHANGE', handle_callback, hash)
        bag = {
            'type': 'check',
            'value': {
                'text': str(text),
                'hash': hash
            },
            'from': 'b',
            'to': 'r'
        }
        if 'disabled' in kw.keys():
            if kw['disabled']:
                bag['value']['disabled'] = True
            kw.pop('disabled')
        if func == None:
            bag['value']['disabled'] = True
        if 'default' in kw.keys():
            bag['value']['default'] = kw['default']
            kw.pop('default')
        if 'read_only' in kw.keys():
            bag['value']['read_only'] = kw['read_only']
            kw.pop('read_only')
        self.send(bag)

    def radio(self, choice_list, func=None, default_index=0):
        hash = new_hash()

        def handle_callback(e):
            if e['target'] == hash:
                func(e['value'])
        self.add_listener('RADIO_CLICK', handle_callback, hash)
        # self._cmd_list.append((hash, func))
        bag = {
            'type': 'radio',
            'value': {
                'list': choice_list,
                'default': default_index,
                'hash': hash
            },
            'from': 'b',
            'to': 'r'
        }
        self.send(bag)

    def input(self, func=None, default='', is_area=False, placeholder=''):
        hash = new_hash()

        def handle_callback(e):
            if e['target'] == hash:
                func(e['value'])
        self.add_listener('INPUT_CHANGE', handle_callback, hash)
        # self._cmd_list.append((hash, func))
        bag = {
            'type': 'input',
            'value': {
                'hash': hash,
                'default': str(default),
                'is_area': is_area,
                'placehoder': str(placeholder)
            },
            'from': 'b',
            'to': 'r'
        }
        self.send(bag)

    def dropdown(self, options, func=None, default=None,  search=False, multiple=False, placeholder='', allowAdditions=False):
        hash = new_hash()

        def handle_callback(e):
            if e['target'] == hash:
                func(e['value'])
        self.add_listener('DROPDOWN_CHANGE', handle_callback, hash)
        # self._cmd_list.append((hash, func))
        new_options = []
        for each in options:
            new_options.append({
                'value': each,
                'text': each
            })
        bag = {
            'type': 'dropdown',
            'value': {
                'hash': hash,
                'options': new_options,
                'default': default,
                'search': search,
                'multiple': multiple,
                'placeholder': str(placeholder),
                'allowAdditions': allowAdditions
            },
            'from': 'b',
            'to': 'r'
        }
        self.send(bag)

    def divider(self, text=''):
        bag = {
            'type': 'divider',
            'value': str(text),
            'from': 'b',
            'to': 'r'
        }
        self.send(bag)

    def chart(self, chart_type, data, width=200, height=200):
        hash = new_hash()
        bag = {
            'type': 'chart',
            'value': {
                'type': chart_type,
                'data': data,
                'hash': hash,
                'width': width,
                'height': height
            },
            'from': 'b',
            'to': 'r'
        }
        self.send(bag)

    def page(self, color='default'):
        bag = {
            'type': 'page',
            'value': {
                'color': color
            },
            'from': 'b',
            'to': 'r'
        }
        self.send(bag)
        self.remove_all_listeners()
        self.mode()

    def clear(self, num=0):
        bag = {'type': 'clear',
               'value': {
                   'num': num
               },
               'from': 'b',
               'to': 'r'}
        self.send(bag)

    def goto(self, func, *arg, **kw):
        self.debug('GOTO: Append [{}] to [{}] & run'.format(
            func.__name__, self._show_gui_list()))
        self._gui_list.append((func, arg, kw))  # append_gui
        func(*arg, **kw)

    def back(self, num=1, *arg, **kw):
        for i in range(num):
            self.debug('BACK: Pop [{}] from [{}]'.format(
                self._gui_list[-1][0].__name__, self._show_gui_list()))
            self._gui_list.pop()
        self.debug('BACK: & run last')
        self._gui_list[-1][0](*self._gui_list[-1][1], **
                              self._gui_list[-1][2])  # repeat

    def repeat(self, *arg, **kw):
        self.debug('REPEAT: Run [{}] in [{}]'.format(
            self._gui_list[-1][0].__name__, self._show_gui_list()))
        self._gui_list[-1][0](*self._gui_list[-1][1], **self._gui_list[-1][2])

    def append_gui(self, func, *arg, **kw):
        self.debug('APPEND: Append [{}] to [{}]'.format(
            func.__name__, self._show_gui_list()))
        self._gui_list.append((func, arg, kw))

    def clear_gui(self, num=0):
        if num == 0:
            self.debug('CLEAR_ALL_GUI: Set [{}] to []'.format(
                self._show_gui_list()))
            self._gui_list.clear()
        else:
            for i in range(num):
                self.debug('CLEAR_LAST_GUI: Pop [{}] from [{}]'.format(
                    self._gui_list[-1][0].__name__, self._show_gui_list()))
                self._gui_list.pop()

    def get_gui_list(self):
        gui_list = []
        for each in self._gui_list:
            gui_list.append(each[0].__name__)
        return gui_list

    def exit(self, save=False):
        bag = {'type': 'exit',
               'value': {
                   'save': save
               },
               'from': 'b',
               'to': 'r'
               }
        self.send(bag)

    def shake(self, duration=500):
        bag = {'type': 'shake',
               'value': {
                   'duration': duration
               },
               'from': 'b',
               'to': 'r'
               }
        self.send(bag)

    def mode(self, type='default', *arg, **kw):
        bag = {'type': 'mode',
               'value': {
                   'mode': type
               },
               'from': 'b',
               'to': 'r'
               }
        if type == 'grid':
            bag['value']['celled'] = False
            bag['value']['compact'] = False
            if 'column' in kw:
                bag['value']['column'] == kw['column']
            if len(arg) == 1:
                bag['value']['column'] = arg[0]
            if 'celled'in kw:
                bag['value']['celled'] = kw['celled']
            if 'compact'in kw:
                bag['value']['compact'] = kw['compact']
        self.send(bag)

    def generate_map(self):
        bag = {'type': 'generate_map',
               'value': {},
               'from': 'b',
               'to': 'r'
               }
        self.send(bag)

    def _show_gui_list(self):
        gui_list = []
        for each in self._gui_list:
            gui_list.append(each[0].__name__)
        return ' → '.join(gui_list)
