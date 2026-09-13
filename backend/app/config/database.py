from pymongo import MongoClient
from app.config.settings import MONGO_URI, DATABASE_NAME

# MongoDB is deliberately lazy so file-backed endpoints can start when a local
# database service is temporarily unavailable.
client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
db = client[DATABASE_NAME]
