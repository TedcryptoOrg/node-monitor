.PHONY: up stop

up:
	npm run start

stop:
	kill $$(lsof -t -i:3000)

.PHONY: docker-build docker.build
docker-build docker.build:
	docker build -f docker/Dockerfile -t ted-node-monitor-frontend-v2 .

.PHONY: docker-run docker.run
docker-run docker.run:
	docker run -d -p 3000:3000 ted-node-monitor-frontend-v2

.PHONY: docker-stop docker.stop
docker-stop docker.stop:
	docker stop $$(docker ps -q --filter ancestor=ted-node-monitor-frontend-v2)