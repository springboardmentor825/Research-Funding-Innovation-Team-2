# ============================================================
# RESEARCHIQ - PATENT SERVICE
# ============================================================

def search_patents(query: str):

    query = query.strip().lower()

    # Demo patent data
    # Replace/add database or external patent API later.

    patents = [

        {
            "title": "Artificial Intelligence Based Research System",
            "patent_number": "US20240012345",
            "technology": "Artificial Intelligence",
            "status": "Published",
            "applicant": "Research Technology Labs",
            "description":
                "An artificial intelligence system for analysing "
                "research information and generating intelligent insights."
        },

        {
            "title": "Machine Learning Based Recommendation System",
            "patent_number": "US20240123456",
            "technology": "Machine Learning",
            "status": "Granted",
            "applicant": "Advanced Computing Research",
            "description":
                "A machine learning based system for generating "
                "personalized recommendations."
        },

        {
            "title": "Natural Language Processing Research Platform",
            "patent_number": "US20240234567",
            "technology": "Natural Language Processing",
            "status": "Published",
            "applicant": "Intelligent Systems Inc.",
            "description":
                "A natural language processing platform for analysing "
                "and processing research documents."
        },

        {
            "title": "Smart Digital Transformation Platform",
            "patent_number": "US20240345678",
            "technology": "Digital Transformation",
            "status": "Granted",
            "applicant": "Digital Innovation Labs",
            "description":
                "A technology platform supporting digital transformation "
                "and intelligent business processes."
        },

        {
            "title": "AI Based Predictive Analytics System",
            "patent_number": "US20240456789",
            "technology": "Artificial Intelligence",
            "status": "Published",
            "applicant": "Future Analytics Research",
            "description":
                "An AI based predictive analytics system for research "
                "and technology forecasting."
        }

    ]

    # Search title, technology, applicant and description

    matched = []

    for patent in patents:

        searchable_text = " ".join([
            patent["title"],
            patent["technology"],
            patent["applicant"],
            patent["description"]
        ]).lower()

        if query in searchable_text:

            matched.append(patent)

    return matched