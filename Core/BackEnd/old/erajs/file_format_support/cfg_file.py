import configparser


def read(file_path):
    config = configparser.ConfigParser()
    config.read(file_path)
    data = dict(config._sections)
    for key in data:
        data[key] = dict(data[key])
    return data


def write(file_path, data):
    config = configparser.ConfigParser()
    config.read_dict(data)
    with open(file_path, 'w') as f:
        config.write(f)
