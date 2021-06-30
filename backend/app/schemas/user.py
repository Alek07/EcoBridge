from typing import Optional

from pydantic import EmailStr, constr

from app.schemas.core import DateTimeModelMixin, IDModelMixin, CoreModel
from app.schemas.token import AccessToken


class UserBase(CoreModel):
    """
    Leaving off password and salt from base model
    """

    email: Optional[EmailStr]
    username: Optional[str]
    bio: Optional[str]
    is_active: bool = True
    is_superuser: bool = False


class UserCreate(CoreModel):
    """
    Email, username, and password are required for registering a new user
    """

    email: EmailStr
    password: constr(min_length=7, max_length=128)  # type: ignore
    username: constr(min_length=3, regex="[a-zA-Z0-9_-]+$")  # type: ignore


class UserUpdate(CoreModel):
    """
    Users are allowed to update their email and username
    """

    email: Optional[EmailStr]
    username: Optional[constr(min_length=3, regex="^[a-zA-Z0-9_-]+$")]  # type: ignore
    bio: Optional[str]


class UserPasswordUpdate(CoreModel):
    """
    Users can change their password
    """

    password: constr(min_length=7, max_length=128)  # type: ignore
    salt: str


class UserInDB(IDModelMixin, DateTimeModelMixin, UserBase):
    """
    Add in id, created_at, updated_at, and user's password and salt
    """

    password: str
    salt: str

    class Config:
        orm_mode = True


class UserPublic(IDModelMixin, DateTimeModelMixin, UserBase):
    access_token: Optional[AccessToken]
