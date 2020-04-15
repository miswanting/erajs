def read(file_path):
    data = []
    with open(file_path, 'r') as f:
        for line in f.readlines():
            data.append(line[:-1])
    return data


def write(file_path, data):
    with open(file_path, 'w') as f:
        for line in data:
            f.write('{}\n'.format(line))
