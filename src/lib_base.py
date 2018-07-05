import os
import engine.game as g


def gui_save():
    g.new_page()
    g.h1('存档')
    save_list = g.show_save_file()
    display_list = []
    max = 0
    for each in save_list:
        pair = each[5:-5].split('.')
        pair = [int(pair[0]), pair[1], each[5:-5]]
        if pair[0] > max:
            max = pair[0]
        display_list.append(pair)
    save_list = display_list
    display_list = []
    for i in range(max+1):
        value = None
        for each in save_list:
            if each[0] == i:
                value = each[1:]
        display_list.append([i, value])
    for each in display_list:
        if not each[1] == None:
            g.cmd('{}.{}'.format(each[0], each[1][0]),
                  g.goto, gui_to_save, each[0])
        else:
            g.cmd('{}.{}'.format(each[0], '-'), g.goto, gui_to_save, each[0])
        g.p()
    g.cmd('创建新存档', g.goto, gui_new_save, max+1)
    g.p()
    g.cmd("返回", g.back)


def gui_load(success_func):
    g.new_page()
    g.h1('读档')
    save_list = g.show_save_file()
    display_list = []
    for each in save_list:
        pair = each[5:-5].split('.')
        pair = [int(pair[0]), pair[1], each[5:-5]]
        g.cmd('{}.{}'.format(pair[0], pair[1]),
              g.goto, gui_to_load, pair[0], success_func)
        g.p()
    g.cmd("返回", g.back)


def gui_new_save(order):
    def yes(*arg):
        name = '第{}{}'.format(g.src['time'].get_total(),
                              g.src['time'].get_time())
        g.save_save_file(order, name)
        g.back()
        g.back()

    def no(*arg):
        g.back()
    g.new_page()
    g.p('你将保存到存档{}'.format(order))
    g.p()
    g.p()
    yes_or_no(yes, no)


def gui_to_save(order):
    def yes(*arg):
        name = '第{}{}'.format(g.src['time'].get_total(),
                              g.src['time'].get_time())
        g.save_save_file(order, name)
        g.back()
        g.back()

    def no(*arg):
        g.back()
    g.new_page()
    g.p('你将保存到存档{}'.format(order))
    g.p()
    g.p()
    yes_or_no(yes, no)


def gui_to_load(order, success_func):
    def yes(*arg):
        g.load_save_file(order)
        g.gui_tree = [(arg[0], (), {})]
        g.repeat()

    def no(*arg):
        g.back()
    g.new_page()
    g.p('你将加载存档{}'.format(order))
    g.p()
    g.p()
    yes_or_no(yes, no, success_func)


def yes_or_no(yes_func, no_func, yes_arg=None, no_arg=None):
    g.p('确定吗？')
    g.cmd('是', yes_func, yes_arg)
    g.p('/')
    g.cmd('否', no_func, no_arg)
