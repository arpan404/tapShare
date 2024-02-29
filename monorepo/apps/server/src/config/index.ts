import dotenv from "dotenv";
dotenv.config();

const config = {
  PORT: process.env.PORT as string,
  MONGO_URI: process.env.MONGO_URI as string,
  EMAIL: process.env.EMAIL as string,
  EMAIL_APP_PASSWORD: process.env.PASSWORD as string,
  BASE_URL: process.env.baseUrl as string,
  TWILIO_SID: process.env.TWILIO_SID as string,
  TWILIO_TOKEN: process.env.TWILIO_TOKEN as string,
  TWILIO_NUMBER: process.env.TWILIO_NUMBER as string,
  TWILIO_VERIFICATION_SID: process.env.TWILIO_VERIFICATION_SID as string,
  DB_PASSWORD: process.env.DB_PASSWORD as string,
};
export default config;
