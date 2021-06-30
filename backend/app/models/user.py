from typing import Optional

from sqlalchemy.orm import relationship
from sqlalchemy import Integer, Column, String, Boolean

from app.models.base import Base, timestamps
from app.models.utils import generate_updated_at_trigger_ddl, get_tablename


class User(Base):
    __tablename__ = get_tablename("users")

    id = Column(Integer, primary_key=True)
    username = Column(String(64), nullable=False, unique=True, index=True)
    email = Column(String(64), nullable=False, unique=True, index=True)
    salt = Column(String(128), nullable=False)
    password = Column(String(128), nullable=False)
    is_active = Column(Boolean, nullable=False, server_default="1")
    products = relationship(get_tablename("products"), cascade="all, delete-orphan")
    created_at, updated_at = timestamps()

    triggers_ddl = {generate_updated_at_trigger_ddl(__tablename__)}

    def __repr__(self) -> str:
        return f"User(id={self.id!r}, username={self.username!r})"
