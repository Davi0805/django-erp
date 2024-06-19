# Dockerfile do Django
FROM python:3.10-slim

ENV DJANGO_SETTINGS_MODULE=backend.settings
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /code

COPY requirements.txt /code/
RUN pip install -r requirements.txt

COPY . /code/

CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
