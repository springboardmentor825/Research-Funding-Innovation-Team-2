# ============================================================
# RESEARCHIQ - PATENT ROUTES
# ============================================================

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from app.services.patent_service import search_patents


router = APIRouter(
    prefix="/patent",
    tags=["Patent Intelligence"]
)


# ============================================================
# REQUEST SCHEMA
# ============================================================

class PatentSearchRequest(BaseModel):

    query: str = Field(
        ...,
        min_length=1
    )


# ============================================================
# HEALTH
# ============================================================

@router.get("/health")
def patent_health():

    return {

        "success": True,

        "service":
            "patent",

        "status":
            "running"
    }


# ============================================================
# PATENT SEARCH
# ============================================================

@router.post("/search")
def patent_search(
    request: PatentSearchRequest
):

    query = (
        request.query
        .strip()
    )

    if not query:

        raise HTTPException(

            status_code=400,

            detail=
                "Patent search query is required"
        )

    try:

        results = search_patents(
            query
        )

        return {

            "success": True,

            "query":
                query,

            "count":
                len(results),

            "results":
                results
        }

    except Exception as error:

        print(
            "[PATENT] Search error:",
            error
        )

        raise HTTPException(

            status_code=500,

            detail=
                f"Patent search failed: {str(error)}"
        )