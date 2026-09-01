# ============================================================
# RESEARCHIQ - FUNDING RECOMMENDER
# ============================================================

import pandas as pd
import numpy as np

from pathlib import Path

from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity


# ============================================================
# PATHS
# ============================================================

# backend/app/services/funding_recommender.py
#
# parent       = services
# parent.parent = app
# parent.parent.parent = backend

BASE_DIR = (
    Path(__file__)
    .resolve()
    .parent
    .parent
    .parent
)


CSV_PATH = (
    BASE_DIR
    / "app"
    / "data"
    / "grants.csv"
)


EMBEDDINGS_PATH = (
    BASE_DIR
    / "app"
    / "ml_models"
    / "grant_embeddings.npy"
)


# ============================================================
# CHECK FILES
# ============================================================

if not CSV_PATH.exists():

    raise FileNotFoundError(
        f"Grants CSV not found: {CSV_PATH}"
    )


if not EMBEDDINGS_PATH.exists():

    raise FileNotFoundError(
        f"Grant embeddings not found: {EMBEDDINGS_PATH}"
    )


# ============================================================
# LOAD EMBEDDING MODEL
# ============================================================

print(
    "[FUNDING] Loading embedding model..."
)


model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)


print(
    "[FUNDING] Embedding model loaded."
)


# ============================================================
# LOAD GRANTS
# ============================================================

print(
    f"[FUNDING] Loading grants from: {CSV_PATH}"
)


grants = pd.read_csv(
    CSV_PATH
)


print(
    f"[FUNDING] Total grants: {len(grants)}"
)


# ============================================================
# LOAD EMBEDDINGS
# ============================================================

print(
    f"[FUNDING] Loading embeddings from: {EMBEDDINGS_PATH}"
)


grant_embeddings = np.load(
    EMBEDDINGS_PATH
)


print(
    "[FUNDING] Embeddings shape:",
    grant_embeddings.shape
)


# ============================================================
# VALIDATE EMBEDDINGS
# ============================================================

if len(grants) != len(grant_embeddings):

    raise ValueError(

        "Grant data and embeddings count do not match. "

        f"CSV contains {len(grants)} grants, "

        f"but embeddings contain "
        f"{len(grant_embeddings)} vectors."
    )


# ============================================================
# RECOMMEND GRANTS
# ============================================================

def recommend_grants(
    innovation_description: str,
    top_k: int = 5
):

    # --------------------------------------------------------
    # Validate
    # --------------------------------------------------------

    if not innovation_description:

        return []

    innovation_description = (
        innovation_description
        .strip()
    )

    if not innovation_description:

        return []

    # --------------------------------------------------------
    # Limit top_k
    # --------------------------------------------------------

    top_k = max(
        1,
        min(
            int(top_k),
            len(grants)
        )
    )

    # --------------------------------------------------------
    # Encode innovation
    # --------------------------------------------------------

    user_embedding = model.encode(

        [innovation_description],

        convert_to_numpy=True
    )

    # --------------------------------------------------------
    # Calculate similarity
    # --------------------------------------------------------

    similarities = cosine_similarity(

        user_embedding,

        grant_embeddings
    )[0]

    # --------------------------------------------------------
    # Find best grants
    # --------------------------------------------------------

    top_indices = np.argsort(
        similarities
    )[-top_k:][::-1]

    # --------------------------------------------------------
    # Build results
    # --------------------------------------------------------

    recommendations = []

    for rank, index in enumerate(
        top_indices,
        start=1
    ):

        grant = grants.iloc[
            index
        ]

        score = (
            float(
                similarities[index]
            )
            * 100
        )

        recommendations.append({

            "rank":
                rank,

            "grant_id":
                str(
                    grant.get(
                        "opportunity_id",
                        ""
                    )
                ),

            "title":
                str(
                    grant.get(
                        "opportunity_title",
                        ""
                    )
                ),

            "agency":
                str(
                    grant.get(
                        "agency_name",
                        ""
                    )
                ),

            "category":
                str(
                    grant.get(
                        "category_of_funding_activity",
                        ""
                    )
                ),

            "match_score":
                round(
                    score,
                    2
                )
        })

    return recommendations


# ============================================================
# LOCAL TEST
# ============================================================

if __name__ == "__main__":

    innovation = """

    I am developing an artificial intelligence
    system for smart transportation and road safety.
    The system uses machine learning to detect road
    conditions, identify obstacles and improve vehicle
    safety.

    """

    print(
        "\n[FUNDING] Testing recommendation system...\n"
    )

    results = recommend_grants(

        innovation,

        top_k=5
    )

    for result in results:

        print(
            "--------------------------------"
        )

        print(
            "Rank:",
            result["rank"]
        )

        print(
            "Grant ID:",
            result["grant_id"]
        )

        print(
            "Title:",
            result["title"]
        )

        print(
            "Agency:",
            result["agency"]
        )

        print(
            "Category:",
            result["category"]
        )

        print(
            "Match:",
            f'{result["match_score"]}%'
        )