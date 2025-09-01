from .controllers import pdf_controller

def register_routes(app):
    # Ruta simple para probar
    @app.route("/", methods=["GET"])
    def home():
        return {"message": "Servidor Flask funcionando ✅"}

    # Ruta para generar PDF
    app.add_url_rule(
        "/generate-pdf",
        view_func=pdf_controller.generate_pdf,
        methods=["POST"]
    )
