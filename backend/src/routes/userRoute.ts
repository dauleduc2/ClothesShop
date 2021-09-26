import { multerErrorMiddleware } from "./../middlewares/multerErrorMiddleware";
import { Request, Response } from "express";
import upload from "../utils/multerHelper";
import * as express from "express";
import { User } from "../entity/User";
import validateUser from "../validators/User";

import { getCustomRepository } from "typeorm";
import { UserRepository } from "../Repository/UserRepository";
import * as userHelper from "../utils/userHelper";
const router = express.Router();
router.get("/me", async (req: Request, res: Response) => {
    res.send("get current user information");
});

router.post(
    "/",
    multerErrorMiddleware(upload.single("image")),
    async (req: Request, res: Response) => {
        const { password, email, fullName } = req.body;
        let user = new User();
        user.password = password;
        user.email = email;
        user.fullName = fullName;
        user.avatar = req.file.path;
        //validate user
        const { error } = validateUser(user);
        if (error) res.send(error.details);
        //get connection
        const userRepo = await getCustomRepository(UserRepository);
        //check is esxisted user
        let isExistedUser = await userRepo.findByEmail(email);
        if (isExistedUser)
            return res.status(400).send("This email already existed");

        //add user
        const result: User = await userRepo.addNewUser(user);
        //gen token
        const token = userHelper.genToken(result);
        //set token to cookie
        res.cookie("x-auth-token", token, {
            maxAge: 86400 * 100,
        });
        res.status(200).send(token);
    }
);
export default router;
