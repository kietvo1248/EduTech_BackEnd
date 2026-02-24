# EduTech Backend API

## Requirements

- Node.js v20.0+
- Bun v1.0+
- MongoDB 6.0+

## Installation

```bash
bun install
```

Create a `.env` file in the root directory with the following variables:

```env
# Application
NODE_ENV=development
PORT=8888
APP_URL=http://localhost:8888
FRONTEND_URL=http://localhost:3000
CORS_ORIGIN=http://localhost:3000,http://localhost:8888

# Database
MONGO_URI=mongodb://localhost:27017/edutech
# Or use MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/edutech

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_SECRET=your_refresh_token_secret_here
REFRESH_TOKEN_EXPIRES_IN=30d

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:8888/auth-google/callback

# Facebook OAuth (optional)
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret
FACEBOOK_CALLBACK_URL=http://localhost:8888/auth-facebook/callback

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM_EMAIL=EduTech <no-reply@edutech.com>

# Cloudinary (optional)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Running the Application

```bash
# Run with hot reload
bun start:dev

# Run with debug mode
bun run start:debug
```

### Production

```bash
# Build application
bun run build

# Run production server
bun run start:prod
```

## API Documentation

After running the application, visit:

- Swagger UI: http://localhost:8888/swagger

## References

- [NestJS Documentation](https://docs.nestjs.com)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [MODULE_RULES.md](./docs/MODULE_RULES.md) - Module development rules
