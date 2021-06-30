from typing import Callable, Coroutine, Optional, Any

from fastapi import FastAPI

from app.db.tasks import connect_to_db, close_db_connection, emit_ddl


def create_start_app_handler(app: FastAPI) -> Callable:
    async def start_app() -> None:
        if app.state.get("_db") is None:
            await connect_to_db(app)
            await emit_ddl(app)

    return start_app


def create_stop_app_handler(app: FastAPI) -> Callable:
    async def stop_app() -> None:
        await close_db_connection(app)

    return stop_app
