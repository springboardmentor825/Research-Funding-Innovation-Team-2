# ============================================================
# RESEARCHIQ - PATENT SERVICE
# ============================================================

# This is currently a local patent intelligence dataset.
#
# Later, this service can be connected to an external
# patent database/API without changing the frontend.


# ============================================================
# PATENT DATA
# ============================================================

PATENTS = [

    {
        "title":
            "Artificial Intelligence Based Research System",

        "patent_number":
            "US20240012345",

        "technology":
            "Artificial Intelligence",

        "status":
            "Published",

        "applicant":
            "Research Technology Labs",

        "description":
            "An artificial intelligence system for analysing "
            "research information and generating intelligent insights."
    },

    {
        "title":
            "Machine Learning Based Recommendation System",

        "patent_number":
            "US20240123456",

        "technology":
            "Machine Learning",

        "status":
            "Granted",

        "applicant":
            "Advanced Computing Research",

        "description":
            "A machine learning based system for generating "
            "personalized recommendations."
    },

    {
        "title":
            "Natural Language Processing Research Platform",

        "patent_number":
            "US20240234567",

        "technology":
            "Natural Language Processing",

        "status":
            "Published",

        "applicant":
            "Intelligent Systems Inc.",

        "description":
            "A natural language processing platform for "
            "analysing and processing research documents."
    },

    {
        "title":
            "Smart Digital Transformation Platform",

        "patent_number":
            "US20240345678",

        "technology":
            "Digital Transformation",

        "status":
            "Granted",

        "applicant":
            "Digital Innovation Labs",

        "description":
            "A technology platform supporting digital "
            "transformation and intelligent business processes."
    },

    {
        "title":
            "AI Based Predictive Analytics System",

        "patent_number":
            "US20240456789",

        "technology":
            "Artificial Intelligence",

        "status":
            "Published",

        "applicant":
            "Future Analytics Research",

        "description":
            "An AI based predictive analytics system for "
            "research and technology forecasting."
    },

    {
        "title":
            "Intelligent Research Analytics Platform",

        "patent_number":
            "US20240567890",

        "technology":
            "Research Analytics",

        "status":
            "Published",

        "applicant":
            "Innovation Intelligence Labs",

        "description":
            "A research analytics platform that analyses "
            "scientific information and identifies technology "
            "and innovation opportunities."
    },

    {
        "title":
            "AI Powered Technology Opportunity Detection System",

        "patent_number":
            "US20240678901",

        "technology":
            "Artificial Intelligence",

        "status":
            "Granted",

        "applicant":
            "Future Technology Research",

        "description":
            "An AI powered system for identifying emerging "
            "technology opportunities from research and patent data."
    },

    {
        "title":
            "Research Funding Recommendation System",

        "patent_number":
            "US20240789012",

        "technology":
            "Research Funding",

        "status":
            "Published",

        "applicant":
            "Academic Innovation Systems",

        "description":
            "A system for analysing research projects and "
            "recommending relevant funding opportunities."
    },

    {
        "title":
            "Smart Transportation Safety System",

        "patent_number":
            "US20240890123",

        "technology":
            "Smart Transportation",

        "status":
            "Granted",

        "applicant":
            "Advanced Mobility Technologies",

        "description":
            "An intelligent transportation system using "
            "machine learning to detect road conditions, "
            "identify obstacles and improve vehicle safety."
    },

    {
        "title":
            "Computer Vision Based Object Detection System",

        "patent_number":
            "US20240901234",

        "technology":
            "Computer Vision",

        "status":
            "Published",

        "applicant":
            "Vision Intelligence Research",

        "description":
            "A computer vision system for detecting and "
            "classifying objects in real-time environments."
    }

]


# ============================================================
# SEARCH PATENTS
# ============================================================

def search_patents(
    query: str
):

    if not query:

        return []

    query = (
        query
        .strip()
        .lower()
    )

    if not query:

        return []

    results = []

    # --------------------------------------------------------
    # Search every patent
    # --------------------------------------------------------

    for patent in PATENTS:

        searchable_text = " ".join([

            patent.get(
                "title",
                ""
            ),

            patent.get(
                "patent_number",
                ""
            ),

            patent.get(
                "technology",
                ""
            ),

            patent.get(
                "status",
                ""
            ),

            patent.get(
                "applicant",
                ""
            ),

            patent.get(
                "description",
                ""
            )

        ]).lower()

        # ----------------------------------------------------
        # Exact keyword matching
        # ----------------------------------------------------

        if query in searchable_text:

            results.append(
                patent
            )

            continue

        # ----------------------------------------------------
        # Multiple keyword matching
        # ----------------------------------------------------

        keywords = query.split()

        matched_keywords = sum(

            1

            for keyword in keywords

            if keyword in searchable_text
        )

        # At least one meaningful keyword matched
        if matched_keywords >= 1:

            results.append(
                patent
            )

    return results