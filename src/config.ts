import { config } from 'dotenv';

config();

export const port = parseInt(process.env.PORT, 10);
