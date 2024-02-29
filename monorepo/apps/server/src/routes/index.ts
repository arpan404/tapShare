import { Request, Response, Router } from "express";

const router = Router();

router.get("/whoami", (_req: Request, res: Response) => {
  res
    .send(
      "I am tapshare. I am a platform that enables users to transfer files, including zip files, to email and phone number in a tap.",
    )
    .status(200);
});

export default router;
