# ============================================================
# RESEARCHIQ - FUNDING ROUTES
# ============================================================

from fastapi import APIRouter, HTTPException

from app.schemas.funding import FundingRecommendationRequest
from app.services.funding_recommender import recommend_grants


router = APIRouter(
    prefix="/funding",
    tags=["Funding"]
)


# ============================================================
# HEALTH
# ============================================================

@router.get("/health")
def funding_health():

    return {
        "success": True,
        "service": "funding",
        "status": "running"
    }


# ============================================================
# AI FUNDING RECOMMENDATION
# ============================================================

@router.post("/recommend")
def recommend_funding(
    request: FundingRecommendationRequest
):

    try:

        # ----------------------------------------------------
        # Combine innovation title and description
        # ----------------------------------------------------

        parts = []

        if request.innovation_title:

            parts.append(
                request.innovation_title.strip()
            )

        if request.innovation_description:

            parts.append(
                request.innovation_description.strip()
            )

        innovation_text = ". ".join(parts)

        # ----------------------------------------------------
        # Validate
        # ----------------------------------------------------

        if len(innovation_text.strip()) < 10:

            raise HTTPException(
                status_code=400,
                detail="Innovation description must contain at least 10 characters."
            )

        # ----------------------------------------------------
        # Generate recommendations
        # ----------------------------------------------------

        recommendations = recommend_grants(

            innovation_description=
                innovation_text,

            top_k=
                request.top_k
        )

        # ----------------------------------------------------
        # Response
        # ----------------------------------------------------

        return {

            "success": True,

            "count":
                len(recommendations),

            "recommendations":
                recommendations
        }

    except HTTPException:

        raise

    except Exception as e:

        print(
            "[FUNDING] Recommendation error:",
            e
        )

        raise HTTPException(

            status_code=500,

            detail=
                f"Funding recommendation failed: {str(e)}"
        )