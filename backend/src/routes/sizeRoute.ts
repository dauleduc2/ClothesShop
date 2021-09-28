import { Request, Response } from "express";
import * as express from "express";
import { getCustomRepository } from "typeorm";
import { SizeRepository } from "../Repository/SizeRepository";
import { Size } from "../entity/Size";
import validateSize from "../validators/Size";
import * as dataHelper from "../utils/dataHelper";
import { authenMiddleware } from "../middlewares/authenMiddleware";
import { authorMiddleware } from "../middlewares/authorMiddleware";
const router = express.Router();

//POST get all size
router.get("/", async (req: Request, res: Response) => {
    //get connection
    const sizeRepo = await getCustomRepository(SizeRepository);

    const sizeList = await sizeRepo.getAllSize();
    return res
        .status(200)
        .send(dataHelper.getResponseForm(sizeList, "get all size success!"));
});

//POST add new size
router.post(
    "/",
    [authenMiddleware, authorMiddleware],
    async (req: Request, res: Response) => {
        const { name } = req.body;
        let newSize = new Size();
        newSize.name = name;
        //validate
        const { error } = validateSize(newSize);
        if (error)
            return res
                .status(400)
                .send(dataHelper.getResponseForm(null, error.details));

        //get connection
        const sizeRepo = await getCustomRepository(SizeRepository);
        //check duplicate
        const isDuplicate = await sizeRepo.findByName(newSize.name);
        if (isDuplicate)
            return res
                .status(400)
                .send(
                    dataHelper.getResponseForm(
                        null,
                        "this size already have in store"
                    )
                );
        //add size
        await sizeRepo.addNewSize(newSize);
        return res
            .status(200)
            .send(dataHelper.getResponseForm(newSize, "add new size success!"));
    }
);
export default router;
