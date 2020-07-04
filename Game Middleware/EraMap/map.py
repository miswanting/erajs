import erajs.api as a


class Map:
    def __init__(self):
        super().__init__()
        self.__data = {
            root: None
            places: {}
        }

    def new_empty_place(self):
        new_empty_place = {
            name: '',
            id: '',
            data: {},
            parent: None,
            children: []
        }

    def register_place(self, place):
        pass


def random_hash():
    pass


if __name__ == "__main__":
    pass
else:
    if 'map' not in a.tmp():
        a.tmp()['map'] = Map()
