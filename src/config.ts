import dotenv from 'dotenv';
import path from 'path';

// Determine which .env file to load based on NODE_ENV
const envFilePath =
    process.env.NODE_ENV === 'production'
        ? path.resolve(__dirname, '../.env.production')
        : path.resolve(__dirname, '../.env.development');

// Load the environment variables from the appropriate .env file
dotenv.config({ path: envFilePath });

// Export the PORT variable
export const PORT = process.env.PORT ?? 3000;
export const DatabaseHost = process.env.DB_HOST;
export const DatabaseName = process.env.DB_NAME;
export const DatabaseUser = process.env.DB_USER;
export const DatabasePassword = process.env.DB_PASSWORD;
export const DB_DIALECT = process.env.DB_DIALECT;
