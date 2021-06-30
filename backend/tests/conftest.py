import warnings
import os
from typing import Generator, AsyncGenerator, Callable
from contextlib import contextmanager

import pytest
from asgi_lifespan import LifespanManager

from fastapi import FastAPI
from httpx import AsyncClient, Headers
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy.engine import Engine
from pydantic import EmailStr

os.environ["TESTING"] = "1"

from app.schemas.user import UserCreate, UserInDB
from app.db.repositories.users import UsersRepository

from app.core.config import SECRET_KEY, JWT_TOKEN_PREFIX, DATABASE_URL
from app.services import auth_service

from app.models import models, Base

from app.db.tasks import _emit_ddl

# Apply migrations at beginning and end of testing session
@pytest.fixture(scope="session")
def setup_db() -> Generator:
    # We cannot create a new test schema due to Db2 account
    # constraints, so we create new test tables.

    # TODO: Refactor this

    db = create_engine(DATABASE_URL)

    Base.metadata.create_all(db)

    _emit_ddl(db)
    yield db
    # Tear down test tables
    Base.metadata.drop_all(db)
    print("Finishing tests")


@pytest.fixture
def session_scope(db: Engine) -> Callable:
    @contextmanager
    def _session_scope() -> Generator:
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

    return _session_scope


# Create a new application for testing
@pytest.fixture
def app(setup_db: Engine) -> FastAPI:
    from app.main import get_application

    return get_application(setup_db)


# Grab a reference to our database when needed
@pytest.fixture
def db(app: FastAPI) -> Engine:
    return app.state._db


@pytest.fixture
async def test_user(session_scope: Callable) -> UserInDB:
    new_user = UserCreate(
        email=EmailStr("testuser1@test.io"), username="testuser1", password="testpassword"
    )

    user_repo = UsersRepository(session_scope)

    existing_user = user_repo.get_user_by_email(email=new_user.email)
    if existing_user:
        return existing_user

    return user_repo.register_new_user(new_user=new_user)


@pytest.fixture
async def test_user2(session_scope: Callable) -> UserInDB:
    new_user = UserCreate(
        email=EmailStr("testuser2@test.io"),
        username="testuser2",
        password="testpassword",
    )

    user_repo = UsersRepository(session_scope)

    existing_user = user_repo.get_user_by_email(email=new_user.email)
    if existing_user:
        return existing_user

    return user_repo.register_new_user(new_user=new_user)


# Make requests in our tests
@pytest.fixture
async def client(app: FastAPI) -> AsyncGenerator:
    async with LifespanManager(app):
        async with AsyncClient(
            app=app, base_url="http://testserver", headers={"Content-Type": "application/json"}
        ) as client:
            yield client


@pytest.fixture
def authorized_client(client: AsyncClient, test_user: UserInDB) -> AsyncClient:
    access_token = auth_service.create_access_token_for_user(
        user=test_user, secret_key=str(SECRET_KEY)
    )

    client.headers = Headers(
        {
            **client.headers,
            "Authorization": f"{JWT_TOKEN_PREFIX} {access_token}",
        }
    )

    return client
