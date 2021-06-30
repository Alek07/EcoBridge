from typing import Optional, Callable

from sqlalchemy.engine import Engine
from sqlalchemy.orm import Session
from sqlalchemy import select

from pydantic import EmailStr

from app.db.repositories.base import BaseRepository
from app.schemas.user import UserInDB, UserCreate
from app.models import User
from app.api.errors.repositories.users import (
    EmailAlreadyTakenException,
    UsernameAlreadyTakenException,
)
from app.services import auth_service


class UsersRepository(BaseRepository):
    def __init__(self, session_scope: Callable):
        super().__init__(session_scope)
        self.auth_service = auth_service

    def get_user_by_email(self, *, email: EmailStr) -> Optional[UserInDB]:
        with self.session_scope() as session:
            user_record = session.query(User).filter(User.email == email).one_or_none()

            if user_record is None:
                return None
            else:
                return UserInDB.from_orm(user_record)

    def get_user_by_username(self, *, username: str) -> Optional[UserInDB]:
        with self.session_scope() as session:
            user_record = session.query(User).filter(User.username == username).one_or_none()

            if user_record is None:
                return None
            else:
                return UserInDB.from_orm(user_record)

    def register_new_user(self, *, new_user: UserCreate) -> UserInDB:
        with self.session_scope() as session:
            if self.get_user_by_email(email=new_user.email):
                raise EmailAlreadyTakenException()
            if self.get_user_by_username(username=new_user.username):
                raise UsernameAlreadyTakenException()

            user_password_update = self.auth_service.create_salt_and_hashed_password(
                plaintext_password=new_user.password
            )
            new_user_params = new_user.copy(update=user_password_update.dict())
            created_user = User(**new_user_params.dict())

            session.add(created_user)
            session.commit()

            result = self.get_user_by_email(email=new_user.email)

            assert isinstance(result, UserInDB)

            return result
