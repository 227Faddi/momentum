# [Momentum](https://momentumgoal.netlify.app) - Goal Tracking Platform

## 📖 Description

A goal-tracking platform that helps users set and achieve their goals. Users can categorize their goals into three types, earn points for completing them, and compete with others on the leaderboard.

## 📊 Features

- Set and track short-term or long-term goals
- Organize goals into three distinct categories
- Earn points for completed goals and climb the leaderboard

## 🛠 Tech Stack

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

## 🚀 Getting Started

### 📦 Installation

```
git clone git@github.com:227Faddi/momentum.git
```

- Client

```
cd client
```

```
npm install
```

- Server

```
cd server
```

```
npm install
```

### ⚙️ Environment Variables

- Client

Create a .env file in the root directory of your project and fill in the following values:

```
VITE_SERVER_URL=your_server_url
VITE_GUEST_EMAIL=your_guest_email
VITE_GUEST_PASSWORD=your_guest_password
```

- Server

Create a .env file in the root directory and fill in the following values:

```
SERVER_PORT=your_server_port
DB_STRING=your_mongodb_connection_string
SERVER_URL=your_server_url
CLIENT_URL=your_client_url
JWT_ACCESS_TOKEN_SECRET=your_access_token_secret
JWT_REFRESH_TOKEN_SECRET=your_refresh_token_secret
JWT_ACCESS_TOKEN_EXPIRATION=your_access_token_expiration
JWT_REFRESH_TOKEN_EXPIRATION=your_refresh_token_expiration
```

### ▶️ Running the Project

- Client

```
cd client
```

```
npm run dev
```

- Server

```
cd server
```

```
npm run dev
```

### 🚀 CI/CD Setup

The project includes a CI/CD pipeline using GitHub Actions to automate deployment.

1. Navigate to your repository on GitHub.

2. Go to Settings > Secrets and variables > Actions.

3. Click New repository secret and add the following secrets:

Server:

```
VERCEL_ORG_ID=your_vercel_org_id
VERCEL_PROJECT_ID=your_vercel_project_id
VERCEL_TOKEN=your_vercel_token
```

Client:

```
NETLIFY_SITE_ID=your_netlify_site_id
NETLIFY_TOKEN=your_netlify_token
```

Once added, GitHub Actions will use these secrets to deploy the project automatically.

## More

Explore more of my recent projects on my [Portfolio](https://faliloukhouma.com).
