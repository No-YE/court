import { config } from 'dotenv';

config();

export const port = parseInt(process.env.PORT, 10);
export const mongoUri = process.env.MONGO_URI;
export const privateKey = process.env.PRIVATE_KEY;
