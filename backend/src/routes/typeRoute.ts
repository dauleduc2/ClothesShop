import { Request, Response } from "express";
import * as express from "express";
import { getCustomRepository } from "typeorm";
import { TypeRepository } from "../Repository/TypeRepository";
import { Type } from "../entity/Type";
import validateType from "../validators/Type";
import * as dataHelper from "../utils/dataHelper";
import { authenMiddleware } from "../middlewares/authenMiddleware";
import { authorMiddleware } from "../middlewares/authorMiddleware";
const router = express.Router();

//POST get all type
router.get("/", async (req: Request, res: Response) => {
    //get connection
    const typeRepo = await getCustomRepository(TypeRepository);

    const sizeList = await typeRepo.getAllType();
    return res
        .status(200)
        .send(dataHelper.getResponseForm(sizeList, "get all type success!"));
});

//POST add new type
router.post(
    "/",
    [authenMiddleware, authorMiddleware],
    async (req: Request, res: Response) => {
        const { name } = req.body;
        let newType = new Type();
        newType.name = name;
        //validate
        const { error } = validateType(newType);
        if (error)
            return res
                .status(400)
                .send(dataHelper.getResponseForm(null, error.details));

        //get connection
        const typeRepo = await getCustomRepository(TypeRepository);
        //check duplicate
        const isDuplicate = await typeRepo.findByName(newType.name);
        if (isDuplicate)
            return res
                .status(400)
                .send(
                    dataHelper.getResponseForm(
                        null,
                        "this type already have in store"
                    )
                );
        //add type
        await typeRepo.addNewType(newType);
        return res
            .status(200)
            .send(dataHelper.getResponseForm(newType, "add new type success!"));
    }
);

export default router;
