from typing import Callable, Generator
from contextlib import contextmanager

from sqlalchemy.engine import Engine
from sqlalchemy.orm import Session
from fastapi import Depends
from starlette.requests import Request

from app.db.repositories.base import BaseRepository


def get_database(request: Request) -> Engine:
    return request.app.state._db


def session_scope_factory(db: Engine = Depends(get_database)) -> Callable:
    @contextmanager
    def session_scope() -> Generator:
        """Provide a transactional scope around a series of operations."""
        session = Session(db)

        try:
            yield session
            session.commit()
        except:
            session.rollback()
            raise
        finally:
            session.close()

    return session_scope


def get_repository(Repo_type: type[BaseRepository]) -> Callable:
    def get_repo(session_scope: Callable = Depends(session_scope_factory)) -> BaseRepository:
        return Repo_type(session_scope)

    return get_repo
