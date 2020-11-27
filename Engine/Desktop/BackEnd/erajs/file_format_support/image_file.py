import base64
from typing import Any, Dict, List, Optional, Text, Tuple


def read(file_path: str):
    """
    # 读取CSV文件
    ## 两种模式
    - list模式
    - dict模式 
    TODO: dict模式 
    """
    with open(file_path, 'rb') as f:
        data = base64.b64encode(f.read())
    return data.decode()
