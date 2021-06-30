from typing import Optional, Union

import jwt
import bcrypt

from datetime import datetime, timedelta
from pydantic import ValidationError, EmailStr
from passlib.context import CryptContext

from app.core.config import (
    SECRET_KEY,
    JWT_ALGORITHM,
    JWT_AUDIENCE,
    JWT_TOKEN_PREFIX,
    ACCESS_TOKEN_EXPIRE_MINUTES,
)
from app.schemas.token import JWTMeta, JWTCreds, JWTPayload
from app.schemas.user import UserPasswordUpdate, UserInDB
from app.schemas.user import UserBase, UserPasswordUpdate
from app.services.base import BaseService
from app.api.errors.services.auth import (
    TokenValidationException,
    InvalidUserException,
    UserNotFoundException,
)
from app.db.repositories.base import BaseRepository

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class AuthService(BaseService):
    def create_salt_and_hashed_password(self, *, plaintext_password: str) -> UserPasswordUpdate:
        salt = self.generate_salt()
        hashed_password = self.hash_password(password=plaintext_password, salt=salt)

        return UserPasswordUpdate(salt=salt, password=hashed_password)

    def generate_salt(self) -> str:
        return bcrypt.gensalt().decode()

    def hash_password(self, *, password: str, salt: str) -> str:
        return pwd_context.hash(password + salt)

    def verify_password(self, *, password: str, salt: str, hashed_pw: str) -> bool:
        return pwd_context.verify(password + salt, hashed_pw)

    def create_access_token_for_user(
        self,
        *,
        user: UserBase,
        secret_key: str = str(SECRET_KEY),
        audience: str = JWT_AUDIENCE,
        expires_in: int = ACCESS_TOKEN_EXPIRE_MINUTES,
    ) -> str:
        if not user or not isinstance(user, UserBase) or not user.email or not user.username:
            raise InvalidUserException(user=user)

        jwt_meta = JWTMeta(
            aud=audience,
            iat=datetime.timestamp(datetime.utcnow()),
            exp=datetime.timestamp(datetime.utcnow() + timedelta(minutes=expires_in)),
        )
        jwt_creds = JWTCreds(sub=user.email, username=user.username)
        token_payload = JWTPayload(
            **jwt_meta.dict(),
            **jwt_creds.dict(),
        )
        access_token = jwt.encode(token_payload.dict(), secret_key, algorithm=JWT_ALGORITHM)

        return access_token

    def get_username_from_token(self, *, token: str, secret_key: str) -> str:
        try:
            decoded_token = jwt.decode(
                token, str(secret_key), audience=JWT_AUDIENCE, algorithms=[JWT_ALGORITHM]
            )
            payload = JWTPayload(**decoded_token)
        except (jwt.PyJWTError, ValidationError):
            raise TokenValidationException()
        return payload.username

    # TODO: Fix circular import caused by UsersRepository.
    #       Using BaseRepository as a temporary fix.
    def authenticate_user(
        self, *, email: EmailStr, password: str, user_repo: BaseRepository
    ) -> UserInDB:
        user = user_repo.get_user_by_email(email=email)  # type: ignore

        if user is None:
            raise UserNotFoundException(email=email)
        if not self.verify_password(password=password, salt=user.salt, hashed_pw=user.password):
            raise TokenValidationException()

        return user
