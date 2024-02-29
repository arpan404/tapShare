import { Request, Response } from "express";
import Code from "../database/schema/Code";
import File from "../database/schema/File";

const getHistory = async (req: Request, res: Response) => {
  const ipAddress = req.params.id;
  const total = 10;
  try {
    if (!ipAddress) {
      return res.status(200).json({
        message: "Provide ipAddress",
      });
    }
    const codes = await Code.find({ ipAddress })
      .sort({ createdAt: -1 })
      .limit(total);
    const files = await File.find({ ipAddress })
      .sort({ createdAt: -1 })
      .limit(total);
    if (codes?.length <= 0 && files?.length <= 0) {
      return res.status(404).json({ message: "No history" });
    }
    return res.status(200).json({ codes, files });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getCodeDetails = async (req: Request, res: Response) => {
  const codeID = req.params.id;
  try {
    const code = await Code.findById(codeID);
    if (!code) return res.status(404).json({ message: "Code not found" });
    return res
      .status(200)
      .json({ code: { text: code.text, title: code.title } });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getFileDetails = async (req: Request, res: Response) => {
  const fileID = req.params.id;
  try {
    const file = await File.findById(fileID);
    if (!file) return res.status(404).send({ message: "File not found" });
    return res.status(200).json({ file: { name: file.name, path: file.path } });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { getCodeDetails, getFileDetails, getHistory };
