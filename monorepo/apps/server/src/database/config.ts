import mongoose from "mongoose";
import config from "../config";

const mongoConnection = () => {
  try {
    mongoose.connect(config.MONGO_URI);
    console.log("Waiting for database to connect");
  } catch (error: any) {
    console.error(error);
  }
};
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected successfully");
});

export default mongoConnection;
