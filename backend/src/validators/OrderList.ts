import * as Joi from "joi";
import {
    OrderItemRequest,
    RequestWithOrderList,
} from "../interfaces/orderList";

const OrderListSchema = Joi.object({
    ID: Joi.string().max(255),
    orderItem: Joi.array().items(
        Joi.object<OrderItemRequest>({
            ID: Joi.string().max(255),
            amount: Joi.number(),
            price: Joi.number(),
            createDate: Joi.date().default(Date.now()),
            productID: Joi.string().required(),
            sizeID: Joi.number().required(),
            colorID: Joi.number().required(),
        })
    ),
    status: Joi.number().default(0).required(),
    createDate: Joi.date().default(Date.now()),
});

const validateOrderList = (orderList: RequestWithOrderList) => {
    return OrderListSchema.validate(orderList, { abortEarly: false });
};
export default validateOrderList;
