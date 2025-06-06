# Book Management API

RESTful API cho hệ thống quản lý sách sử dụng TypeScript và Express.js.

## Công nghệ sử dụng

- Node.js
- TypeScript
- Express.js
- Docker
- Morgan (logging)
- CORS

## Cấu trúc thư mục

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

## Yêu cầu hệ thống

- Node.js (v14 trở lên)
- npm hoặc yarn
- Docker (tùy chọn)

## Cài đặt và Chạy

### Phát triển local

1. Clone repository:
```bash
git clone <repository-url>
cd book-management
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Tạo file môi trường:
```bash
cp .env.example .env
```

4. Chạy ở môi trường development:
```bash
npm run dev
```

### Sử dụng Docker

1. Build và chạy container:
```bash
docker-compose up
```

2. Chỉ build container:
```bash
docker-compose build
```

## Scripts có sẵn

- `npm run dev`: Chạy môi trường development với hot-reload
- `npm run build`: Build TypeScript thành JavaScript
- `npm start`: Chạy ứng dụng đã được build
- `npm run lint`: Kiểm tra lỗi với ESLint

## API Endpoints

### Base URL
```
http://localhost:3000
```

### Endpoints

- `GET /`: Health check endpoint
  - Response: `{ "message": "success" }`

(Các endpoint khác sẽ được thêm vào sau) 