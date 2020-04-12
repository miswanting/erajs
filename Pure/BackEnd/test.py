import os
import sys

import erajs.api as a


def cover():
    a.page()
    a.h('封面')
    a.t()
    a.b('进入', aaa)


def aaa():
    a.page()
    a.h('封面')
    a.t()
    a.b('test', aaa)
    print(a.data)


if __name__ == "__main__":
    print(os.getcwd())
    a.init()
    print(os.getcwd())
    a.entry(cover)
    a.start()
