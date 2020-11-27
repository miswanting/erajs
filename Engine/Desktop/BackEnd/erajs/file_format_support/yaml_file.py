from typing import Any, Text

import yaml


def read(file_path: Text):
    with open(file_path, 'r', encoding='utf-8') as f:
        data = yaml.load(''.join(f.readlines()), Loader=yaml.SafeLoader)
    return data


def write(file_path: Text, data: Any):
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(
            yaml.dump(
                data,
                allow_unicode=True,
                default_flow_style=False
            )
        )
