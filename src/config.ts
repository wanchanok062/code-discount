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
