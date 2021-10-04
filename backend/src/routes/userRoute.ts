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
import { authenMiddleware } from "../middlewares/authenMiddleware";
import RequestWithUser from "../interfaces/requestWithUser";
import * as _ from "lodash";
const router = express.Router();
//GET me
router.get(
    "/me",
    authenMiddleware,
    async (req: RequestWithUser, res: Response) => {
        const { ID } = req.user;
        //get connection
        const userRepo = await getCustomRepository(UserRepository);
        const user = await userRepo.findByID(ID);

        return res
            .status(200)
            .send(
                dataHelper.getResponseForm(
                    _.pick(user, [
                        "username",
                        "fullName",
                        "avatar",
                        "email",
                        "userStatus",
                        "role",
                        "createDate",
                    ]),
                    "get current user information success"
                )
            );
    }
);
//GET get user by username
router.get("/:username", async (req: Request, res: Response) => {
    const { username } = req.params;
    //get connection
    const userRepo = await getCustomRepository(UserRepository);
    const user = await userRepo.findByUsername(username);

    res.status(200).send(dataHelper.getResponseForm(user, "get user success"));
});
//GET logout
router.get(
    "/me/logout",
    authenMiddleware,
    async (req: Request, res: Response) => {
        res.cookie("x-auth-token", "", {
            maxAge: -1,
        });
        return res
            .status(200)
            .send(dataHelper.getResponseForm(null, "logout success!"));
    }
);
//POST login
router.post("/login", async (req: Request, res: Response) => {
    const { username, password } = req.body;

    //get connection
    const userRepo = await getCustomRepository(UserRepository);
    const user: User = await userRepo.findByUsername(username);
    //check valid username
    if (!user)
        return res
            .status(400)
            .send(
                dataHelper.getResponseForm(
                    null,
                    "username or password is invalid"
                )
            );
    //check valid password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
        return res
            .status(400)
            .send(
                dataHelper.getResponseForm(
                    null,
                    "username or password is invalid"
                )
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

//POST register user
router.post(
    "/register",
    multerErrorMiddleware(upload.single("image")),
    async (req: Request, res: Response) => {
        const { password, email, fullName, username, role } = req.body;
        let duplicateField = {
            username: false,
            email: false,
        };
        let user = new User();
        user.password = password;
        user.email = email;
        user.fullName = fullName;
        user.username = username;
        // user.avatar = req.file.path;
        // user.role = role;
        //validate user
        const { error } = validateUser(user);
        if (error)
            return res
                .status(400)
                .send(dataHelper.getResponseForm(null, error.details));
        //get connection
        const userRepo = await getCustomRepository(UserRepository);
        //check is esxisted user
        let isExistedUser = await userRepo.findByEmail(email);
        if (isExistedUser)
            duplicateField = {
                ...duplicateField,
                email: true,
            };

        isExistedUser = await userRepo.findByUsername(username);
        if (isExistedUser)
            duplicateField = {
                ...duplicateField,
                username: true,
            };
        if (duplicateField.email === true || duplicateField.username === true)
            return res
                .status(400)
                .send(
                    dataHelper.getResponseForm(
                        duplicateField,
                        "Duplicate information"
                    )
                );
        //add user
        const result: User = await userRepo.addNewUser(user);
        console.log(result);
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
