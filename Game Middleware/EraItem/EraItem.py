import erajs.api as a


class ItemManager:
    def __init__(self):
        super().__init__()
        print(a.version)


if __name__ == "__main__":
    pass
else:
    if 'im' in a.dat():
        pass
    else:
        a.dat()['im'] = ItemManager()
