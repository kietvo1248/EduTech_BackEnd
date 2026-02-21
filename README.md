# 🎓 EduTech Backend

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="100" alt="NestJS Logo" />
</p>

<p align="center">
  Backend API cho nền tảng học tập trực tuyến <strong>EduTech</strong>, xây dựng bằng NestJS + Prisma + PostgreSQL.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-v11-red?logo=nestjs" />
  <img src="https://img.shields.io/badge/Prisma-v6-2D3748?logo=prisma" />
  <img src="https://img.shields.io/badge/PostgreSQL-15-336791?logo=postgresql" />
  <img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript" />
</p>

---

## 📋 Mục lục

- [Giới thiệu](#-giới-thiệu)
- [Yêu cầu hệ thống](#-yêu-cầu-hệ-thống)
- [Cài đặt](#-cài-đặt)
- [Cấu hình môi trường](#-cấu-hình-môi-trường)
- [Chạy Database](#-chạy-database)
- [Chạy ứng dụng](#-chạy-ứng-dụng)
- [Seed dữ liệu mẫu](#-seed-dữ-liệu-mẫu)
- [Tài liệu API (Swagger)](#-tài-liệu-api-swagger)
- [Cấu trúc dự án](#-cấu-trúc-dự-án)
- [Các lệnh hữu ích](#-các-lệnh-hữu-ích)

---

## 🚀 Giới thiệu

**EduTech Backend** cung cấp REST API cho ứng dụng học tập trực tuyến dành cho học sinh THPT, bao gồm:

- 🔐 Xác thực JWT (Access Token + Refresh Token) & Google OAuth
- 👤 Quản lý tài khoản theo vai trò: Admin, Giáo viên, Học sinh, Phụ huynh
- 📚 Quản lý khóa học, chương, bài giảng, tài liệu, câu hỏi
- 💳 Gói đăng ký và giao dịch thanh toán
- 📊 Theo dõi tiến trình học tập
- 🔔 Hệ thống thông báo

---

## 💻 Yêu cầu hệ thống

| Công cụ | Phiên bản tối thiểu |
|---|---|
| Node.js | v18+ |
| pnpm | v8+ |
| Docker & Docker Compose | Bất kỳ phiên bản ổn định |
| PostgreSQL | v15 (qua Docker hoặc NeonDB) |

> **Cài pnpm** (nếu chưa có):
> ```bash
> npm install -g pnpm
> ```

---

## ⚙️ Cài đặt

**1. Clone repository**

```bash
git clone <repository-url>
cd edutech-backend
```

**2. Cài đặt các dependencies**

```bash
pnpm install
```

---

## 🔑 Cấu hình môi trường

Tạo file `.env` ở thư mục gốc (copy từ mẫu dưới đây):

```env
# Cổng chạy server
PORT=6969

# DATABASE
# Chọn 1 trong 2 cách kết nối:

# Cách 1 — Local Docker (dùng khi chạy docker-compose):
DATABASE_URL="postgresql://kietvo:2468@localhost:5432/edutech_db?schema=public"

# Cách 2 — NeonDB (cloud, dùng khi deploy hoặc không muốn cài Docker):
# DATABASE_URL="postgresql://<user>:<password>@<host>/neondb?sslmode=require"

# JWT
JWT_ACCESS_SECRET="<chuỗi_bí_mật_access>"
JWT_REFRESH_SECRET="<chuỗi_bí_mật_refresh>"
JWT_ACCESS_EXPIRES="15m"
JWT_REFRESH_EXPIRES="7d"

# GOOGLE OAUTH (lấy từ Google Cloud Console)
GOOGLE_CLIENT_ID="<google_client_id>"
GOOGLE_CLIENT_SECRET="<google_client_secret>"
GOOGLE_CALLBACK_URL="http://localhost:6969/api/auth/google/callback"

# URL của Frontend (để redirect sau Google Login)
FRONTEND_URL="http://localhost:3000"
```

> ⚠️ **Không commit file `.env` lên Git.** File này đã được thêm vào `.gitignore`.

---

## 🐘 Chạy Database

### Cách 1: Dùng Docker (khuyên dùng cho local dev)

```bash
# Khởi động PostgreSQL bằng Docker Compose
docker-compose up -d
```

PostgreSQL sẽ chạy tại `localhost:5432` với:
- **User:** `kietvo`
- **Password:** `2468`
- **Database:** `edutech_db`

### Cách 2: Dùng NeonDB (cloud)

Truy cập [neon.tech](https://neon.tech), tạo project và lấy connection string dán vào `DATABASE_URL` trong `.env`.

---

### Migrate Database (bắt buộc lần đầu)

Sau khi database đã chạy, chạy lệnh migrate để tạo các bảng:

```bash
pnpm prisma migrate dev
```

Hoặc nếu chỉ muốn đồng bộ schema mà không tạo file migration:

```bash
pnpm prisma db push
```

---

## ▶️ Chạy ứng dụng

```bash
# Môi trường development (hot-reload)
pnpm start:dev

# Môi trường production
pnpm build
pnpm start:prod
```

Server sẽ chạy tại: **http://localhost:6969**

---

## 🌱 Seed dữ liệu mẫu

Lệnh này sẽ **xóa toàn bộ dữ liệu cũ** và tạo lại dữ liệu mẫu đầy đủ:

```bash
npx ts-node -r tsconfig-paths/register src/database/seed.ts
```

Sau khi seed thành công, các tài khoản mặc định (mật khẩu đều là `123456`):

| Vai trò | Email |
|---|---|
| 👑 Admin | `admin@edutech.com` |
| 👨‍🏫 Giáo viên | `teacher@edutech.com` |
| 👨‍👩‍👦 Phụ huynh | `parent@edutech.com` |
| 🎒 Học sinh | `student@edutech.com` |

Dữ liệu mẫu bao gồm:
- 12 môn học, 7 cấp lớp (lớp 6–12), 3 gói đăng ký
- 10 khóa học, 20 chương, ~30 bài giảng, tài liệu, câu hỏi trắc nghiệm
- 15 sessions, transactions, tiến trình học tập, thông báo

---

## 📖 Tài liệu API (Swagger)

Sau khi server đang chạy, truy cập:

```
http://localhost:6969/api
```

Swagger UI sẽ hiển thị toàn bộ các endpoint với mô tả, request/response schema và cho phép test trực tiếp.

### Xác thực trên Swagger

1. Gọi `POST /api/auth/login` để lấy `access_token`
2. Nhấn nút **Authorize 🔒** ở góc trên phải
3. Nhập: `Bearer <access_token>`
4. Nhấn **Authorize** → thực hiện các request cần xác thực

---

## 📁 Cấu trúc dự án

```
edutech-backend/
├── prisma/
│   ├── schema.prisma        # Định nghĩa database schema
│   └── migrations/          # Các file migration
│
├── src/
│   ├── common/
│   │   ├── decorators/      # Custom decorators (@GetCurrentUser, ...)
│   │   └── guards/          # JWT Guards (AtGuard, RtGuard)
│   │
│   ├── database/
│   │   └── seed.ts          # Script tạo dữ liệu mẫu
│   │
│   ├── module/
│   │   ├── auth/            # Xác thực (login, register, refresh, Google OAuth)
│   │   │   ├── dto/
│   │   │   └── strategies/  # JWT & Google Passport strategies
│   │   └── users/           # Quản lý người dùng
│   │
│   ├── prisma/
│   │   └── prisma.service.ts  # PrismaClient singleton
│   │
│   ├── app.module.ts
│   └── main.ts              # Entry point, Swagger config
│
├── docker-compose.yml       # PostgreSQL container
├── .env                     # Biến môi trường (không commit)
└── package.json
```

---

## 🛠️ Các lệnh hữu ích

```bash
# Chạy dev server (hot-reload)
pnpm start:dev

# Build production
pnpm build

# Xem Prisma Studio (GUI quản lý database)
pnpm prisma studio

# Tạo migration mới sau khi sửa schema
pnpm prisma migrate dev --name <tên_migration>

# Đồng bộ schema không tạo migration (dev nhanh)
pnpm prisma db push

# Generate lại Prisma Client
pnpm prisma generate

# Seed dữ liệu mẫu
npx ts-node -r tsconfig-paths/register src/database/seed.ts

# Lint & format code
pnpm lint
pnpm format

# Chạy unit tests
pnpm test

# Chạy test với coverage
pnpm test:cov
```
