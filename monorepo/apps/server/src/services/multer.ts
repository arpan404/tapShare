import multer, { StorageEngine } from "multer";
import { Request } from "express";
import { MulterFile } from "../types";

const storage: StorageEngine = multer.diskStorage({
  destination: (
    _req: Request,
    _file: MulterFile,
    cb: (error: Error | null, destination: string) => void,
  ) => {
    cb(null, "./uploads/");
  },
  filename: (
    _req: Request,
    file: MulterFile,
    cb: (error: Error | null, filename: string) => void,
  ) => {
    const fileName: string = file.originalname.replace(/\s+/g, "-");
    cb(null, fileName);
  },
});

export { multer, storage };
