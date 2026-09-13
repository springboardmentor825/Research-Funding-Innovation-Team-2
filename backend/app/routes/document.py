from fastapi import APIRouter, UploadFile, File, HTTPException, Form
from typing import Optional

from app.services.document_service import DocumentService
from app.config.supabase_client import SupabaseConfigurationError

router = APIRouter(
    prefix="/api/documents",
    tags=["Documents"]
)


def _document_service_error(error: SupabaseConfigurationError) -> None:
    raise HTTPException(status_code=503, detail=str(error)) from error


@router.post("")
async def upload_document(
    file: UploadFile = File(...),
    entity_type: str = Form(...),
    entity_id: Optional[str] = Form(None)
):
    file_bytes = await file.read()

    try:
        document = await DocumentService.upload_document(
            file_bytes, file.filename, file.content_type, entity_type, entity_id
        )
    except SupabaseConfigurationError as error:
        _document_service_error(error)

    return document


@router.get("")
async def get_documents(entity_type: Optional[str] = None, entity_id: Optional[str] = None):
    try:
        return await DocumentService.get_documents(entity_type, entity_id)
    except SupabaseConfigurationError as error:
        _document_service_error(error)


@router.get("/{document_id}")
async def get_document(document_id: str):

    try:
        document = await DocumentService.get_document(document_id)
    except SupabaseConfigurationError as error:
        _document_service_error(error)

    if not document:
        raise HTTPException(404, "Document not found")

    return document


@router.put("/{document_id}")
async def update_document(document_id: str, file: UploadFile = File(...)):

    file_bytes = await file.read()

    try:
        document = await DocumentService.update_document(
            document_id, file_bytes, file.filename, file.content_type
        )
    except SupabaseConfigurationError as error:
        _document_service_error(error)

    if not document:
        raise HTTPException(404, "Document not found")

    return document


@router.delete("/{document_id}")
async def delete_document(document_id: str):

    try:
        success = await DocumentService.delete_document(document_id)
    except SupabaseConfigurationError as error:
        _document_service_error(error)

    if not success:
        raise HTTPException(404, "Document not found")

    return {"message": "Document deleted successfully"}
