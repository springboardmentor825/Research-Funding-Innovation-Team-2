import httpx

from app.config.settings import USER_SERVICE_URL
from app.services.user_service import get_user_by_email
from app.utils.password import verify_password
from app.utils.jwt import create_access_token


class UserServiceUnavailableError(RuntimeError):
    pass


async def login(data):
    if USER_SERVICE_URL:
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                response = await client.get(f"{USER_SERVICE_URL}/api/users/email/{data.email}")
        except httpx.RequestError as error:
            raise UserServiceUnavailableError("User service is unavailable") from error
        if response.status_code != 200:
            return None
        try:
            user = response.json()
        except ValueError as error:
            raise UserServiceUnavailableError("User service returned an invalid response") from error
    else:
        user = get_user_by_email(data.email)
        if user is None:
            return None
    if not verify_password(
    data.password,
    user["password"]
        ):
        return None

    token = create_access_token({
        "sub": str(user["_id"]),
        "email": user["email"],
        "role": user["role_id"]
    })

    return {
        "token": token,
        "user": user
    }
