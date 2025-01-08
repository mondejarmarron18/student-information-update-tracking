dev-server:
	@echo "Running dev server"
	docker compose --env-file ./server/.env up --build

dev-client:
	@echo "Running dev server"
	docker compose -f docker-compose.client.yml --env-file ./client/.env up --build

dev:
	@echo "Running dev client and server"
	${MAKE} dev-server & ${MAKE} dev-client

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

db:
	@echo "Running db"
	docker exec -it spius_db bash -c 'mongosh -u $$MONGO_INITDB_ROOT_USERNAME -p $$MONGO_INITDB_ROOT_PASSWORD --authenticationDatabase admin $$MONGO_INITDB_DATABASE'

.PHONY: prod stop log down db dev-client dev-server dev