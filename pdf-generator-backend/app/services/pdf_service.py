import io
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import ImageReader
from PIL import Image

def create_pdf(files):
    buffer = io.BytesIO()
    c = canvas.Canvas(buffer, pagesize=A4)
    width, height = A4

    # Posiciones de las imágenes (arriba y separadas)
    x_positions = [100, 350]
    y_position = height - 250  

    for i, file in enumerate(files):
        img = Image.open(file.stream)
        img.thumbnail((200, 200))  # reducir tamaño

        # 👇 Si la imagen tiene transparencia, conviértela a RGB
        if img.mode == "RGBA":
            img = img.convert("RGB")

        # 👇 Usar ImageReader en lugar de BytesIO
        img_reader = ImageReader(img)

        c.drawImage(img_reader, x_positions[i], y_position, width=200, height=200)

    c.save()
    buffer.seek(0)
    return buffer
