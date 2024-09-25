import dotenv from 'dotenv';
import path from 'path';

const envFilePath =
    process.env.NODE_ENV === 'production'
        ? path.resolve(__dirname, '../.env.production')
        : path.resolve(__dirname, '../.env.development');

dotenv.config({ path: envFilePath });

export const PORT = process.env.PORT ?? 3000;
export const DatabaseHost = process.env.DB_HOST;
export const DatabaseName = process.env.DB_NAME;
export const DatabaseUser = process.env.DB_USER;
export const DatabasePassword = process.env.DB_PASSWORD;
export const DB_DIALECT = process.env.DB_DIALECT;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const BCRYPT_SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;
export const SESSION_SECRET = process.env.SESSION_SECRET;
