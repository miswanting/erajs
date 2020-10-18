class DotPath:
    @staticmethod
    def path2dot(path: str):
        path = path.replace('/', '\\')
        pieces = path.split('.')
        dot = '.'.join('.'.join(pieces[0:-1]).split('\\'))
        ext = pieces[-1]
        return dot, ext

    @staticmethod
    def dot2path(dot: str, ext: str):
        return '{}.{}'.format(dot.replace('.', '\\'), ext)
