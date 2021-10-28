import { UserRepository } from "./../Repository/UserRepository";
import { Request, Response } from "express";
import * as express from "express";
import { getCustomRepository } from "typeorm";
import * as dataHelper from "../utils/dataHelper";
import { AdminQueryPage } from "../interfaces/common/Query";

const router = express.Router();

//GET - get all order
router.get(
    "/",
    async (req: Request<null, null, null, AdminQueryPage>, res: Response) => {
        //get connection
        const userRepo = await getCustomRepository(UserRepository);
        const userList = await userRepo.getAllUserAndCount({
            limit: req.query.limit,
            page: req.query.page,
        });
        return res.send(
            dataHelper.getResponseForm(userList, null, "get all user success!")
        );
    }
);

//POST - update status
router.post("/status", async (req: Request, res: Response) => {});

export default router;
