from typing import Optional

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from app.core.config import SECRET_KEY, API_PREFIX
from app.schemas.user import UserInDB
from app.api.dependencies.db import get_repository
from app.db.repositories.users import UsersRepository
from app.services import auth_service
from app.api.errors.services.auth import AuthServiceException


oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{API_PREFIX}/users/login/token/")


async def get_user_from_token(
    *,
    token: str = Depends(oauth2_scheme),
    user_repo: UsersRepository = Depends(get_repository(UsersRepository)),
) -> Optional[UserInDB]:
    try:
        username = auth_service.get_username_from_token(token=token, secret_key=str(SECRET_KEY))
    except AuthServiceException as e:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, str(e))

    user = user_repo.get_user_by_username(username=username)

    return user


def get_current_active_user(
    current_user: UserInDB = Depends(get_user_from_token),
) -> Optional[UserInDB]:
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="No authenticated user.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if not current_user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not an active user.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return current_user
