import configparser
from typing import Any, Dict, Text


def read(file_path: Text) -> Dict[Text, Any]:
    config = configparser.ConfigParser()
    config.read(file_path)
    data: Dict[Text, Any] = dict(config._sections)
    for key in data:
        data[key] = dict(data[key])
    return data


def write(file_path: Text, data: Dict[Text, Any]):
    config = configparser.ConfigParser()
    config.read_dict(data)
    with open(file_path, 'w') as f:
        config.write(f)
