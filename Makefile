help:
	echo "Usage: make [target]"

venv:
	python3 -m venv .venv

install:
	pip install -r requirements.txt

build:
	sudo docker build . -t chess 

run:
	docker run -it -v $(shell dirname $(realpath $(firstword $(MAKEFILE_LIST)))):/app chess bash 

server: 
	docker run -v $(shell dirname $(realpath $(firstword $(MAKEFILE_LIST)))):/app chess ./manage.py runserver