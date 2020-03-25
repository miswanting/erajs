import erajs.api as a


def cover():
    a.page()
    a.t('test')


if __name__ == "__main__":
    a.init()
    a.entry(cover)
    a.start()
