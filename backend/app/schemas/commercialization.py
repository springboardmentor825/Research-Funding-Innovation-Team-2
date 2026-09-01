from typing import Optional

from pydantic import BaseModel, Field


class CommercializationRequest(BaseModel):
    innovation_title: str = Field(
        ...,
        min_length=2,
        description="Title of the innovation"
    )

    innovation_description: str = Field(
        ...,
        min_length=10,
        description="Description of the innovation"
    )

    technology: Optional[str] = ""

    target_market: Optional[str] = ""

    patent_status: Optional[str] = "Not Filed"

    technology_readiness_level: int = Field(
        default=5,
        ge=1,
        le=9
    )


class CommercializationRecommendation(BaseModel):
    recommendation_id: int
    strategy: str
    title: str
    description: str
    target_market: str
    commercialization_score: float
    readiness_level: str
    recommended_action: str


class CommercializationResponse(BaseModel):
    success: bool
    innovation_title: str
    overall_score: float
    readiness_level: str
    recommendations: list[CommercializationRecommendation]