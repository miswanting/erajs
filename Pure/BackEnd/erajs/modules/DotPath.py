import os.path

format_priority = ['zip', 'json', 'yaml',
                   'cfg', 'config', 'csv', 'inf', 'ini', 'txt']


def path2dot(path):
    """
    # 将路径转换为点路径
    # """
    path = path.replace('/', '\\')
    dot_path = '.'.join('.'.join(path.split('.')[0:-1]).split('\\'))
    ext = path.split('.')[-1]
    return dot_path, ext


def dot2path(dot_path):
    """
    # 将点路径转换为路径
        若同一个位置存在同名但不同格式的数据文件，
        会只返回优先级高的路径，
    # 文件格式优先级
    （按优先级从高到低排序）
    1. ZIP
    2. JSON
    3. YAML
    4. CFG
    5. CONFIG
    6. CSV
    7. INF
    8. INI
    9. TXT
    ```python
    data.a = data/a.zip
    ```
    """
    path = find_path_by_priority(dot_path)
    return path


def find_path_by_priority(dot_path, simple=True):
    """
    #
    path_item_list是指dot_path以"."分隔之后的列表
    是path元素打散之后的标记
    find_file_by_priority('data.a.b.json') =>
    1. data/a/b.json
    1. data/a.b.json
    1. data.a.b.json
    1. data/a/b/json.yaml...
    2. data/a/b.json
    2. data/a/b.json
    3. data/a.b.json
    4. data.a.b.json
    find_file_by_priority('data.a.b.json') =>
    FOR DEV:
    ```raw
    ____________________
         -3  -2   -1
     0    1   2    3   4
    ↓ ↓  ↓ ↓ ↓↓ ↓   ↓ ↓
    data . a . b . json
             ↑   ↑
    sep:     1   2
         ↑     ↑    ↑
        dir  name  ext
    ____________________
    ```
    TODO: FindItAll
    """
    path_element = dot_path.split('.')
    if simple:
        if path_element[-1] in format_priority:  # 直接找
            path = "{}.{}".format(
                '\\'.join(path_element[:-1]), path_element[-1])
            return path
        else:  # 否则找衍生物
            for ext in format_priority:
                path = "{}.{}".format('\\'.join(path_element), ext)
                if os.path.isfile(path):
                    return path

    def get_potential_candidate(current_path, rest_of_path_element):
        """
        data.a.b.json =>
        data.a/b.json
        data/a/b/json.yaml...
        data.a.b.json.yaml...
        data.a.b.json
        """
        entries = os.listdir(current_path)
        candidate = []
        for entry in entries:
            sep = len(rest_of_path_element)
            while True:
                if entry == rest_of_path_element[: sep]:
                    pass
            if len(entry) >= len(rest_of_path_element[0]):
                if entry[: len(rest_of_path_element[0])]:
                    pass
        return candidate
    get_potential_candidate('.', path_element)
    # 如果最后一位是EXT，精确模式来一发
    if path_element[-1] in format_priority:
        sep1 = len(path_element)-2
        sep2 = len(path_element)-1
        while True:
            path = "{}\\{}.{}".format(path_element[: -1], path_element[: -1])
    if os.path.exists():
        pass
    return


def __fund():
    pass


class DotPath:
    def __init__(self, dot_path):
        pass

    def parse_path(self, path):
        pass
