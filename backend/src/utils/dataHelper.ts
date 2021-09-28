//create data form to send back to client side
export const getResponseForm = function (data, message) {
    const dataForm = {
        data: [],
        detail: {
            message: null,
            error: null,
        },
    };
    if (data) {
        dataForm.data.push(data);
    }
    if (message) {
        dataForm.detail.message = message;
    }
    return dataForm;
};
