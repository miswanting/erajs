import erajs.api as a


def cover():
    a.page()
    a.h('test')
    a.t()
    a.t('test')
    a.b('test', aaa)
    a.l('test')


def aaa():
    a.page()
    a.b('test', aaa)


if __name__ == "__main__":
    a.init()
    a.entry(cover)
    a.start()
