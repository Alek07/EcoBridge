from typing import Any, Optional


class AppBaseException(BaseException):
    def __init__(
        self,
        message: Optional[str] = None,
        *args: Any,
    ):
        super().__init__(*args)
        self.message = message or ""

    def __str__(self) -> str:
        return self.message
