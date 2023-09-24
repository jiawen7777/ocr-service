from fastapi import APIRouter

from fastapi import FastAPI, UploadFile
from fastapi.responses import JSONResponse
import pytesseract
from PIL import Image
import io

router = APIRouter()

@router.post("/upload/")
async def upload_file(file: UploadFile):
    if file.content_type.startswith("image/"):
        image = Image.open(io.BytesIO(await file.read()))
        text = pytesseract.image_to_string(image)
        return JSONResponse(content={"text": text})
    else:
        return JSONResponse(content={"error": "Invalid file format"}, status_code=400)
