back-up:
	docker compose up -d --build

back-bash:
	docker compose exec back /bin/bash

back-down:
	docker compose down -v

front-up:
	cd front && docker compose up -d

front-down:
	cd front && docker compose down -v

front-install:
	cd front && docker compose exec nodejs npm install

front-dev:
	cd front && docker compose exec nodejs npm run dev

front-next_secret:
	cd front && openssl rand -base64 32

front-bash:
	cd front && docker compose exec nodejs /bin/sh

front-dpm:
	cd front && docker compose exec nodejs npx prisma migrate dev

front-seed:
	cd front && docker compose exec nodejs npx prisma db push --force-reset
	cd front && docker compose exec nodejs npx prisma db seed
