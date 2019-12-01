import erajs.API as a


def cover():
    a.t('test')


if __name__ == "__main__":
    a.init()
    a.entry(cover)
    a.run()
