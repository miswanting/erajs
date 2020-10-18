from typing import List, Text


def read(file_path: Text):
    data = []
    with open(file_path, 'r') as f:
        for line in f.readlines():
            data.append(line[:-1])
    return data


def write(file_path: Text, data: List[Text]):
    with open(file_path, 'w') as f:
        for line in data:
            f.write('{}\n'.format(line))
