# ============================================================
# RESEARCHIQ - MAIN FASTAPI APPLICATION
# ============================================================

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# ============================================================
# DATABASE
# ============================================================

try:
    from app.config.database import db
except Exception as e:
    print("[DB] Database import failed:", e)
    db = None


# ============================================================
# APPLICATION
# ============================================================

app = FastAPI(
    title="ResearchIQ API",
    description="Research, Funding, Patent and Commercialization Intelligence API",
    version="1.0.0"
)


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5500",
        "http://127.0.0.1:5500"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


# ============================================================
# ROUTES
# ============================================================

# ------------------------------------------------------------
# Commercialization
# ------------------------------------------------------------

try:

    from app.routes import commercialization

    app.include_router(
        commercialization.router
    )

    print("[ROUTE] Commercialization routes loaded.")

except Exception as e:

    print(
        "[COMMERCIALIZATION] Routes disabled:",
        e
    )


# ------------------------------------------------------------
# Patent Intelligence
# ------------------------------------------------------------

try:

    from app.routes import patent

    app.include_router(
        patent.router
    )

    print("[ROUTE] Patent routes loaded.")

except Exception as e:

    print(
        "[PATENT] Routes disabled:",
        e
    )


# ------------------------------------------------------------
# Funding / AI Recommendations
# ------------------------------------------------------------

# IMPORTANT:
# Funding recommendations DO NOT require MongoDB.
# Therefore this route must NOT be inside:
# if db is not None

try:

    from app.routes import funding

    app.include_router(
        funding.router
    )

    print("[ROUTE] Funding / AI recommendation routes loaded.")

except Exception as e:

    print(
        "[FUNDING] Routes disabled:",
        e
    )


# ============================================================
# DATABASE-DEPENDENT ROUTES
# ============================================================

if db is not None:

    try:

        from app.routes.users import router as users_router
        app.include_router(users_router)

        print("[ROUTE] Users routes loaded.")

    except Exception as e:
        print("[USERS] Routes disabled:", e)


    try:

        from app.routes.roles import router as role_router
        app.include_router(role_router)

        print("[ROUTE] Roles routes loaded.")

    except Exception as e:
        print("[ROLES] Routes disabled:", e)


    try:

        from app.routes.auth import router as auth_router
        app.include_router(auth_router)

        print("[ROUTE] Auth routes loaded.")

    except Exception as e:
        print("[AUTH] Routes disabled:", e)


    try:

        from app.routes.permission import router as permission_router
        app.include_router(permission_router)

        print("[ROUTE] Permission routes loaded.")

    except Exception as e:
        print("[PERMISSION] Routes disabled:", e)


    try:

        from app.routes.research_profiles import router as research_profiles_router
        app.include_router(research_profiles_router)

        print("[ROUTE] Research profile routes loaded.")

    except Exception as e:
        print(
            "[RESEARCH PROFILES] Routes disabled:",
            e
        )


    try:

        from app.routes.research_domains import router as research_domains_router
        app.include_router(research_domains_router)

        print("[ROUTE] Research domain routes loaded.")

    except Exception as e:
        print(
            "[RESEARCH DOMAINS] Routes disabled:",
            e
        )

else:

    print(
        "[DB] Database unavailable. "
        "Database-dependent routes are disabled."
    )


# ============================================================
# DOCUMENT ROUTES
# ============================================================

try:

    from app.routes.document import router as document_router

    app.include_router(
        document_router
    )

    print("[ROUTE] Document routes loaded.")

except Exception as e:

    print(
        "[DOCUMENT] Document routes disabled:",
        e
    )


# ============================================================
# ROOT
# ============================================================

@app.get("/")
def root():

    return {
        "status": "success",
        "message": "ResearchIQ API is running",
        "version": "1.0.0"
    }


# ============================================================
# HEALTH CHECK
# ============================================================

@app.get("/health")
def health():

    return {
        "status": "healthy",
        "database": (
            "connected"
            if db is not None
            else "unavailable"
        )
    }


# ============================================================
# DATABASE DASHBOARD
# ============================================================

@app.get("/api/dashboard")
def dashboard_data():

    if db is None:

        return {
            "status": "error",
            "message": "MongoDB is not connected",
            "collections": {}
        }

    try:

        collections = db.list_collection_names()

        counts = {}

        for collection_name in collections:

            try:

                collection = db[
                    collection_name
                ]

                counts[
                    collection_name
                ] = collection.count_documents({})

            except Exception:

                counts[
                    collection_name
                ] = 0

        return {

            "status": "success",

            "message":
                "Dashboard data loaded successfully",

            "collections":
                counts
        }

    except Exception as e:

        return {

            "status": "error",

            "message":
                str(e),

            "collections":
                {}
        }


# ============================================================
# TEST DATABASE
# ============================================================

@app.post("/test")
async def test_db():

    if db is None:

        return {

            "success": False,

            "message":
                "MongoDB is not connected"
        }

    try:

        data = {

            "name":
                "testing",

            "email":
                "testing@example.com",

            "role":
                "user"
        }

        db.testing_collection.insert_one(
            data
        )

        return {

            "success": True,

            "message":
                "Inserted Successfully"
        }

    except Exception as e:

        return {

            "success": False,

            "message":
                str(e)
        }