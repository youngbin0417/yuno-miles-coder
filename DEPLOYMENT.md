# Deployment Guide for AWS EC2

This guide outlines how to deploy Yuno Miles Coder on an AWS EC2 instance using Docker and Nginx.

## Prerequisites
- AWS EC2 Instance (Amazon Linux 2 or Ubuntu recommended)
- Docker and Docker Compose installed on the instance
- Security Group allowing inbound traffic on port 80 (and 443 if using SSL)

## Deployment Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd troll-coder
   ```

2. **Setup Environment Variables**
   Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your `CLOUD_API_KEY` (Gemini API Key) and set `MODE=cloud` for the simplest EC2 setup.

3. **Deploy with Docker Compose**
   ```bash
   docker-compose up -d --build
   ```

## Architecture Details

- **Nginx (Frontend Container)**: 
  - Serves built static files of the React/Vite application.
  - Proxies all `/api/*` requests to the Backend container.
  - Listening on port 80.
- **FastAPI (Backend Container)**:
  - Processes AI requests.
  - Internal communication on port 8000.

## Troubleshooting

- **Logs**: `docker-compose logs -f`
- **Rebuild**: `docker-compose up -d --build --force-recreate`
- **Check Backend**: `curl http://localhost:8000/health` (internal)
- **Check Frontend**: `curl http://localhost/`
