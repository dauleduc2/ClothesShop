export interface FormState {
    login: LoginUserDTO;
    register: RegisterUserDTO;
    updateUser: UpdateUserDTO;
}
export interface LoginUserDTO {
    username: string;
    password: string;
    general: string;
}
export interface RegisterUserDTO {
    email: string;
    fullName: string;
    username: string;
    password: string;
    confirmPassword: string;
    general: string;
}
export interface UpdateUserDTO {
    fullName: string;
    avatar: string;
    email: string;
    address: string;
    phoneNumber: string;
    general: string;
}
