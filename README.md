# 📍 Lost and Found

A full-stack application that allows users to add pins to a map for found or lost items. The application is built using **React** (frontend) and **Node.js** (backend), with **Prisma**, **PostgreSQL**, and **Redis** for data management. It runs using **Docker Compose** for easy deployment.

## 🚀 Features

- 📌 Add pins for lost or found items.
- 🗺️ Interactive map with real-time updates.
- 📊 Data stored in PostgreSQL, managed with Prisma.
- ⚡ Fast caching with Redis.
- 🐳 Dockerized setup for easy deployment.

## 🏗 Tech Stack

- **Frontend:** React, TypeScript
- **Backend:** Node.js, Express
- **Database:** PostgreSQL (via Prisma ORM)
- **Cache:** Redis
- **Containerization:** Docker, Docker Compose

## 🛠️ Setup & Installation

### Prerequisites

- Docker & Docker Compose installed
- Node.js (if running locally)
- PostgreSQL & Redis (if running without Docker)

### Running with Docker Compose

1. Clone the repository:
   ```bash
   git clone https://github.com/synonim789/lost-and-found.git
   cd lost-and-found
   ```
2. Start the application:
   ```bash
   docker-compose up --build
   ```

### Running Locally (Without Docker)

1. Install dependencies:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```
2. Set up environment variables:
   - Create a `.env` file in the `backend/` directory:
     ```ini
     DATABASE_URL=postgresql://user:password@localhost:5432/lostandfound
     SECRET=secret_for_a_jwt
     ```
3. Start the backend:
   ```bash
   cd backend
   npm run dev
   ```
4. Start the frontend:
   ```bash
   cd frontend
   npm run dev
   ```
