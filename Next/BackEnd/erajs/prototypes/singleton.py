from typing import Any, Dict, List, Optional


class Singleton:
    """
    # 单例模式原型
    """
    __instance: Optional['Singleton'] = None

    def __new__(
        cls,
        *args: List[Any],
        **kwargs: Dict[Any, Any]
    ) -> Optional['Singleton']:
        if not cls.__instance:
            cls.__instance = super(Singleton, cls).__new__(
                cls, *args, **kwargs
            )
        return cls.__instance
