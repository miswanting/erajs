import os.path

format_priority = ['zip', 'json', 'yaml',
                   'cfg', 'config', 'csv', 'inf', 'ini', 'txt']


def find_derivation(file_path):
    candidate = []
    for each in format_priority:
        path = "{}.{}".format(file_path, format_priority)
        if os.path.isfile(path):
            candidate.append(path)
    return candidate


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
            if entry == '.'.join(rest_of_path_element[:sep]):
                print('直接找到文件')
            sep -= 1
            if sep == 0:
                break
        if len(entry) >= len(rest_of_path_element[0]):
            if entry[:len(rest_of_path_element[0])]:
                pass
    return candidate


dot_path = 'data.a.b.json'
path_element = dot_path.split('.')
if True:
    if path_element[-1] in format_priority:
        path = "{}.{}".format(
            '\\'.join(path_element[:-1]), path_element[-1])
        print(path)
    else:
        for ext in format_priority:
            path = "{}.{}".format('\\'.join(path_element), ext)
            if os.path.isfile(path):
                print(path)
dot_path = 'data.a.b'
path_element = dot_path.split('.')
if True:
    if path_element[-1] in format_priority:
        path = "{}.{}".format(
            '\\'.join(path_element[:-1]), path_element[-1])
        print(path)
    else:
        for ext in format_priority:
            path = "{}.{}".format('\\'.join(path_element), ext)
            if os.path.isfile(path):
                print(path)
# get_potential_candidate('.', path_element)
