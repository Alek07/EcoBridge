from typing import Optional

from sqlalchemy.orm import relationship
from sqlalchemy import Integer, Column, String, Boolean, Numeric, ForeignKey

from app.models.base import Base, timestamps
from app.models.utils import generate_updated_at_trigger_ddl, get_tablename


class Product(Base):
    __tablename__ = get_tablename("products")

    id = Column(Integer, primary_key=True)
    name = Column(String(256), nullable=False, index=True)
    description = Column(String(2048), server_default="")
    price = Column(Numeric(9, 2), server_default="0.00")
    # owner_id = Column(
    #     Integer,
    #     ForeignKey(get_tablename("users") + ".id"),
    #     nullable=False,
    #     index=True,
    # )
    image = Column(String(512))
    geolatitude = Column(Numeric(8, 6))
    geolongitude = Column(Numeric(8, 6))
    created_at, updated_at = timestamps()

    triggers_ddl = {generate_updated_at_trigger_ddl(__tablename__)}

    def __repr__(self) -> str:
        return f"Product(id={self.id!r}, name={self.name!r}, owner_id={self.owner_id!r})"
