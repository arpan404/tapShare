import dotenv from "dotenv";
dotenv.config();

const config = {
  PORT: process.env.PORT as string,
  MONGO_URI: process.env.MONGO_URI as string,
  EMAIL: process.env.EMAIL as string,
  EMAIL_APP_PASSWORD: process.env.PASSWORD as string,
  BASE_URL: process.env.baseUrl as string,
  DB_PASSWORD: process.env.DB_PASSWORD as string,
};
export default config;
