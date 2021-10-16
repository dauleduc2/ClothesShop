import * as Joi from "joi";
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
    status: Joi.number()
        .valid("waiting", "shipping", "done", "cancel")
        .default(0)
        .required(),
});

const validateOrderList = (orderList: RequestWithOrderListDTO) => {
    return orderListSchema.validate(orderList, { abortEarly: false });
};
export default validateOrderList;
