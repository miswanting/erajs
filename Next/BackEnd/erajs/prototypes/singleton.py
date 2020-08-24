from typing import Dict, Tuple, Any


class Singleton:  # 单例模式原型
    _instance = None

    def __new__(cls, *args: Tuple[Any, ...], **kw: Dict[Any, Any]):
        if not cls._instance:
            cls._instance = super(Singleton, cls).__new__(cls, *args, **kw)
        return cls._instance
