export interface JoiError {
    [key: string]: string;
}

export interface ServerResponse<T> {
    data: T;
    detail: {
        error: JoiError;
        message: string;
    };
}
