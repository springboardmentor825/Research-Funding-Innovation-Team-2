# ============================================================
# RESEARCHIQ - COMMERCIALIZATION SERVICE
# ============================================================

from typing import List, Dict


# ------------------------------------------------------------
# Determine commercialization readiness
# ------------------------------------------------------------

def get_readiness_level(score: float) -> str:

    if score >= 85:
        return "Highly Commercializable"

    if score >= 70:
        return "Commercially Ready"

    if score >= 50:
        return "Development Stage"

    return "Early Stage"


# ------------------------------------------------------------
# Calculate commercialization score
# ------------------------------------------------------------

def calculate_commercialization_score(
    description: str,
    technology: str,
    target_market: str,
    patent_status: str,
    technology_readiness_level: int
) -> float:

    score = 0.0

    description_lower = description.lower()
    technology_lower = technology.lower()
    market_lower = target_market.lower()
    patent_lower = patent_status.lower()

    # --------------------------------------------------------
    # Technology readiness
    # --------------------------------------------------------

    score += technology_readiness_level * 5

    # Maximum contribution = 45


    # --------------------------------------------------------
    # Patent / IP protection
    # --------------------------------------------------------

    if "granted" in patent_lower:
        score += 20

    elif "filed" in patent_lower:
        score += 15

    elif "application" in patent_lower:
        score += 10

    else:
        score += 5


    # --------------------------------------------------------
    # Target market
    # --------------------------------------------------------

    if target_market.strip():
        score += 10

    if any(
        word in market_lower
        for word in [
            "healthcare",
            "education",
            "finance",
            "automotive",
            "government",
            "enterprise",
            "manufacturing",
            "security"
        ]
    ):
        score += 5


    # --------------------------------------------------------
    # Technology maturity keywords
    # --------------------------------------------------------

    technology_keywords = [
        "ai",
        "artificial intelligence",
        "machine learning",
        "deep learning",
        "blockchain",
        "iot",
        "cloud",
        "computer vision",
        "nlp",
        "robotics",
        "automation"
    ]

    if any(
        keyword in technology_lower
        for keyword in technology_keywords
    ):
        score += 5


    # --------------------------------------------------------
    # Innovation / product keywords
    # --------------------------------------------------------

    product_keywords = [
        "prototype",
        "product",
        "platform",
        "system",
        "application",
        "solution",
        "market",
        "customer",
        "users",
        "deployment"
    ]

    keyword_count = sum(
        1
        for keyword in product_keywords
        if keyword in description_lower
    )

    score += min(keyword_count * 1.5, 10)


    # --------------------------------------------------------
    # Keep score between 0 and 100
    # --------------------------------------------------------

    score = min(max(score, 0), 100)

    return round(score, 2)


# ------------------------------------------------------------
# Generate commercialization recommendations
# ------------------------------------------------------------

def generate_recommendations(
    innovation_title: str,
    innovation_description: str,
    technology: str,
    target_market: str,
    patent_status: str,
    technology_readiness_level: int,
    overall_score: float
) -> List[Dict]:

    readiness = get_readiness_level(overall_score)

    recommendations = []


    # ========================================================
    # Recommendation 1 - Direct Product
    # ========================================================

    recommendations.append({
        "recommendation_id": 1,
        "strategy": "Product Commercialization",
        "title": f"Develop {innovation_title} as a Market-Ready Product",
        "description": (
            "Convert the innovation into a commercially deployable "
            "product with a clear value proposition, pricing model "
            "and customer segment."
        ),
        "target_market": (
            target_market
            if target_market.strip()
            else "Enterprise and institutional customers"
        ),
        "commercialization_score": round(
            min(overall_score + 3, 100),
            2
        ),
        "readiness_level": readiness,
        "recommended_action": (
            "Validate customer requirements and develop a "
            "minimum viable product."
        )
    })


    # ========================================================
    # Recommendation 2 - Licensing
    # ========================================================

    recommendations.append({
        "recommendation_id": 2,
        "strategy": "Technology Licensing",
        "title": "License the Technology to Established Companies",
        "description": (
            "License the underlying technology or intellectual "
            "property to organizations that already have "
            "distribution channels and market access."
        ),
        "target_market": (
            target_market
            if target_market.strip()
            else "Technology companies and industry partners"
        ),
        "commercialization_score": round(
            min(overall_score + 1, 100),
            2
        ),
        "readiness_level": readiness,
        "recommended_action": (
            "Identify companies with complementary products "
            "and prepare a technology licensing proposal."
        )
    })


    # ========================================================
    # Recommendation 3 - Startup / Spin-off
    # ========================================================

    recommendations.append({
        "recommendation_id": 3,
        "strategy": "Startup / Spin-off",
        "title": "Create a Startup Around the Innovation",
        "description": (
            "Build a dedicated startup or university spin-off "
            "to transform the research innovation into a "
            "scalable commercial venture."
        ),
        "target_market": (
            target_market
            if target_market.strip()
            else "Technology-driven markets"
        ),
        "commercialization_score": round(
            min(overall_score + 2, 100),
            2
        ),
        "readiness_level": readiness,
        "recommended_action": (
            "Perform market validation, build a business model "
            "and identify potential investors."
        )
    })


    # ========================================================
    # Recommendation 4 - Strategic Partnership
    # ========================================================

    recommendations.append({
        "recommendation_id": 4,
        "strategy": "Strategic Partnership",
        "title": "Partner With an Industry Organization",
        "description": (
            "Collaborate with an established organization to "
            "validate the technology, access customers and "
            "accelerate commercialization."
        ),
        "target_market": (
            target_market
            if target_market.strip()
            else "Industry and enterprise market"
        ),
        "commercialization_score": round(
            min(overall_score, 100),
            2
        ),
        "readiness_level": readiness,
        "recommended_action": (
            "Identify industry partners and start a pilot "
            "deployment or proof-of-concept."
        )
    })


    # ========================================================
    # Recommendation 5 - Research to Commercialization
    # ========================================================

    recommendations.append({
        "recommendation_id": 5,
        "strategy": "Research-to-Market",
        "title": "Move From Research Prototype to Commercial Product",
        "description": (
            "Strengthen technical validation, scalability, "
            "documentation and deployment readiness before "
            "entering the commercial market."
        ),
        "target_market": (
            target_market
            if target_market.strip()
            else "Research and technology market"
        ),
        "commercialization_score": round(
            max(overall_score - 5, 0),
            2
        ),
        "readiness_level": readiness,
        "recommended_action": (
            "Complete technical validation, user testing "
            "and scalability evaluation."
        )
    })


    # --------------------------------------------------------
    # Sort by score
    # --------------------------------------------------------

    recommendations.sort(
        key=lambda item: item["commercialization_score"],
        reverse=True
    )

    return recommendations


# ============================================================
# MAIN SERVICE FUNCTION
# ============================================================

def get_commercialization_recommendations(
    innovation_title: str,
    innovation_description: str,
    technology: str = "",
    target_market: str = "",
    patent_status: str = "Not Filed",
    technology_readiness_level: int = 5
):

    overall_score = calculate_commercialization_score(
        description=innovation_description,
        technology=technology,
        target_market=target_market,
        patent_status=patent_status,
        technology_readiness_level=technology_readiness_level
    )

    readiness = get_readiness_level(
        overall_score
    )

    recommendations = generate_recommendations(
        innovation_title=innovation_title,
        innovation_description=innovation_description,
        technology=technology,
        target_market=target_market,
        patent_status=patent_status,
        technology_readiness_level=technology_readiness_level,
        overall_score=overall_score
    )

    return {
        "success": True,
        "innovation_title": innovation_title,
        "overall_score": overall_score,
        "readiness_level": readiness,
        "recommendations": recommendations
    }