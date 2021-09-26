import { multerErrorMiddleware } from "./../middlewares/multerErrorMiddleware";
import { Request, Response } from "express";
import upload from "../utils/multerHelper";
import * as express from "express";
import { User } from "../entity/User";
import validateUser from "../validators/User";
import * as bcrypt from "bcrypt";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../Repository/UserRepository";
import * as userHelper from "../utils/userHelper";
import * as dataHelper from "../utils/dataHelper";
import { authMiddleware } from "../middlewares/authMiddleware";
const router = express.Router();
router.get("/me", authMiddleware, async (req: Request, res: Response) => {
    return res.send(
        dataHelper.getResponseForm(null, "get current user information")
    );
});

router.get(
    "/me/logout",
    authMiddleware,
    async (req: Request, res: Response) => {
        res.cookie("x-auth-token", "", {
            maxAge: -1,
        });
        return res.send(dataHelper.getResponseForm(null, "logout success!"));
    }
);

router.post("/login", async (req: Request, res: Response) => {
    const { email, password } = req.body;

    //get connection
    const userRepo = await getCustomRepository(UserRepository);
    const user: User = await userRepo.findByEmail(email);
    //check valid email
    if (!user)
        return res
            .status(401)
            .send(
                dataHelper.getResponseForm(null, "email or password is invalid")
            );
    //check valid password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
        return res
            .status(400)
            .send(
                dataHelper.getResponseForm(null, "email or password is invalid")
            );
    //set token to cookie
    const token = await userHelper.genToken(user);
    res.cookie("x-auth-token", token, {
        maxAge: 86400 * 100,
    });
    return res
        .status(200)
        .send(dataHelper.getResponseForm(null, "login access...!"));
});

router.post(
    "/register",
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
        if (error)
            return res.send(dataHelper.getResponseForm(null, error.details));
        //get connection
        const userRepo = await getCustomRepository(UserRepository);
        //check is esxisted user
        let isExistedUser = await userRepo.findByEmail(email);
        if (isExistedUser)
            return res
                .status(400)
                .send(
                    dataHelper.getResponseForm(
                        null,
                        "This email already existed"
                    )
                );

        //add user
        const result: User = await userRepo.addNewUser(user);
        //gen token
        const token = userHelper.genToken(result);
        //set token to cookie
        await res.cookie("x-auth-token", token, {
            maxAge: 86400 * 100,
        });
        return res
            .status(200)
            .send(dataHelper.getResponseForm(null, "register success...!"));
    }
);
export default router;
