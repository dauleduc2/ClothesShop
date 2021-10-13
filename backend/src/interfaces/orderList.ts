export interface OrderItemRequest {
    ID?: string;
    amount: number;
    price?: number;
    createDate: Date;
    productID: string;
    sizeID: string;
    colorID: string;
}

export interface RequestWithOrderList {
    ID?: string;
    orderItem?: OrderItemRequest[];
    status?: number;
    createDate?: Date;
}
