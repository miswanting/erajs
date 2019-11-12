import csv


def read(file_path, mode='list'):
    """
    # 读取CSV文件
    ## 两种模式
    - list模式
    - dict模式 
    TODO: dict模式 
    """
    with open(file_path, 'r', newline='', encoding='utf-8') as f:
        reader = csv.reader(f)
        if mode == 'list':
            data = []
            for row in reader:
                data.append(row)
        elif mode == 'dict':
            data = {}
    return data


def write(file_path, data):
    if isinstance(data, list):
        with open(file_path, 'w', newline='', encoding='utf-8') as f:
            reader = csv.writer(f)
            reader.writerows(data)
    elif isinstance(data, dict):
        pass
