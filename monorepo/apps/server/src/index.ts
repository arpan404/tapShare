import express, { Express, Request, Response } from "express";
import cors from "cors";
import path from "path";
import mongoConnection from "./database/config";
import config from "./config";
import routeHandler from "./routes";

const app: Express = express();
app.set("view engine", "ejs");

const corsOptions = {
  origin: [
    "https://tapshare.xyz",
    "http://127.0.0.1:5173",
    "http://localhost:5173",
  ],
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Connect To Database
mongoConnection();

// Parse Body Data in JSON
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Serve Uploaded Files
app.use(express.static(path.join(__dirname, "/uploads")));

//Handling All Routes in another file
app.use("/", routeHandler);

app.listen(config.PORT || 4000, () => {
  console.log(`Server is running on port ${config.PORT ? config.PORT : 8000}`);
});
