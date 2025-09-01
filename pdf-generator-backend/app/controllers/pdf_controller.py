from flask import request, send_file
from app.services.pdf_service import create_pdf

def generate_pdf():
    files = request.files.getlist("images")

    if len(files) != 2:
        return {"error": "Debes subir exactamente 2 imágenes."}, 400

    pdf_buffer = create_pdf(files)

    return send_file(
        pdf_buffer,
        as_attachment=True,
        download_name="documento.pdf",
        mimetype="application/pdf"
    )
