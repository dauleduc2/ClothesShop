import { UserRepository } from "./../Repository/UserRepository";
import { Request, Response } from "express";
import * as express from "express";
import { getCustomRepository } from "typeorm";
import * as dataHelper from "../utils/dataHelper";

const router = express.Router();
//GET - get all orderList

interface GetOrderListQuery {
    limit: number;
    page: number;
}
//GET - get all order
router.get(
    "/",
    async (
        req: Request<null, null, null, GetOrderListQuery>,
        res: Response
    ) => {
        //get connection
        const userRepo = await getCustomRepository(UserRepository);
        const userList = await userRepo.getAllUserAndCount(
            req.query.limit,
            req.query.page
        );
        return res.send(
            dataHelper.getResponseForm(userList, null, "get all user success!")
        );
    }
);

//POST - update status
router.post("/status", async (req: Request, res: Response) => {});

export default router;
