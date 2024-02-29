import fs from "fs";
import path from "path";
import { scheduleJob } from "node-schedule";
import sendSMS from "../services/sendSms";
import sendEmail from "../services/sendEmail";
import File from "../database/schema/File";
import { Request, Response } from "express";
import config from "../config";
import { DELIVERY_OPTIONS } from "../types";

const scheduleFileDeletion = (fileID: string) => {
  scheduleJob(new Date(Date.now() + 86_400_000), async () => {
    try {
      const file = await File.findByIdAndDelete(fileID);
      if (file) {
        const filePath = path.join(
          "uploads",
          file.path.replace(config.BASE_URL + "u/", ""),
        );
        fs.unlink(filePath, (err) => {
          if (err) {
            console.log("Error deleting file:", err);
          } else {
            console.log("File deleted successfully:", filePath);
          }
        });
      }
    } catch (error) {
      console.log("Error deleting file: ", error);
    }
  });
};

const emailOptions: DELIVERY_OPTIONS = {
  to: "",
  subject: "New File Received from TapShare ",
  text: "Tapshare is a simple, secure, and reliable file sharing platform that allows users to quickly and easily send large files over the internet.Give it a  try today at https://www.tapshare.xyz/ . For more Info visit https://github.com/maheshbasnet089/tapShare",
};

const saveFile = async (
  file: Express.Multer.File,
  req: Request,
): Promise<string | void> => {
  const newDoc = await File.create({
    userId: req.body.userId,
    name: file.originalname,
    path:
      config.BASE_URL +
      "u/" +
      file.path.replace(/\\/g, "/").replace("uploads/", ""), // replace backslash with forward slash
    size: file.size,
    ipAddress: req.body.ipAddress,
  });
  const isDocSaved = await newDoc.save();
  if (isDocSaved) {
    scheduleFileDeletion(String(isDocSaved._id));
    return newDoc.path;
  }
  return;
};

const uploadFiles = async (req: Request, res: Response) => {
  const files = req.files;
  if (files) {
    try {
      const filePaths: Array<string> = [];
      const filesAssociatedWithUserID = await File.findOne({
        userID: req.body.userID,
      });
      if (filesAssociatedWithUserID) {
        if (filesAssociatedWithUserID.ipAddress !== req.body.ipAddress) {
          return res.status(400).json({ message: "Duplicate userID" });
        }
      }

      if (Array.isArray(files)) {
        for (const file of files) {
          const fileObj = file as Express.Multer.File;
          const filePath = await saveFile(fileObj, req);
          if (filePath) {
            filePaths.push(filePath);
          }
        }
      } else {
        for (const fieldname in files) {
          if (Object.prototype.hasOwnProperty.call(files, fieldname)) {
            const fieldFiles = files[fieldname];
            for (const file of fieldFiles) {
              const filePath = await saveFile(file, req);
              if (filePath) {
                filePaths.push(filePath);
              }
            }
          }
        }
      }

      const sendToMailData = JSON.parse(req.body.email);
      if (!Array.isArray(sendToMailData)) {
        return res.status(201).json({
          message: "Link generated",
        });
      }
      const emails = sendToMailData.filter((data) => data.type === "email");
      const phones = sendToMailData.filter((data) => data.type === "phone");
      if (emails.length <= 0 && phones.length <= 0) {
        return res.status(201).json({
          message: "Link generated",
        });
      }
      emailOptions.text += "\n\nShared Files(tap to download):\n";
      for (const filePath of filePaths) {
        emailOptions.text += `${filePath}\n`;
      }

      emails.length > 0 &&
        emails.forEach((email) => {
          emailOptions.to = email.value;
          sendEmail(emailOptions);
        });

      phones.length > 0 &&
        phones.forEach((phone) => {
          emailOptions.to = phone.value;
          sendSMS(emailOptions);
        });

      return res.status(200).json({
        message: "File sent successfully",
      });
    } catch (error) {
      return res.json(500).json({ message: "Internal server error" });
    }
  }
};
