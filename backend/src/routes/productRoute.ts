import { Size } from "./../entity/Size";
import { Color } from "./../entity/Color";
import { Type } from "./../entity/Type";
import { Request, Response } from "express";
import upload from "../utils/multerHelper";

import * as express from "express";
import { Product } from "../entity/Product";
import validateProduct from "../validators/Product";
import * as dataHelper from "../utils/dataHelper";
import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../Repository/ProductRepository";
import { SizeRepository } from "../Repository/SizeRepository";
import { ColorRepository } from "../Repository/ColorRepository";
import { TypeRepository } from "../Repository/TypeRepository";
import { Image } from "../entity/Image";
import { authenMiddleware } from "../middlewares/authenMiddleware";
import { authorMiddleware } from "../middlewares/authorMiddleware";
import { multerErrorMiddleware } from "../middlewares/multerErrorMiddleware";
const router = express.Router();
//GET get all product to show
router.get("/", async (req: Request, res: Response) => {
    //connection
    const productRepo = getCustomRepository(ProductRepository);
    const result = await productRepo.getAllProductToShow();
    res.status(200).send(
        dataHelper.getResponseForm(result, null, "get product list success!")
    );
});
// upload.array("images", 5);
router.post(
    "/",
    [
        authenMiddleware,
        authorMiddleware,
        multerErrorMiddleware(
            upload.fields([
                { name: "images", maxCount: 6 },
                { name: "productAvatar", maxCount: 1 },
            ])
        ),
    ],
    async (req: Request, res: Response) => {
        const {
            name,
            quantity,
            description,
            price,
            status,
            sizes,
            types,
            colors,
        } = req.body;
        const { files } = req;
        const fileList = [];
        for (let i = 0; i < files["images"].length; i++) {
            const element = files["images"][i];
            fileList.push(element);
        }
        const productAvatar = files["productAvatar"][0];
        console.log(files["productAvatar"][0].filename);
        let newProduct = new Product();
        newProduct.name = name;
        newProduct.quantity = quantity;
        newProduct.description = description;
        newProduct.price = price;
        newProduct.status = status;
        newProduct.productAvatar = productAvatar.filename;
        const { error } = validateProduct(newProduct);
        if (error)
            return res
                .status(400)
                .send(
                    dataHelper.getResponseForm(
                        null,
                        error.details,
                        "validation error"
                    )
                );

        //get connection
        const connection = await Promise.all<any>([
            getCustomRepository(ProductRepository),
            getCustomRepository(SizeRepository),
            getCustomRepository(ColorRepository),
            getCustomRepository(TypeRepository),
        ]);
        const productRepo: ProductRepository = connection[0];
        const sizeRepo: SizeRepository = connection[1];
        const colorRepo: ColorRepository = connection[2];
        const typeRepo: TypeRepository = connection[3];
        //check duplicate
        const isDuplicate = await productRepo.findByName(newProduct.name);
        if (isDuplicate)
            return res
                .status(400)
                .send(
                    dataHelper.getResponseForm(
                        null,
                        null,
                        "This name of product already have in store"
                    )
                );
        //find id of each size,color,type and add images

        const sizeList = Promise.all<Size>(
            sizes.map((item) => sizeRepo.findByID(item))
        );

        const colorList = Promise.all<Color>(
            colors.map((item) => colorRepo.findByID(item))
        );

        const typeList = Promise.all<Type>(
            types.map((item) => typeRepo.findByID(item))
        );

        const imageList = Promise.all<Image>(
            fileList.map((item) => {
                const newImage = new Image();
                newImage.imageLink = item.filename;
                return newImage;
            })
        );

        newProduct.colors = await colorList;
        newProduct.types = await typeList;
        newProduct.sizes = await sizeList;
        newProduct.images = await imageList;
        //add product
        const result = await productRepo.addNewProduct(newProduct);

        res.status(200).send(
            dataHelper.getResponseForm(result, null, "add new product success!")
        );
    }
);
export default router;
