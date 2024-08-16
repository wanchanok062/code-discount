import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Export your environment variables for easy access
export const PORT = process.env.PORT ?? 3000;
