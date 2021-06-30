FROM python:3.9.5-slim-buster

WORKDIR /backend

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

EXPOSE 8000

# system deps
RUN apt-get update && \
		apt-get -y --no-install-recommends install netcat gcc libc-dev libxml2 && \
		rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# install python deps
# RUN pip install --upgrade pip wheel setuptools
# COPY ./requirements.txt /backend/requirements.txt
# RUN pip install -r requirements.txt
COPY poetry.lock pyproject.toml ./
RUN pip install poetry~=1.1 && \
		poetry config virtualenvs.create false && \
		poetry install --no-dev

# clean up
RUN apt-get purge -y gcc && apt-get clean && apt-get -y autoremove

COPY . /backend

# remove this when using compose
CMD uvicorn --host=0.0.0.0 app.main:app