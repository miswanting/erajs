from typing import Callable

from . import mw as m


def init():
    m.init()


def entry(callback: Callable[[], None]):
    m.entry(callback)
