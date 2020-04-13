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
    a.debug(a.data)


if __name__ == "__main__":
    a.init()
    a.entry(cover)
    a.start()
