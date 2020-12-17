from base64 import b64encode
from typing import List


def read(file_path: str):
    with open(file_path, 'rb') as f:
        return b64encode(f.read()).decode()


def write(file_path: str, data: List[str]):
    with open(file_path, 'wb') as f:
        for line in data:
            f.write('{}\n'.format(line))
