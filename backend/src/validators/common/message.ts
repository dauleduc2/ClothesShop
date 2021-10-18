export const stringCustomMessage = {
    "string.empty": "required",
    "any.required": "required",
    "string.min": "length should be at least 3 characters",
};

export const stringCustomEmail = {
    ...stringCustomMessage,
    "string.email": "invalid email",
};

export const stringCustomConfirmPassword = {
    ...stringCustomMessage,
    "any.only": "should be the same with password",
};
