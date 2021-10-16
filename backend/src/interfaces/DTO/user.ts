export interface BodyUpdateUserDTO {
    fullName?: string;
    avatar?: string;
    email?: string;
}

export interface LoginUserDTO {
    username: string;
    password: string;
}

export interface RegisterUserDTO {
    email: string;
    fullName: string;
    username: string;
    role: number;
    password: string;
}
