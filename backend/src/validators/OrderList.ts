import * as Joi from "joi";
import { OrderListStatus } from "../entity/OrderList";
import {
    OrderItemRequestDTO,
    RequestWithOrderListDTO,
} from "../interfaces/DTO/orderList";
import { stringCustomMessage } from "./common/message";

const orderListSchema = Joi.object({
    orderItem: Joi.array().items(
        Joi.object<OrderItemRequestDTO>({
            amount: Joi.number(),
            price: Joi.number(),
            createDate: Joi.date().default(Date.now()),
            productID: Joi.string().required(),
            sizeID: Joi.number().required(),
            colorID: Joi.number().required(),
        })
    ),
    status: Joi.string()
        .valid("WAITING", "SHIPPING", "DONE", "CANCEL")
        .default("WAITING"),
    address: Joi.string().required().messages(stringCustomMessage),
    phoneNumber: Joi.string()
        .required()
        .min(7)
        .max(15)
        .messages({
            ...stringCustomMessage,
            "string.min": "length should be less than 7 numbers",
            "string.max": "length should be less than 15 numbers",
            "string.pattern.base": "invalid phone number",
        }),
});

const updateOrderListSchema = Joi.object({
    ID: Joi.string().required(),
    status: Joi.string()
        .valid("WAITING", "SHIPPING", "DONE", "CANCEL")
        .default(0)
        .required(),
});

export const validateOrderList = (orderList: RequestWithOrderListDTO) => {
    return orderListSchema.validate(orderList, { abortEarly: false });
};

export const validateUpdateOrderList = (
    status: OrderListStatus,
    ID: string
) => {
    return updateOrderListSchema.validate(
        { status, ID },
        { abortEarly: false }
    );
};
