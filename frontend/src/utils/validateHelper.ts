export const validateEmail = (email: string) => {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

export const max = (string: string, max: number) => {
    return string.length <= max;
};
export const min = (string: string, min: number) => {
    return string.length >= min;
};
export const length = (string: string, min: number, max: number) => {
    return string.length >= min && string.length <= max;
};
