import csv
from typing import Any, Dict, List, Literal, Optional, Text, Tuple


def read(file_path: Text, mode: Literal['list', 'dict'] = 'list'):
    """
    # 读取CSV文件
    ## 两种模式
    - list模式
    - dict模式 
    TODO: dict模式 
    """
    with open(file_path, 'r', newline='', encoding='utf-8') as f:
        reader = csv.reader(f)
        data: Optional[Tuple[List[List[Text]], Dict[Text, Any]]] = None
        if mode == 'list':
            data = []
            for row in reader:
                data.append(row)
        elif mode == 'dict':
            data = {}
    return data


def write(file_path: Text, data: Tuple[List[List[Text]], Dict[Text, Any]]):
    if isinstance(data, list):
        with open(file_path, 'w', newline='', encoding='utf-8') as f:
            reader = csv.writer(f)
            reader.writerows(data)
    elif isinstance(data, dict):
        pass
