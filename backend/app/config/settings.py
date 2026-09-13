"""Environment configuration shared by the FastAPI application."""

import os
from pathlib import Path

from dotenv import load_dotenv


load_dotenv(Path(__file__).resolve().parents[2] / ".env")

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DATABASE_NAME = os.getenv("DATABASE_NAME", "research_platform")
JWT_SECRET = os.getenv("JWT_SECRET")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
try:
    JWT_EXPIRE_MINUTES = int(os.getenv("JWT_EXPIRE_MINUTES", "60"))
except ValueError as exc:
    raise ValueError("JWT_EXPIRE_MINUTES must be a positive integer") from exc
if JWT_EXPIRE_MINUTES <= 0:
    raise ValueError("JWT_EXPIRE_MINUTES must be a positive integer")
USER_SERVICE_URL = os.getenv("USER_SERVICE_URL", "").rstrip("/")
