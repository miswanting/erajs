from typing import Callable

from .engine import Engine

e = Engine()


def init():
    e.start()


def entry(callback: Callable[[], None]):
    e.set_entry(callback)
