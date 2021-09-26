import { multerErrorMiddleware } from "./../middlewares/multerErrorMiddleware";
import { Request, Response } from "express";
import upload from "../utils/multerHelper";
import * as express from "express";
const router = express.Router();
router.get("/", async (req: Request, res: Response) => {
    res.send("get product");
});

router.post(
    "/",
    multerErrorMiddleware(upload.array("images", 5)),
    (req: Request, res: Response) => {
        res.send("Upload product");
    }
);
export default router;
