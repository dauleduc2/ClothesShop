export interface AnalystDate {
    from: string;
    to: string;
}

export interface AnalystResponse<T> {
    data: T;
    time: string;
}

export interface totalItemByType {
    name: string;
    totalItem: string;
}

export interface totalPriceByType {
    name: string;
    totalPrice: string;
}

export interface GetEachProductProps extends AnalystDate {
    ID: string;
}
