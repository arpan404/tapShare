import { Request, Response } from "express";
import File from "../database/schema/File";

const getFileByUserId = async (req: Request, res: Response) => {
  try {
    const files = await File.find({ userId: req.params.userId });
    if (!files) {
      return res.status(400).json({
        message: "No files found or link has been expired ",
      });
    }
    const toSendFiles = files.map((obj) => ({
      path: obj.path,
      name: obj.name,
    }));
    return res.status(200).json({
      message: "Files fetched successfully",
      files: toSendFiles,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { getFileByUserId };
