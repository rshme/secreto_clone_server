build :
	docker build -t secreto-clone-server .

run :
	docker run -d -p 8000:8000 --name secreto-clone-server secreto-clone-server

start :
	docker start secreto-clone-server

stop :
	docker stop secreto-clone-server

up:
	docker compose --env-file .env up -d

down:
	docker compose --env-file .env down