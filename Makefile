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

down-server:
	@echo "Stopping server"
	docker compose --env-file ./server/.env down

down-client:
	@echo "Stopping client"
	docker compose -f docker-compose.client.yml --env-file ./client/.env down

down:
	@echo "Stopping server and client"
	${MAKE} down-server & ${MAKE} down-client

log-server:
	@echo "Showing logs for server"
	docker compose --env-file ./server/.env  logs -f api

log-client:
	@echo "Showing logs for client"
	docker compose -f docker-compose.client.yml --env-file ./client/.env  logs -f client

log:
	@echo "Showing logs for server and client"
	${MAKE} log-server & ${MAKE} log-client

stop-server:
	@echo "Stopping server "
	docker compose --env-file ./server/.env stop api

stop-client:
	@echo "Stopping client "
	docker compose -f docker-compose.client.yml --env-file ./client/.env stop client

stop:
	@echo "Stopping server and client"
	${MAKE} stop-server & ${MAKE} stop-client

db:
	@echo "Running db"
	docker exec -it spius_db bash -c 'mongosh -u $$MONGO_INITDB_ROOT_USERNAME -p $$MONGO_INITDB_ROOT_PASSWORD --authenticationDatabase admin $$MONGO_INITDB_DATABASE'

.PHONY: prod stop-server stop-client stop log down-server down-client down db dev-client dev-server dev