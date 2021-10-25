export interface JoiError {
    [key: string]: string;
}

export interface ServerResponse<T, E> {
    data: T;
    detail: {
        error: E;
        message: string;
    };
}

export interface ResponseWithCount<T> {
    data: T;
    count: number;
}
