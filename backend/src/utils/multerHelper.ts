import { Request } from "express";
import * as multer from "multer";
//max size of each file
const maxSize = 1 * 1080 * 1080;
//storage config
const storage = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb: any) {
        cb(null, "./uploads/");
    },
    filename: function (req: Request, file: Express.Multer.File, cb: any) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + file.originalname);
    },
});
//fillter : acept only jpg, jpeg, png files
const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
    if (
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png"
    ) {
        cb(null, true);
    } else {
        cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
    }
};
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: maxSize },
});
export default upload;
