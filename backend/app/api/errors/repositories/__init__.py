from typing import Optional, Any

from app.api.errors import AppBaseException


class RepositoryException(AppBaseException):
    def __init__(self, *args: Any) -> None:
        super().__init__(*args)
