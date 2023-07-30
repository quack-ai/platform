# this target runs checks on all files
quality:
	ruff check .
	mypy
	black --check .
	bandit -r . -c pyproject.toml

# this target runs checks on all files and potentially modifies some of them
style:
	black .
	ruff --fix .

# Pin the dependencies
lock:
	poetry lock

# Build the docker
build:
	poetry export -f requirements.txt --without-hashes --output requirements.txt
	docker build . -t quackai/contribution-platform:python3.9-slim

# Run the docker
run:
	poetry export -f requirements.txt --without-hashes --output requirements.txt
	docker compose up -d --build

# Run the docker
stop:
	docker compose down
