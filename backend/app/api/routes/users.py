from typing import cast
from fastapi import APIRouter, Depends, status, HTTPException, Body, Path, Query
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import EmailStr

from app.db.repositories.users import UsersRepository
from app.api.dependencies.db import get_repository
from app.api.dependencies.auth import get_current_active_user
from app.schemas.user import UserInDB, UserPublic, UserCreate
from app.schemas.token import AccessToken
from app.services import auth_service
from app.api.errors.repositories.users import UsersRepositoryException
from app.api.errors.services.auth import AuthServiceException

router = APIRouter()


@router.post("/", response_model=UserPublic, status_code=status.HTTP_201_CREATED)
def register_new_user(
    new_user: UserCreate = Body(..., embed=True),
    users_repo: UsersRepository = Depends(get_repository(UsersRepository)),
) -> UserPublic:
    try:
        created_user = users_repo.register_new_user(new_user=new_user)
        access_token = AccessToken(
            access_token=auth_service.create_access_token_for_user(user=created_user),
            token_type="bearer",
        )
    except (UsersRepositoryException, AuthServiceException) as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

    created_user = created_user.copy(update={"access_token": access_token})

    return UserPublic(**created_user.dict())


@router.get("/me/", response_model=UserPublic)
async def get_currently_authenticated_user(
    current_user: UserInDB = Depends(get_current_active_user),
) -> UserPublic:
    return current_user


@router.get("/{username}", response_model=UserPublic)
def get_user_by_username(
    username: str,
    users_repo: UsersRepository = Depends(get_repository(UsersRepository)),
) -> UserPublic:
    user = users_repo.get_user_by_username(username=username)
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    else:
        return UserPublic(**user.dict())


@router.post("/login/token/", response_model=AccessToken)
async def user_login_with_email_and_password(
    user_repo: UsersRepository = Depends(get_repository(UsersRepository)),
    form_data: OAuth2PasswordRequestForm = Depends(OAuth2PasswordRequestForm),
) -> AccessToken:
    try:
        user = auth_service.authenticate_user(
            email=cast(EmailStr, form_data.username),
            password=form_data.password,
            user_repo=user_repo,
        )
    except AuthServiceException as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str(e))

    access_token = AccessToken(
        access_token=auth_service.create_access_token_for_user(user=user), token_type="bearer"
    )

    return access_token
