from fastapi import APIRouter, Depends, Response, HTTPException
from fastapi import HTTPException
from fastapi import Response
from app.middleware.auth import get_current_user
from app.schemas.auth import LoginRequest, RegisterRequest
from app.services.auth_service import UserServiceUnavailableError, login
from app.services.user_service import create_user

router = APIRouter(prefix="/api/auth", tags=["Authentication"])


@router.post("/register", status_code=201)
async def register_user(data: RegisterRequest):
    try:
        user_id = create_user(data.model_dump())
    except Exception as error:
        raise HTTPException(status_code=400, detail=str(error)) from error
    if user_id is None:
        raise HTTPException(status_code=400, detail="Email already exists")
    return {"message": "User created successfully", "id": user_id}

@router.post("/login")
async def login_user(
    data: LoginRequest,
    response: Response
):

    try:
        result = await login(data)
    except UserServiceUnavailableError as error:
        raise HTTPException(status_code=503, detail=str(error)) from error

    if not result:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    response.set_cookie(
        key="access_token",
        value=result["token"],
        httponly=True,
        secure=False,      # True in production with HTTPS
        samesite="lax",
        max_age=3600,
    )

    return {
        "message": "Login successful",
        "user": result["user"]
    }
@router.get("/me")
async def me(user=Depends(get_current_user)):
    return user

@router.post("/logout")
async def logout_user(response: Response):
    response.delete_cookie("access_token")
    return {"message": "Logged out successfully"}
