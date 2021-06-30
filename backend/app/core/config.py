import os
import json

from starlette.config import Config
from starlette.datastructures import Secret, CommaSeparatedStrings

config = Config(".env")

PROJECT_NAME = "EcoBridge"
VERSION = "1.0.0"
API_PREFIX = config("API_PREFIX", cast=str, default="/api")

ALLOWED_HOSTS = config("ALLOWED_HOSTS", cast=CommaSeparatedStrings, default=["*"])

SECRET_KEY = config("SECRET_KEY", cast=Secret)

ACCESS_TOKEN_EXPIRE_MINUTES = config(
    "ACCESS_TOKEN_EXPIRE_MINUTES", cast=int, default=7 * 24 * 60
)  # one week

JWT_ALGORITHM = config("JWT_ALGORITHM", cast=str, default="HS256")
JWT_AUDIENCE = config("JWT_AUDIENCE", cast=str, default="ecobridge:auth")
JWT_TOKEN_PREFIX = config("JWT_TOKEN_PREFIX", cast=str, default="Bearer")

if 'VCAP_SERVICES' in os.environ:
    vcap = json.loads(os.getenv('VCAP_SERVICES'))
    if "dashDB For Transactions" in vcap:
        dash_db = vcap["dashDB For Transactions"]
        database_service = dash_db[0]
        creds = database_service["credentials"]
        username = creds["username"]
        password = creds["password"]
        host = creds["hostname"]
        port = creds["port"]
        db = creds["db"]
        db_url = f"db2+ibm_db://{username}:{password}@{host}:{port}/{db}"
        DATABASE_URL = db_url
else:
    DATABASE_URL = config("DATABASE_URL", cast=str)
