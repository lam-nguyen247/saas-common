# SaaSCommon - Docker

## Getting started

-   copy `src\.env.example` to `.env` file or run command:

```
    cp .env.example .env
```

-   RUN command:

```
    docker compose build
    docker compose up -d
```

-   Build production for frontend by command:

```
    docker ps
    //find container [container_app]
    docker exec -it [container_app] sh
    cd frontend
    npm install
    cp .env.example .env
    npm run build
```
