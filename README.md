# Book Management API

A RESTful API for book management system built with TypeScript and Express.js.

## Technologies Used

- Node.js
- TypeScript
- Express.js
- Docker
- Morgan (logging)
- CORS

## Project Structure

```
project-root/
├── src/
│   ├── routes/        # Route definitions
│   ├── controllers/   # Route controllers
│   ├── models/        # Data models
│   ├── middleware/    # Custom middleware
│   └── index.ts       # App entry point
├── .env              # Environment variables
├── .env.example      # Environment variables example
├── Dockerfile        # Docker configuration
├── docker-compose.yml # Docker compose configuration
├── tsconfig.json     # TypeScript configuration
├── package.json      # Project dependencies
└── README.md         # Project documentation
```

## System Requirements

- Node.js (v14 or higher)
- npm or yarn
- Docker (optional)

## Setup and Running

### Local Development

1. Clone repository:
```bash
git clone <repository-url>
cd book-management
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment:
```bash
cp .env.example .env
```

4. Run in development mode:
```bash
npm run dev
```

### Using Docker

1. Build and run containers:
```bash
docker-compose up
```

2. Build containers only:
```bash
docker-compose build
```

## Available Scripts

- `npm run dev`: Run development server with hot-reload
- `npm run build`: Build TypeScript to JavaScript
- `npm start`: Run the built application in production
- `npm run lint`: Run ESLint for code linting

## API Endpoints

### Base URL
```
http://localhost:3000
```

### Endpoints

- `GET /`: Health check endpoint
  - Response: `{ "message": "success" }`

(More endpoints will be added later) 