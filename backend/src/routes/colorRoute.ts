import { BAD_REQUEST } from "./../constants/statusConstants";
import { ServerRequest } from "./../interfaces/common/Request";
import { Request, Response } from "express";
import * as express from "express";
import { getCustomRepository } from "typeorm";
import { ColorRepository } from "../Repository/ColorRepository";
import { Color } from "../entity/Color";
import validateColor from "../validators/Color";
import { authenMiddleware } from "../middlewares/authenMiddleware";
import { authorMiddleware } from "../middlewares/authorMiddleware";
import * as dataHelper from "../utils/dataHelper";
import { AddColorInfoDTO } from "../interfaces/DTO/color";
import * as statusCode from "../constants/statusConstants";
const router = express.Router();
//GET get all color
router.get("/", async (req: Request, res: Response) => {
    //get connection
    const colorRepo = await getCustomRepository(ColorRepository);

    const colorList = await colorRepo.getAllColor();
    return res.send(
        dataHelper.getResponseForm(colorList, null, "get all color success!")
    );
});
//POST - add new color
router.post(
    "/",
    [authenMiddleware, authorMiddleware],
    async (req: ServerRequest<AddColorInfoDTO>, res: Response) => {
        const { name, hexCode } = req.body;

        let newColor = new Color();
        newColor.name = name;
        newColor.hexCode = hexCode;
        //validate
        const { error } = validateColor(newColor);
        if (error)
            return res
                .status(statusCode.BAD_REQUEST)
                .send(
                    dataHelper.getResponseForm(
                        null,
                        error.details,
                        "Validation error"
                    )
                );
        //get connection
        const colorRepo = await getCustomRepository(ColorRepository);
        //duplicate message
        const duplicateMessage = {
            name: "",
            hexCode: "",
        };
        //check duplicate color name
        let isDuplicate = await colorRepo.findByName(newColor.name);

        if (isDuplicate) duplicateMessage.name = "this color already existed";

        //check duplicate hexcode
        isDuplicate = await colorRepo.findByHexCode(newColor.hexCode);
        if (isDuplicate)
            duplicateMessage.hexCode = "this color hexCode already existed";

        if (duplicateMessage.name !== "" || duplicateMessage.hexCode !== "") {
            res.status(statusCode.BAD_REQUEST).send(
                dataHelper.getResponseForm(
                    null,
                    duplicateMessage,
                    "duplicate message"
                )
            );
        }
        //add color
        await colorRepo.addNewColor(newColor);
        return res
            .status(statusCode.CREATED)
            .send(
                dataHelper.getResponseForm(
                    newColor,
                    null,
                    "add new color success!"
                )
            );
    }
);
// GET - remove a color
router.get(
    "/:ID",
    [authenMiddleware, authorMiddleware],
    async (req: Request<{ ID: string }>, res: Response) => {
        const { ID } = req.params;
        //get connection
        const colorRepo = await getCustomRepository(ColorRepository);
        const result = await colorRepo.removeByID(Number(ID));
        res.send(dataHelper.getResponseForm(result, null, "remove success"));
    }
);
export default router;
