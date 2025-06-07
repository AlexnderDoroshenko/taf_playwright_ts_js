import { config as dotenvConfig } from 'dotenv';

const result = dotenvConfig();
// console.log('dotenv config result:', result);


export const config = {
    USER_EMAIL: process.env.USER_EMAIL || 'petro@example.com',
    USER_PASSWORD: process.env.USER_PASSWORD || 'Pa$$w0rdExam|eº¡™£',
    BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
    API_URL: process.env.API_URL || 'http://localhost:8000/api',
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: Number(process.env.DB_PORT) || 5432,
    DB_USER: process.env.DB_USER || 'postgres',
    DB_PASSWORD: process.env.DB_PASSWORD || 'yourpassword',
    DB_NAME: process.env.DB_NAME || 'shop',
};