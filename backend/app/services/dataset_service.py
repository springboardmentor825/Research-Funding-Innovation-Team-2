"""Business operations for the local dataset API."""

from __future__ import annotations

import math

from app.utils.dataset_loader import (
    DATASETS,
    count_rows,
    paginated_rows,
    search_rows,
    validate_filters,
)


def _pagination(total: int, page: int, limit: int) -> dict[str, int | bool]:
    pages = math.ceil(total / limit) if total else 0
    return {"total_pages": pages, "has_next": page < pages, "has_previous": page > 1}


def list_datasets() -> dict:
    datasets = [{"name": name, "count": count_rows(name)} for name in DATASETS]
    return {"datasets": datasets, "total": sum(item["count"] for item in datasets)}


def dataset_count(dataset: str) -> dict:
    return {"dataset": dataset, "total": count_rows(dataset)}


def search_dataset(dataset: str, query: str | None, filters: dict[str, str], page: int, limit: int) -> dict:
    validated_filters = validate_filters(dataset, filters)
    total, data = search_rows(dataset, query, validated_filters, page, limit)
    return {
        "dataset": dataset,
        "query": query or "",
        "total": total,
        "page": page,
        "limit": limit,
        **_pagination(total, page, limit),
        "data": data,
    }


def get_dataset_data(dataset: str, page: int, limit: int) -> dict:
    total, data = paginated_rows(dataset, page, limit)
    return {
        "dataset": dataset,
        "total": total,
        "page": page,
        "limit": limit,
        **_pagination(total, page, limit),
        "data": data,
    }
