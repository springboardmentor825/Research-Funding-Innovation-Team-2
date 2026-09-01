# ============================================================
# RESEARCHIQ - COMMERCIALIZATION ROUTES
# ============================================================

from fastapi import APIRouter, HTTPException

from app.schemas.commercialization import (
    CommercializationRequest,
    CommercializationResponse
)

from app.services.commercialization_service import (
    get_commercialization_recommendations
)


router = APIRouter(
    prefix="/commercialization",
    tags=["Commercialization"]
)


# ============================================================
# Health Check
# ============================================================

@router.get("/health")
def commercialization_health():

    return {
        "success": True,
        "service": "commercialization",
        "status": "running"
    }


# ============================================================
# Commercialization Recommendation API
# ============================================================

@router.post(
    "/recommend",
    response_model=CommercializationResponse
)
def recommend_commercialization(
    request: CommercializationRequest
):

    try:

        result = get_commercialization_recommendations(

            innovation_title=
                request.innovation_title,

            innovation_description=
                request.innovation_description,

            technology=
                request.technology or "",

            target_market=
                request.target_market or "",

            patent_status=
                request.patent_status or "Not Filed",

            technology_readiness_level=
                request.technology_readiness_level
        )

        return result

    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=str(error)
        )