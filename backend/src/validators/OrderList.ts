import * as Joi from "joi";
import { OrderItem } from "../entity/OrderItem";
import { OrderList } from "../entity/OrderList";
import {
    OrderItemRequest,
    RequestWithOrderList,
    RequestWithOrderListBody,
} from "../interfaces/requestWithOrderList";

const OrderListSchema = Joi.object({
    ID: Joi.string().max(255),
    orderItem: Joi.array().items(
        Joi.object<OrderItemRequest>({
            ID: Joi.string().max(255),
            amount: Joi.number(),
            price: Joi.number(),
            createDate: Joi.date().default(Date.now()),
            product: Joi.string().required(),
        })
    ),
    user: Joi.string().required(),
    status: Joi.number().default(0).required(),
    createDate: Joi.date().default(Date.now()),
});

const validateOrderList = (orderList: RequestWithOrderListBody) => {
    return OrderListSchema.validate(orderList, { abortEarly: false });
};
export default validateOrderList;
