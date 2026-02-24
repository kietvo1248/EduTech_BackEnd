import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(3000),
  API_PREFIX: Joi.string().default('api'),
  API_VERSION: Joi.string().default('v1'),
  // Database (defaults for development)
  MONGODB_URI: Joi.string().default('mongodb://127.0.0.1:27017/edutech'),
  // Cloudinary
  CLOUDINARY_CLOUD_NAME: Joi.string().allow('').optional(),
  CLOUDINARY_API_KEY: Joi.string().allow('').optional(),
  CLOUDINARY_API_SECRET: Joi.string().allow('').optional(),
  CLOUDINARY_FOLDER: Joi.string().allow('').optional().default('edutech'),
  FFMPEG_PATH: Joi.string().allow('').optional(),
  FFPROBE_PATH: Joi.string().allow('').optional(),
  // OAuth: required in production, defaults in development
  GOOGLE_CLIENT_ID: Joi.string().when('NODE_ENV', {
    is: 'production',
    then: Joi.required(),
    otherwise: Joi.string()
      .allow('')
      .optional()
      .default('dev-google-client-id'),
  }),
  GOOGLE_CLIENT_SECRET: Joi.string().when('NODE_ENV', {
    is: 'production',
    then: Joi.required(),
    otherwise: Joi.string()
      .allow('')
      .optional()
      .default('dev-google-client-secret'),
  }),
  GOOGLE_CALLBACK_URL: Joi.string().when('NODE_ENV', {
    is: 'production',
    then: Joi.required(),
    otherwise: Joi.string()
      .allow('')
      .optional()
      .default('http://localhost:8888/auth/google/callback'),
  }),
  FACEBOOK_APP_ID: Joi.string().when('NODE_ENV', {
    is: 'production',
    then: Joi.required(),
    otherwise: Joi.string().allow('').optional().default('dev-facebook-app-id'),
  }),
  FACEBOOK_APP_SECRET: Joi.string().when('NODE_ENV', {
    is: 'production',
    then: Joi.required(),
    otherwise: Joi.string()
      .allow('')
      .optional()
      .default('dev-facebook-app-secret'),
  }),
  FACEBOOK_CALLBACK_URL: Joi.string().when('NODE_ENV', {
    is: 'production',
    then: Joi.required(),
    otherwise: Joi.string()
      .allow('')
      .optional()
      .default('http://localhost:8888/auth/facebook/callback'),
  }),
  // JWT: required in production, default in development
  JWT_SECRET: Joi.string().when('NODE_ENV', {
    is: 'production',
    then: Joi.required(),
    otherwise: Joi.string().allow('').optional().default('dev_jwt_secret'),
  }),
  CORS_ORIGIN: Joi.string().default(
    'http://localhost:8888,http://localhost:8888',
  ),
  UPLOAD_FREE_MINUTES: Joi.number().positive().default(180),
  UPLOAD_PRO_MINUTES: Joi.number().min(0).default(0),
  UPLOAD_MAX_FILE_SIZE_BYTES: Joi.number()
    .positive()
    .default(4 * 1024 * 1024 * 1024),
});
