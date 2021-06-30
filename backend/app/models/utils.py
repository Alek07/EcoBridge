import os
from typing import Union

from sqlalchemy import text
from sqlalchemy.sql.expression import TextClause

from app.models.base import Base


def generate_updated_at_trigger_ddl(model: Union[Base, str]) -> TextClause:
    if isinstance(model, Base):
        model_name_upper = model.__tablename__.upper()  # type: ignore
    elif isinstance(model, str):
        model_name_upper = model.upper()

    return text(
        f"""
    CREATE OR REPLACE TRIGGER TG_{model_name_upper}_UPDATE_MODTIME
        BEFORE UPDATE ON {model_name_upper}
        REFERENCING NEW AS N
        FOR EACH ROW
        SET N.UPDATED_AT = CURRENT_TIMESTAMP
    """
    )


def get_tablename(name: str) -> str:
    return f"{name}_test" if os.getenv("TESTING") else name
