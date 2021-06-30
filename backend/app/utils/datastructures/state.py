from typing import Optional, Any

from fastapi.datastructures import State as _State


class State(_State):
    def __init__(self) -> None:
        super().__init__()

    def get(self, key: str) -> Optional[Any]:
        try:
            return self.__getattr__(key)
        except (KeyError, AttributeError):
            return None
