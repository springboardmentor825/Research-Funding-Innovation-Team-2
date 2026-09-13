"""Read-only, server-paginated access to local research datasets."""

from __future__ import annotations

from fastapi import APIRouter, HTTPException, Query, Request

from app.services import dataset_service
from app.utils.dataset_loader import DatasetFileMissingError, InvalidDatasetFilterError, UnknownDatasetError


router = APIRouter(prefix="/api/datasets", tags=["Datasets"])


def _raise_dataset_error(error: Exception) -> None:
    if isinstance(error, UnknownDatasetError):
        raise HTTPException(status_code=404, detail=str(error)) from error
    if isinstance(error, DatasetFileMissingError):
        raise HTTPException(status_code=404, detail=str(error)) from error
    if isinstance(error, InvalidDatasetFilterError):
        raise HTTPException(status_code=422, detail=str(error)) from error
    raise error


@router.get("", summary="List dataset record counts")
def get_datasets():
    """Return counts for all configured local datasets and their total."""
    try:
        return dataset_service.list_datasets()
    except (UnknownDatasetError, DatasetFileMissingError, InvalidDatasetFilterError) as error:
        _raise_dataset_error(error)


@router.get("/{dataset}/count", summary="Get one dataset's record count")
def get_dataset_count(dataset: str):
    try:
        return dataset_service.dataset_count(dataset)
    except (UnknownDatasetError, DatasetFileMissingError, InvalidDatasetFilterError) as error:
        _raise_dataset_error(error)


@router.get("/{dataset}/search", summary="Search a dataset with server-side pagination")
def search_dataset(
    dataset: str,
    request: Request,
    q: str | None = Query(default=None, description="Case-insensitive free-text search."),
    page: int = Query(default=1, ge=1, description="One-based page number."),
    limit: int = Query(default=20, ge=1, le=100, description="Rows per page; maximum 100."),
):
    """Filters are exact, case-insensitive matches on actual source-column names."""
    reserved = {"q", "page", "limit"}
    filters = {key: value for key, value in request.query_params.items() if key not in reserved}
    try:
        return dataset_service.search_dataset(dataset, q, filters, page, limit)
    except (UnknownDatasetError, DatasetFileMissingError, InvalidDatasetFilterError) as error:
        _raise_dataset_error(error)


@router.get("/{dataset}/data", summary="Get raw dataset rows with server-side pagination")
def get_dataset_data(
    dataset: str,
    page: int = Query(default=1, ge=1, description="One-based page number."),
    limit: int = Query(default=20, ge=1, le=100, description="Rows per page; maximum 100."),
):
    try:
        return dataset_service.get_dataset_data(dataset, page, limit)
    except (UnknownDatasetError, DatasetFileMissingError, InvalidDatasetFilterError) as error:
        _raise_dataset_error(error)
