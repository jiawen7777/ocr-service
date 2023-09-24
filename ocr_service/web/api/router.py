from fastapi.routing import APIRouter

from ocr_service.web.api import docs, echo, monitoring, process

api_router = APIRouter()
api_router.include_router(monitoring.router)
api_router.include_router(docs.router)
api_router.include_router(echo.router, prefix="/echo", tags=["echo"])
api_router.include_router(process.router, tags=["upload file"])
