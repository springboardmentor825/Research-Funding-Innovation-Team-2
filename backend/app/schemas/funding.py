# ============================================================
# RESEARCHIQ - FUNDING SCHEMA
# ============================================================

from pydantic import BaseModel, Field


class FundingRecommendationRequest(BaseModel):

    innovation_title: str | None = None

    innovation_description: str = Field(
        ...,
        min_length=10,
        description="Description of the research or innovation"
    )

    top_k: int = Field(
        default=5,
        ge=1,
        le=20
    )