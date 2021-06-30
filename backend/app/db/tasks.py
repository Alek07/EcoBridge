from fastapi import FastAPI
from sqlalchemy import create_engine, text
from sqlalchemy.engine import Engine
from sqlalchemy.orm import sessionmaker

from app.core.config import DATABASE_URL
from app.models import Base, models

import logging

logger = logging.getLogger(__name__)


async def connect_to_db(app: FastAPI) -> None:
    db = create_engine(DATABASE_URL, echo=True)

    try:
        with db.connect() as conn:
            logger.warning("Database connection successful.")
            app.state._db = db
    except Exception as e:
        logger.error("--- DB CONNECTION ERROR ---")
        logger.error(e)
        logger.error("--- DB CONNECTION ERROR ---")


async def close_db_connection(app: FastAPI) -> None:
    if app.state._db:
        app.state._db.dispose()


def _emit_ddl(db: Engine) -> None:
    logger.warning("Emitting DDL...")
    Base.metadata.create_all(db)

    for model in models:
        with db.begin() as conn:
            for trigger_ddl in model.triggers_ddl:
                conn.execute(trigger_ddl)


async def emit_ddl(app: FastAPI) -> None:

    if app.state._db:
        _emit_ddl(app.state._db)
