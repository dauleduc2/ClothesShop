import { Request, Response } from "express";
import { upload } from "../utils/multerHelper";
import * as express from "express";
const router = express.Router();
router.get("/", (req: Request, res: Response) => {});

router.post("/", upload.array("images", 5), (req: Request, res: Response) => {
    res.send(req);
});
export default router;
