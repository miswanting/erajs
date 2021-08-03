from erajs import api as a


def test():
    print('NEW')


if __name__ == '__main__':
    a.init()
    a.entry(test)
