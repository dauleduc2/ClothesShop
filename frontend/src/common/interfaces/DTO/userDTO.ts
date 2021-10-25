import { JoiError } from '../Common/api';
import { User } from '../Model/User';

export interface PossibleUpdateUserField {
    fullName: string;
    avatar: string;
    email: string;
    userStatus: number;
    createDate: string;
}

export interface UpdateUserFieldDTO {
    fullName: string;
    email: string;
    avatar: File | string | null;
    address: string;
    phoneNumber: string;
}
export interface ShipmentDetailDTO extends Pick<User, 'address' | 'phoneNumber'> {}

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

export interface RegisterFormErrorMessage extends JoiError {
    email: string;
    fullName: string;
    username: string;
    password: string;
    confirmPassword: string;
    general: string;
}

export interface LoginFormErrorMessage extends JoiError {
    username: string;
    password: string;
    general: string;
}

export interface UpdateFormErrorMessage extends JoiError {
    fullName: string;
    avatar: string;
    email: string;
    address: string;
    phoneNumber: string;
    general: string;
}
