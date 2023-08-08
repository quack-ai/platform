# this target runs checks on all files
quality:
	yarn lint:check
	yarn format:check

# this target runs checks on all files and potentially modifies some of them
style:
	yarn lint:fix
	yarn format:fix

# Build the docker
build:
	docker build . -t quackai/maintainer-platform:node18-alpine3.15

# Run the docker
run:
	docker compose up -d --build

# Run the docker
stop:
	docker compose down
