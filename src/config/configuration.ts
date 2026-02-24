const nodeEnv = process.env.NODE_ENV ?? 'development';

const getEnv = (key: string, fallback?: string) =>
  process.env[key] !== undefined ? process.env[key] : fallback;

export const getDatabaseConfig = () => ({
  mongoUri: getEnv('MONGODB_URI', 'mongodb://127.0.0.1:27017/edutech'),
});

export default () => ({
  nodeEnv,
  port: parseInt(process.env.PORT ?? '3000', 10),
  app: {
    title: 'EduTech API',
    version: '1.0.0',
  },
  api: {
    prefix: getEnv('API_PREFIX', 'api'),
    version: getEnv('API_VERSION', 'v1'),
  },
  database: getDatabaseConfig(),
  storage: {
    type: 'cloudinary',
    cloudName: getEnv('CLOUDINARY_CLOUD_NAME', ''),
    apiKey: getEnv('CLOUDINARY_API_KEY', ''),
    apiSecret: getEnv('CLOUDINARY_API_SECRET', ''),
    folder: getEnv('CLOUDINARY_FOLDER', 'edutech'),
  },
  oauth: {
    google: {
      clientId: getEnv('GOOGLE_CLIENT_ID', 'dev-google-client-id'),
      clientSecret: getEnv('GOOGLE_CLIENT_SECRET', 'dev-google-client-secret'),
      callbackURL: getEnv(
        'GOOGLE_CALLBACK_URL',
        'http://localhost:3000/auth/google/callback',
      ),
    },
    facebook: {
      appId: getEnv('FACEBOOK_APP_ID', 'dev-facebook-app-id'),
      appSecret: getEnv('FACEBOOK_APP_SECRET', 'dev-facebook-app-secret'),
      callbackURL: getEnv(
        'FACEBOOK_CALLBACK_URL',
        'http://localhost:3000/auth/facebook/callback',
      ),
    },
  },
  cors: {
    origin: process.env.CORS_ORIGIN?.split(',').map((o) => o.trim()) ?? [
      'http://localhost:3000',
    ],
  },
});
