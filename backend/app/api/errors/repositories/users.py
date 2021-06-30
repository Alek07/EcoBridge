from typing import Optional, Any

from app.api.errors.repositories import RepositoryException


class UsersRepositoryException(RepositoryException):
    def __init__(self, *args: Any) -> None:
        super().__init__(*args)


class UsernameAlreadyTakenException(UsersRepositoryException):
    def __init__(self) -> None:
        super().__init__("Username is already taken.")


class EmailAlreadyTakenException(UsersRepositoryException):
    def __init__(self) -> None:
        super().__init__("Email is already taken.")
