import { Request, Response } from "express";
import path from "path";
import fs from "fs";
const serveFiles = (req: Request, res: Response) => {
  try {
    const filePath = path.join(__dirname, "uploads", req.params.fileName!);
    const fileExists = fs.existsSync(filePath);
    if (fileExists) {
      res.download(filePath, req.params.fileName, (err: any) => {
        if (err) {
          console.error("Error downloading file:", err);
        } else {
          console.log("File downloaded successfully");
        }
      });
    }
  } catch (error) {
    res.status(500).render("linkExpire", {
      message: "Opps!, Something Went Wrong",
      status: 500,
    });
  }
};
export { serveFiles };
