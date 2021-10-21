import * as Joi from "joi";
import { OrderListStatus } from "../entity/OrderList";
import {
    OrderItemRequestDTO,
    RequestWithOrderListDTO,
} from "../interfaces/DTO/orderList";

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
        .default(0)
        .required(),
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
