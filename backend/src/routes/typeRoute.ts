import { Request, Response } from "express";
import * as express from "express";
import { getCustomRepository } from "typeorm";
import { TypeRepository } from "../Repository/TypeRepository";
import { Type } from "../entity/Type";
import validateType from "../validators/Type";
import * as dataHelper from "../utils/dataHelper";
import { authenMiddleware } from "../middlewares/authenMiddleware";
import { authorMiddleware } from "../middlewares/authorMiddleware";
import { ServerRequest } from "../interfaces/common/Request";
import { AddSizeInfoDTO } from "../interfaces/DTO/size";
import * as statusCode from "../constants/statusConstants";
const router = express.Router();

//POST get all type
router.get("/", async (req: Request, res: Response) => {
    //get connection
    const typeRepo = await getCustomRepository(TypeRepository);

    const sizeList = await typeRepo.getAllType();
    return res.send(
        dataHelper.getResponseForm(sizeList, null, "get all type success!")
    );
});

//POST add new type
router.post(
    "/",
    [authenMiddleware, authorMiddleware],
    async (req: ServerRequest<AddSizeInfoDTO>, res: Response) => {
        const { name } = req.body;
        let newType = new Type();
        newType.name = name;
        //validate
        const { error } = validateType(newType);
        if (error)
            return res
                .status(statusCode.BAD_REQUEST)
                .send(
                    dataHelper.getResponseForm(
                        null,
                        error.details,
                        "validation error"
                    )
                );
        //get connection
        const typeRepo = await getCustomRepository(TypeRepository);
        //check duplicate
        const isDuplicate = await typeRepo.findByName(newType.name);
        if (isDuplicate)
            return res.status(statusCode.BAD_REQUEST).send(
                dataHelper.getResponseForm(
                    null,
                    {
                        name: "this type already have in store",
                    },
                    "this type already have in store"
                )
            );
        //add type
        await typeRepo.addNewType(newType);
        return res
            .status(statusCode.CREATED)
            .send(
                dataHelper.getResponseForm(
                    newType,
                    null,
                    "add new type success!"
                )
            );
    }
);

export default router;
