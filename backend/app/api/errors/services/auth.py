from typing import Any
from app.api.errors.services import ServiceException


class AuthServiceException(ServiceException):
    def __init__(self, *args: Any) -> None:
        super().__init__(*args)


class TokenValidationException(AuthServiceException):
    def __init__(self, *args: Any) -> None:
        super().__init__("Could not validate token credentials.")


class InvalidUserException(AuthServiceException):
    def __init__(self, *args: Any, user: Any) -> None:
        super().__init__(f"Invalid User object provided. \n{user}")


class UserNotFoundException(AuthServiceException):
    def __init__(self, *args: Any, email: Any) -> None:
        super().__init__(f"User does not exist in database. \n{email}")
