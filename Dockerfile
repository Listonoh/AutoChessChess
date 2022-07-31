FROM python:3



COPY requirements.txt .
RUN apt-get update && apt-get dist-upgrade -y && apt clean all
RUN pip install -r requirements.txt
RUN apt-get install -y stockfish

# install python dependencies
# COPY pyproject.toml /tmp/pyproject.toml
# COPY poetry.lock /tmp/poetry.lock
# COPY vendor_packages/ /tmp/vendor_packages/
# COPY pip.conf /root/.pip/pip.conf
# RUN python3 -m pip install --upgrade pip \
#     && pip3 install poetry \
#     && poetry config virtualenvs.create false \
#     && cd /tmp \
#     && REQUESTS_CA_BUNDLE=/etc/ssl/certs/ca-certificates.crt poetry lock \
#     && REQUESTS_CA_BUNDLE=/etc/ssl/certs/ca-certificates.crt poetry install


ENV PYTHON=python3
ENV PYTHONPATH=.
ENV PYTHONUNBUFFERED=1
RUN alias stockfish="/usr/games/stockfish"

WORKDIR /app
