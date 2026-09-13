"""Lazy funding recommendation model loader."""

from __future__ import annotations

from functools import lru_cache
from pathlib import Path


class FundingRecommenderUnavailableError(RuntimeError):
    pass


BASE_DIR = Path(__file__).resolve().parent.parent
CSV_PATH = BASE_DIR / "data" / "grants.csv"
EMBEDDINGS_PATH = BASE_DIR / "ml_models" / "grant_embeddings.npy"


@lru_cache(maxsize=1)
def _load_resources():
    if not CSV_PATH.is_file() or not EMBEDDINGS_PATH.is_file():
        raise FundingRecommenderUnavailableError(
            "Funding recommendation data is missing. Expected grants.csv and grant_embeddings.npy."
        )
    if EMBEDDINGS_PATH.read_bytes()[:64].startswith(
        b"version https://git-lfs.github.com/spec/v1"
    ):
        raise FundingRecommenderUnavailableError(
            "Funding embeddings are a Git LFS pointer, not the model data. Run "
            "`git lfs pull` in the repository (or regenerate with "
            "app/ml_models/generate_embeddings.py) before using this endpoint."
        )
    try:
        import numpy as np
        import pandas as pd
        from sentence_transformers import SentenceTransformer
        from sklearn.metrics.pairwise import cosine_similarity
    except ImportError as error:
        raise FundingRecommenderUnavailableError(
            "Funding recommender dependencies are unavailable. Install backend requirements."
        ) from error
    try:
        grants = pd.read_csv(CSV_PATH)
        embeddings = np.load(EMBEDDINGS_PATH, allow_pickle=True)
        if len(grants) != len(embeddings):
            raise FundingRecommenderUnavailableError(
                "Funding grants and embedding counts do not match; regenerate embeddings."
            )
        model = SentenceTransformer("all-MiniLM-L6-v2")
    except FundingRecommenderUnavailableError:
        raise
    except Exception as error:
        raise FundingRecommenderUnavailableError(
            f"Funding recommender could not initialize: {type(error).__name__}: {error}"
        ) from error
    return np, grants, embeddings, model, cosine_similarity


def recommend_grants(innovation_description: str, top_k: int = 5) -> list[dict]:
    np, grants, embeddings, model, cosine_similarity = _load_resources()
    similarities = cosine_similarity(model.encode([innovation_description]), embeddings)[0]
    indexes = np.argsort(similarities)[-top_k:][::-1]
    return [
        {
            "rank": rank,
            "grant_id": str(grants.iloc[index].get("opportunity_id", "")),
            "title": str(grants.iloc[index].get("opportunity_title", "")),
            "agency": str(grants.iloc[index].get("agency_name", "")),
            "category": str(grants.iloc[index].get("category_of_funding_activity", "")),
            "match_score": round(float(similarities[index]) * 100, 2),
        }
        for rank, index in enumerate(indexes, start=1)
    ]
