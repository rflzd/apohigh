import dotenv from 'dotenv';
dotenv.config();

export const BOT_TOKEN = process.env.BOT_TOKEN!;
export const API_KEY = process.env.API_KEY!;
export const API_HOST = process.env.API_HOST!;
export const API_BASE_URL = process.env.API_BASE_URL!;

export const DB_HOST = process.env.DB_HOST!;
export const DB_PORT = Number(process.env.DB_PORT!);
export const DB_USER = process.env.DB_USER!;
export const DB_PASSWORD = process.env.DB_PASSWORD!;
export const DB_NAME = process.env.DB_NAME!;