import dotenv from 'dotenv';
import ms from 'ms';
dotenv.config();

export const env = {
  SERVER_PORT: Number(process.env.SERVER_PORT),
  SERVER_URL: process.env.SERVER_URL as string,
  CLIENT_URL: process.env.CLIENT_URL as string,
  NODE_ENV: process.env.NODE_ENV as string,
  DB_STRING: process.env.DB_STRING as string,
  SESSION_SECRET: process.env.SESSION_SECRET as string,
  JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET as string,
  JWT_ACCESS_TOKEN_EXPIRATION: process.env
    .JWT_ACCESS_TOKEN_EXPIRATION as ms.StringValue,
  JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET as string,
  JWT_REFRESH_TOKEN_EXPIRATION: process.env
    .JWT_REFRESH_TOKEN_EXPIRATION as ms.StringValue,
};

for (const [key, value] of Object.entries(env)) {
  if (!value) {
    throw new Error(`Missing ${key} value from env file`);
  }
}
