import json
import zipfile
from typing import Any, Text

"""
# SAVE文件格式

## 文件名规范
[yymmddhhmmss]-[des]-[4hash].sav

## 文件格式
`*.sav`文件格式为标准的zip文件；

## 文件内部结构
root/
    manifest.json
    data.json
    bin/
        *.bin

## `manifest.json`值为
timestamp
"""


def read(file_path: Text):
    with zipfile.ZipFile(file_path) as z:
        data = {}
        for file_name in z.namelist():
            with z.open(file_name) as f:
                data[
                    '.'.join(file_name.split('.')[0:-1])
                ] = json.loads(f.read())
    return data


def write(file_path: Text, data: Any):
    with zipfile.ZipFile(file_path, 'w', zipfile.ZIP_LZMA) as z:
        for key in data:
            z.writestr(
                '{}.json'.format(key),
                json.dumps(
                    data[key], ensure_ascii=False
                )
            )
