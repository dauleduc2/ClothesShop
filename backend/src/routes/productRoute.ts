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
import { ServerRequest } from "../interfaces/common/Request";
import {
    AddProductInfoDTO,
    GetProductByTypeDTO,
    UpdateProductDTO,
} from "../interfaces/DTO/product";
import * as statusCode from "../constants/statusConstants";
import { AdminQueryPage } from "../interfaces/common/Query";
import { ImageRepository } from "../Repository/ImageRepository";
const router = express.Router();

//GET specific product
router.get(
    "/:productName",
    async (req: Request<{ productName: string }>, res: Response) => {
        const { productName } = req.params;
        //connection
        const productRepo = getCustomRepository(ProductRepository);
        const result = await productRepo.findByName(
            productName.split("-").join(" ").trim()
        );

        res.send(
            dataHelper.getResponseForm(
                result,
                null,
                "get product list success!"
            )
        );
    }
);

//GET get all product to show
router.get(
    "/",
    async (req: Request<null, null, null, AdminQueryPage>, res: Response) => {
        //connection
        const productRepo = getCustomRepository(ProductRepository);
        const result = await productRepo.getAllProductToShow({
            limit: req.query.limit,
            page: req.query.page,
        });
        res.send(
            dataHelper.getResponseForm(
                result,
                null,
                "get product list success!"
            )
        );
    }
);

//POST add new product to db
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
    async (req: ServerRequest<AddProductInfoDTO>, res: Response) => {
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
                .status(statusCode.BAD_REQUEST)
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
        const isDuplicate: Product[] = await productRepo.findByName(
            newProduct.name
        );

        if (isDuplicate.length > 0)
            return res
                .status(statusCode.BAD_REQUEST)
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

        res.status(statusCode.CREATED).send(
            dataHelper.getResponseForm(result, null, "add new product success!")
        );
    }
);

//POST update product to db
router.post(
    "/:ID",
    [
        authenMiddleware,
        authorMiddleware,
        multerErrorMiddleware(
            upload.fields([
                { name: "newImages", maxCount: 6 },
                { name: "newProductAvatar", maxCount: 1 },
            ])
        ),
    ],
    async (req: Request<{ ID: string }, null, any, null>, res: Response) => {
        const { ID } = req.params;
        let {
            name,
            quantity,
            description,
            price,
            status,
            sizes,
            types,
            colors,
            images,
            productAvatar,
        } = req.body;
        if (!sizes) {
            sizes = [];
        }
        if (!colors) {
            colors = [];
        }
        if (!types) {
            types = [];
        }
        if (!images) {
            images = [];
        } else if (typeof images === "string") {
            images = [...images];
        }
        const updateProduct: UpdateProductDTO = {
            name,
            quantity,
            description,
            price,
            status,
            productAvatar,
        };
        const { files } = req;
        //handle images
        const newImagesFileList = [];
        if (files["newImages"] && files["newImages"].length > 0) {
            for (let i = 0; i < files["newImages"].length; i++) {
                const element = files["newImages"][i];
                newImagesFileList.push(element);
            }
        }
        var newImageList: Image[];
        if (newImagesFileList.length > 0) {
            newImageList = newImagesFileList.map((item) => {
                const newImage = new Image();
                newImage.imageLink = item.filename;
                return newImage;
            });
        }
        //handle avatar
        let newProductAvatar;
        if (files["newProductAvatar"] && files["newProductAvatar"].length > 0) {
            newProductAvatar = files["newProductAvatar"][0];
        }
        if (newProductAvatar) {
            updateProduct.productAvatar = newProductAvatar.filename;
        } else {
            updateProduct.productAvatar = productAvatar;
        }
        //get connection
        const connection = await Promise.all<any>([
            getCustomRepository(SizeRepository),
            getCustomRepository(ColorRepository),
            getCustomRepository(TypeRepository),
            getCustomRepository(ImageRepository),
            getCustomRepository(ProductRepository),
        ]);
        const sizeRepo: SizeRepository = connection[0];
        const colorRepo: ColorRepository = connection[1];
        const typeRepo: TypeRepository = connection[2];
        const imageRepo: ImageRepository = connection[3];
        const productRepo: ProductRepository = connection[4];
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

        const imagelist = Promise.all<Image>(
            images.map((item) => imageRepo.findByID(item))
        );
        updateProduct.colors = await colorList;
        updateProduct.types = await typeList;
        updateProduct.sizes = await sizeList;
        updateProduct.images = await imagelist;

        if (newImageList && newImageList.length > 0) {
            updateProduct.images = [...updateProduct.images, ...newImageList];
        }
        const result = await productRepo.updateProduct(ID, updateProduct);
        res.send(
            dataHelper.getResponseForm(result, null, "update product success!")
        );
    }
);

//GET - get all category
router.get(
    "/type/:name",
    async (req: Request<GetProductByTypeDTO>, res: Response) => {
        const { name } = req.params;
        //connection
        const connection = await Promise.all<any>([
            getCustomRepository(TypeRepository),
            getCustomRepository(ProductRepository),
        ]);
        const typeRepo: TypeRepository = connection[0];
        const productRepo: ProductRepository = connection[1];

        const selectedType = await typeRepo.findProductIdByTypeName(name);
        const productList = await Promise.all<Product>(
            selectedType.map((item) =>
                productRepo.findByIDWithRelation(item.productID)
            )
        );
        return res.send(
            dataHelper.getResponseForm(
                productList,
                null,
                "get product by category"
            )
        );
    }
);
//GET - get all category
router.get(
    "/search/:name",
    async (req: Request<GetProductByTypeDTO>, res: Response) => {
        const { name } = req.params;
        //connection
        const connection = await Promise.all<any>([
            getCustomRepository(ProductRepository),
        ]);
        const productRepo: ProductRepository = connection[0];
        const productList = await productRepo.findByNameInclude(name);
        return res.send(
            dataHelper.getResponseForm(productList, null, "search product")
        );
    }
);
export default router;
