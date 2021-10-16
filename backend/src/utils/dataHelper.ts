//create data form to send back to client side
export const getResponseForm = function (data, error, message: string) {
    return {
        data: data,
        detail: {
            error,
            message,
        },
    };
};
