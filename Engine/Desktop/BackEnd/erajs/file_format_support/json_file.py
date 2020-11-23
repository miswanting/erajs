import json
from typing import Any, Text


def read(file_path: Text):
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.loads(''.join(f.readlines()))
    return data


def write(file_path: Text, data: Any):
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(json.dumps(data, ensure_ascii=False))
