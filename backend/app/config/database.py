from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
from app.config.settings import MONGO_URI, DATABASE_NAME

if not MONGO_URI:
    raise ValueError("MONGO_URI not found in .env file")

client = None
db = None

try:
    client = MongoClient(
        MONGO_URI,
        serverSelectionTimeoutMS=5000
    )

    client.admin.command("ping")

    print("[DB] Connected to MongoDB")

    db = client[DATABASE_NAME]

except Exception as e:
    print("[DB] MongoDB connection failed:", e)
    print("[DB] FastAPI will continue without database connection.")

    client = None
    db = None