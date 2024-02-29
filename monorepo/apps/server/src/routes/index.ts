import { Request, Response, Router } from "express";
import { multer, storage } from "../services/multer";
import {
  createCode,
  createCodeForVSCode,
  getCodeDetails,
  getCodesByUserID,
  getFileByUserId,
  getFileDetails,
  getHistory,
  getSingleCode,
  serveFiles,
} from "../controller";

const router = Router();
const upload = multer({ storage: storage });

router.get("/whoami", (_req: Request, res: Response) => {
  res
    .send(
      "I am tapshare. I am a platform that enables users to transfer files, including zip files, to email and phone number in a tap.",
    )
    .status(200);
});

//Routes to handle code
router.post("/api/v2/code", createCode);
router.post("/api/v2/vscode", createCodeForVSCode);
router.get("/api/v2/code/single/:id", getSingleCode);
router.get("/api/v2/code/:id", getCodesByUserID);

//Routes to handle files
router.get("/u/:fileName", serveFiles);
router.get("/:userId", getFileByUserId);
router.post("/api/v2/sendFile", upload.array("files"));

// Routes to handle history
router.get("/api/v2/history/code/:id", getCodeDetails);
router.get("/api/v2/history/file/:id", getFileDetails);
router.get("/api/v2/history/:id", getHistory);

export default router;
