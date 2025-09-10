import io
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import ImageReader
from PIL import Image

def create_pdf(files):
    buffer = io.BytesIO()
    c = canvas.Canvas(buffer, pagesize=A4)
    width, height = A4

    x_positions = [90, 340]
    y_position = height - 250  

    for i, file in enumerate(files):
        img = Image.open(file.stream)

        if img.mode == "RGBA":
            img = img.convert("RGB")

        img_reader = ImageReader(img)

        # Aquí defines el tamaño con drawImage, no con thumbnail
        c.drawImage(img_reader, x_positions[i], y_position, width=200, height=200, preserveAspectRatio=True, anchor='c')

    c.save()
    buffer.seek(0)
    return buffer

