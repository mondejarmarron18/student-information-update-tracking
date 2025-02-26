SERVER = "docker-compose.yml"
SERVER_ENV = "server/.env"
CLIENT = "docker-compose.client.yml"
CLIENT_ENV = "client/.env"

build-server:
	@echo "Building server"
	docker compose -f ${SERVER} --env-file ${SERVER_ENV} build

dev-server: build-server
	@echo "Running dev server"
	docker compose -f ${SERVER} --env-file ${SERVER_ENV} up --build

dev-client:
	@echo "Running dev server"
	docker compose -f ${CLIENT} --env-file ${CLIENT_ENV} up --build

dev:
	@echo "Running dev client and server"
	${MAKE} dev-server & ${MAKE} dev-client

prod: 
	@echo "Running production server"
	docker compose --env-file ${SERVER_ENV} up --build --detach

down-server:
	@echo "Stopping server"
	docker compose --env-file ${SERVER_ENV} down

down-client:
	@echo "Stopping client"
	docker compose -f ${CLIENT} --env-file ${CLIENT_ENV} down

down:
	@echo "Stopping server and client"
	${MAKE} down-server & ${MAKE} down-client

log-server:
	@echo "Showing logs for server"
	docker compose -f ${SERVER} --env-file ${SERVER_ENV}  logs -f api

log-client:
	@echo "Showing logs for client"
	docker compose -f ${CLIENT} --env-file ${CLIENT_ENV}  logs -f client

log:
	@echo "Showing logs for server and client"
	${MAKE} log-server & ${MAKE} log-client

stop-server:
	@echo "Stopping server "
	docker compose --env-file ${SERVER_ENV} stop api

stop-client:
	@echo "Stopping client "
	docker compose -f ${CLIENT} --env-file ${CLIENT_ENV} stop client

stop:
	@echo "Stopping server and client"
	${MAKE} stop-server & ${MAKE} stop-client

db:
	@echo "Running db"
	docker exec -it spius_db bash -c 'mongosh -u $$MONGO_INITDB_ROOT_USERNAME -p $$MONGO_INITDB_ROOT_PASSWORD --authenticationDatabase admin $$MONGO_INITDB_DATABASE'

.PHONY: prod stop-server stop-client stop log down-server down-client down db dev-client dev-server dev