FROM python:3.11-slim

WORKDIR /app

# If you have a requirements.txt file, uncomment these two lines:
 COPY requirements.txt .
 RUN pip install --no-cache-dir -r requirements.txt

# Install fastapi and uvicorn directly if you don't have a requirements.txt file
RUN pip install --no-cache-dir fastapi uvicorn pydantic

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
