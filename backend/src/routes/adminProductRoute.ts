import { Request, Response } from "express";
import * as express from "express";
import { getCustomRepository } from "typeorm";
import * as dataHelper from "../utils/dataHelper";
import { AdminQueryPage } from "../interfaces/common/Query";
import { ProductRepository } from "../Repository/ProductRepository";
const router = express.Router();

//GET - get all order
router.get(
    "/",
    async (req: Request<null, null, null, AdminQueryPage>, res: Response) => {
        //get connection
        const productRepo = await getCustomRepository(ProductRepository);
        const productWithCount = await productRepo.adminGetAllProduct({
            limit: req.query.limit,
            page: req.query.page,
        });
        return res.send(
            dataHelper.getResponseForm(
                productWithCount,
                null,
                "get all order list success!"
            )
        );
    }
);

export default router;
