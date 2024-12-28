dev:
	@echo "Running dev server"
	docker compose --env-file ./server/.env up --build

prod: 
	@echo "Running production server"
	docker compose --env-file ./server/.env up --build --detach

down:
	@echo "Stopping server"
	docker compose down

log:
	@echo "Showing logs for: ${service}"
	docker compose --env-file ./server/.env  logs -f ${service}

stop:
	@echo "Stopping server ${service}"
	docker compose --env-file ./server/.env stop ${service}

.PHONY: dev prod stop log down