export interface UpdateUserDTO {
    fullName?: string;
    avatar?: string;
    email?: string;
    address?: string;
    phoneNumber?: string;
}

export interface LoginUserDTO {
    username: string;
    password: string;
}

export interface RegisterUserDTO {
    email: string;
    fullName: string;
    username: string;
    password: string;
    confirmPassword: string;
}
