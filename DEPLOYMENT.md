# Deploy

## 1. Setup
```bash
cp .env.example .env
# Edit .env: MODE=cloud, CLOUD_API_KEY=xxx
```

## 2. Run
```bash
docker-compose up -d --build
```

## 3. Info
- Frontend: Port 80
- Backend: Port 8000 (Internal)
- Health: `http://<ip>/health`
