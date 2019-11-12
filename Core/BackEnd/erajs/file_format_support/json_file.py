import json


def read(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.loads(''.join(f.readlines()))
    return data


def write(file_path, data):
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(json.dumps(data, ensure_ascii=False))
