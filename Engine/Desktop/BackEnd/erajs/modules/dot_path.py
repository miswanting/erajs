from typing import Literal, Optional, Tuple

Path = str
DPath = str
Extension = str
Scope = Literal['cfg', 'dat', 'sav']
SCOPE_MAP = {
    'config': 'cfg',
    'data': 'dat',
    'save': 'sav',
    'res': 'res',
    'mods': 'mod'
}


class DotPath:
    @staticmethod
    def path2dot(path: Path) -> Tuple[DPath, Extension]:
        path = path.replace('/', '\\')
        pieces = path.split('.')
        dot = '.'.join('.'.join(pieces[0:-1]).split('\\'))
        ext = pieces[-1]
        return dot, ext

    @staticmethod
    def dot2path(path: DPath, ext: Extension):
        return '{}.{}'.format(path.replace('.', '\\'), ext)

    @staticmethod
    def P2GDP(path: Path, mod_id: Optional[str] = None):
        path = path.replace('/', '\\')
        pieces = path.split('.')
        pieces[0] = SCOPE_MAP[pieces[0]]
        if pieces[0] == 'mod' and mod_id is not None:
            pieces[1] = mod_id
        dot = '.'.join('.'.join(pieces[0:-1]).split('\\'))
        ext = pieces[-1]
        return dot, ext
