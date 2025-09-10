# Dockerfile
FROM python:3.11-slim

WORKDIR /app

# copiar dependencias
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# copiar código
COPY . .

# puerto que usaremos dentro del contenedor
ENV PORT=8000
EXPOSE 8000

# Asume que tu archivo principal se llama app.py y contiene "app = Flask(...)"
# Usamos gunicorn en producción
CMD gunicorn --bind 0.0.0.0:8000 run:app --workers 4 --timeout 120
