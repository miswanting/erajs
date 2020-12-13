from . import lib
import erajs.api as a
import sys
print(__name__)


def on_loaded():
    a.debug('123')
    lib.test()
    a.tmp('ui')['cover'] = ui_cover
    pass


def ui_cover():
    pass
