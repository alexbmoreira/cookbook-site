# Two's Company Cookbook

## App Overview

Backend is a Rails app that runs in Docker. It can be started with:
```bash
docker compose up -d --build
```

Frontend runs in React, it can be run with:
```bash
cd client && npm run dev
```

Frontend and backend run separately. Backend is API-only an dthe frontend hits it for recipes in JSON format.

Frontend uses Mobx for state management.

## Deployment

Backend is deployed on Fly.io. Frontend is deployed on Firebase.
