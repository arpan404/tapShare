import { Request, Response } from "express";
import { scheduleJob } from "node-schedule";
import Code from "../database/schema/Code";

const scheduleDeletion = (codeID: string) => {
  scheduleJob(new Date(Date.now() + 86_400_000), async () => {
    try {
      await Code.findByIdAndDelete(codeID);
    } catch (error) {
      console.error("Error deleting code: ", error);
    }
  });
};

const createCode = async (req: Request, res: Response) => {
  try {
    const { text, userID, title, ipAddress } = req.body;
    const codesAssociatedWithUserID = await Code.findOne({
      userID: req.body.userID,
    });

    //if found , check the ip of the user

    if (codesAssociatedWithUserID) {
      if (codesAssociatedWithUserID.ipAddress !== ipAddress) {
        return res.json({
          status: 400,
          messge: "Please don't use other's userId",
        });
      }
    }
    const code = await Code.create({
      text,
      userID,
      title,
      ipAddress: ipAddress,
    });

    if (code) {
      return res.status(201).json({
        status: 200,
        message: "Code created successfully",
      });
    } else {
      return res.status(500).json({
        status: 500,
        message: "Something went wrong",
      });
    }
  } catch (error) {
    return res.json({
      status: 500,
      message: "Internal server error",
    });
  }
};

const getCodesByUserID = async (req: Request, res: Response) => {
  try {
    const code = await Code.find({ userID: req.params.id });
    if (code.length > 0) {
      return res.json({
        status: 200,
        message: "Code found",
        code: code,
      });
    } else {
      return res.json({
        status: 404,
        message: "No code found",
      });
    }
  } catch (error) {
    return res.json({
      status: 500,
      message: "Internal server error",
    });
  }
};

const getSingleCode = async (req: Request, res: Response) => {
  try {
    const code = await Code.findById(req.params.id);
    if (code) {
      return res.json({
        status: 200,
        code: {
          title: code.title,
          text: code.text,
        },
      });
    }
    res.json({
      status: 404,
      message: "Code not found",
    });
  } catch (error) {
    res.json({
      status: 500,
      message: "Internal server error",
    });
  }
};

const createCodeForVSCode = async (req: Request, res: Response) => {
  const { text, userID, ipAddress } = req.body;
  try {
    const code = await Code.create({
      text,
      userID,
      ipAddress,
      vscode: Math.floor(100000 + Math.random() * 900000),
    });
    if (code) {
      return res.status(201).json({
        status: 201,
        message: "Code created successfully",
        vscode: code.vscode,
      });
    }
    return res.status(500).json({
      status: 500,
      message: "Something went wrong",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Something went wrong",
    });
  }
};

const getCodeForVSCode = async (req: Request, res: Response) => {
  try {
    const vscode = req.params.vscode;
    const code = await Code.findOne({ vscode });
    if (code) {
      return res.status(200).json({
        status: 200,
        code: {
          title: code.title,
          text: code.text,
        },
      });
    }
    return res.status(200).json({
      status: 404,
      message: "Code not found",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export {
  createCode,
  createCodeForVSCode,
  getCodeForVSCode,
  getCodesByUserID,
  getSingleCode,
  scheduleDeletion,
};
