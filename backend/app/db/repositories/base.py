from typing import Callable

from sqlalchemy.orm import Session

from logging import getLogger

logger = getLogger(__name__)


class BaseRepository:
    def __init__(self, session_scope: Callable) -> None:
        self.session_scope = session_scope
