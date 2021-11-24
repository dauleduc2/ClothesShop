import { multerErrorMiddleware } from "./../middlewares/multerErrorMiddleware";
import { Request, Response } from "express";
import upload from "../utils/multerHelper";
import * as express from "express";
import { User } from "../entity/User";
import {
    validateUser,
    validateUpdateUser,
    validateLoginUser,
} from "../validators/User";
import * as bcrypt from "bcrypt";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../Repository/UserRepository";
import * as userHelper from "../utils/userHelper";
import * as dataHelper from "../utils/dataHelper";
import { authenMiddleware } from "../middlewares/authenMiddleware";
import {
    UpdateUserDTO,
    LoginUserDTO,
    RegisterUserDTO,
} from "../interfaces/DTO/user";
import { RequestWithUser, ServerRequest } from "../interfaces/common/Request";
import * as statusCode from "../constants/statusConstants";
const router = express.Router();

router.get("/", (req, res) => {
    res.send("hello");
});

//GET me
router.get(
    "/me",
    authenMiddleware,
    async (req: RequestWithUser<any>, res: Response) => {
        const { ID } = req.user;
        //get connection
        const userRepo = await getCustomRepository(UserRepository);
        const user = await userRepo.findByID(ID);
        const { ID: userID, password, ...ortherInfo } = user;
        return res.send(
            dataHelper.getResponseForm(
                {
                    ...ortherInfo,
                },
                null,
                "get current user information success"
            )
        );
    }
);

//GET logout
router.get(
    "/me/logout",
    authenMiddleware,
    async (req: Request, res: Response) => {
        res.cookie("x-auth-token", "", {
            maxAge: -1,
        });
        return res.send(
            dataHelper.getResponseForm(null, null, "logout success!")
        );
    }
);

//POST update user
router.post(
    "/me/update",
    [authenMiddleware, multerErrorMiddleware(upload.single("avatar"))],
    async (req: RequestWithUser<UpdateUserDTO>, res: Response) => {
        const { ID } = req.user;
        //type handle
        if (req.file) {
            req.body.avatar = req.file.filename;
        }

        if (typeof req.body.avatar === "object") {
            const { avatar, ...orther } = req.body;
            req.body = orther;
        }
        //validate
        const { error } = validateUpdateUser(req.body);
        if (error) {
            let errorToSend = {};
            error.details.forEach((detailError) => {
                errorToSend[`${detailError.path[0]}`] = detailError.message;
            });
            return res
                .status(statusCode.BAD_REQUEST)
                .send(
                    dataHelper.getResponseForm(
                        null,
                        errorToSend,
                        "validation error"
                    )
                );
        }

        //get connection
        const userRepo = getCustomRepository(UserRepository);
        //get current data
        const result = await userRepo.updateUserByID(ID, req.body);
        return res.send(
            dataHelper.getResponseForm(result, null, "update success!")
        );
    }
);

//POST login
router.post(
    "/login",
    async (req: ServerRequest<LoginUserDTO>, res: Response) => {
        const { username, password } = req.body;
        //get connection
        const userRepo = await getCustomRepository(UserRepository);
        const user: User = await userRepo.findByUsername(username);
        //validate
        const { error } = validateLoginUser(req.body);
        if (error) {
            let errorToSend = {};
            error.details.forEach((detailError) => {
                errorToSend[`${detailError.path[0]}`] = detailError.message;
            });
            return res
                .status(statusCode.BAD_REQUEST)
                .send(
                    dataHelper.getResponseForm(
                        null,
                        errorToSend,
                        "validate error"
                    )
                );
        }

        //check valid username
        if (!user)
            return res
                .status(statusCode.BAD_REQUEST)
                .send(
                    dataHelper.getResponseForm(
                        null,
                        { general: "username or password is invalid" },
                        "username or password is invalid"
                    )
                );
        //check valid password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword)
            return res
                .status(statusCode.BAD_REQUEST)
                .send(
                    dataHelper.getResponseForm(
                        null,
                        { general: "username or password is invalid" },
                        "username or password is invalid"
                    )
                );
        //set token to cookie
        const token = await userHelper.genToken(user);
        res.cookie("x-auth-token", token, {
            maxAge: 86400 * 100,
        });
        return res.send(
            dataHelper.getResponseForm(null, null, "login access...!")
        );
    }
);

//POST register user
router.post(
    "/register",
    multerErrorMiddleware(upload.single("image")),
    async (req: ServerRequest<RegisterUserDTO>, res: Response) => {
        const { password, email, fullName, username, confirmPassword } =
            req.body;
        let duplicateField = {
            username: "",
            email: "",
        };
        let user = new User();
        user.password = password;
        user.email = email;
        user.fullName = fullName;
        user.username = username;

        //validate user
        const { error } = validateUser({
            ...req.body,
        });

        if (error) {
            let errorToSend = {};
            error.details.forEach((detailError) => {
                errorToSend[`${detailError.path[0]}`] = detailError.message;
            });
            return res
                .status(statusCode.BAD_REQUEST)
                .send(
                    dataHelper.getResponseForm(
                        null,
                        errorToSend,
                        "validation error"
                    )
                );
        }

        //get connection
        const userRepo = await getCustomRepository(UserRepository);
        //check is esxisted user
        let isExistedUser = await userRepo.findByEmail(email);
        if (isExistedUser)
            duplicateField = {
                ...duplicateField,
                email: "This email already existed",
            };

        isExistedUser = await userRepo.findByUsername(username);
        if (isExistedUser)
            duplicateField = {
                ...duplicateField,
                username: "This username already existed",
            };
        if (duplicateField.email !== "" || duplicateField.username !== "")
            return res
                .status(statusCode.BAD_REQUEST)
                .send(
                    dataHelper.getResponseForm(
                        null,
                        duplicateField,
                        "Duplicate information"
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
            .status(statusCode.CREATED)
            .send(
                dataHelper.getResponseForm(null, null, "register success...!")
            );
    }
);

//GET get user by username
router.get(
    "/:username",
    async (req: Request<{ username: string }>, res: Response) => {
        const { username } = req.params;
        //get connection
        const userRepo = await getCustomRepository(UserRepository);
        const user = await userRepo.findByUsername(username);
        res.send(dataHelper.getResponseForm(user, null, "get user success"));
    }
);

export default router;
