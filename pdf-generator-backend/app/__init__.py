from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)

    # Configuración básica
    app.config['DEBUG'] = True
    app.config['SECRET_KEY'] = 'super-secret-key'  

    # Habilitar CORS (para que Angular pueda llamar al backend)
    CORS(app)

    # Importar y registrar rutas
    from .routes import register_routes
    register_routes(app)

    return app
