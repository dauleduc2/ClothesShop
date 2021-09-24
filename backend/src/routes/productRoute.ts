import { Request, Response } from "express";
import upload from "../utils/multerHelper";
// import  from "../middlewares/multerErrorMiddleware";
import { multerErrorMiddleware } from "../middlewares/multerErrorMiddleware";
import * as express from "express";
const router = express.Router();
router.get("/", async (req: Request, res: Response) => {
    res.send("hello");
});

// router.post("/", upload.array("images", 5), (req: Request, res: Response) => {
router.post("/", multerErrorMiddleware, (req: Request, res: Response) => {
    res.send(req.files);
});
export default router;
