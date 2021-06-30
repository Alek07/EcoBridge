from typing import Optional

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.engine import Engine

from app.api.routes import router as api_router

from app.core.config import PROJECT_NAME, VERSION, ALLOWED_HOSTS, API_PREFIX
from app.core import tasks
from app.utils.datastructures import State


def get_application(db: Optional[Engine] = None) -> FastAPI:
    """
    Application factory
    """
    application = FastAPI(title=PROJECT_NAME, version=VERSION)

    application.add_middleware(
        CORSMiddleware,
        allow_origins=ALLOWED_HOSTS or ["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    application.state = State()

    if db is not None:
        application.state._db = db

    application.add_event_handler("startup", tasks.create_start_app_handler(application))
    application.add_event_handler("shutdown", tasks.create_stop_app_handler(application))

    application.include_router(api_router, prefix=API_PREFIX)

    return application


app = get_application()
