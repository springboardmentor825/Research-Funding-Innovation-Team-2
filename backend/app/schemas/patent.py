from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.patent_service import search_patents


router = APIRouter(
    prefix="/patent",
    tags=["Patent Intelligence"]
)


class PatentSearchRequest(BaseModel):
    query: str


@router.get("/health")
def patent_health():

    return {
        "success": True,
        "service": "patent",
        "status": "running"
    }


@router.post("/search")
def patent_search(request: PatentSearchRequest):

    query = request.query.strip()

    if not query:
        raise HTTPException(
            status_code=400,
            detail="Patent search query is required"
        )

    results = search_patents(query)

    return {
        "success": True,
        "query": query,
        "results": results
    }