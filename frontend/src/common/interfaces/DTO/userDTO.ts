import { JoiError } from '../Common/api';
import { User } from '../Model/User';

export interface UpdateUserFieldDTO extends Pick<User, 'fullName' | 'email' | 'address' | 'phoneNumber'> {
    avatar: File | string;
}
export interface ShipmentDetailDTO extends Pick<User, 'address' | 'phoneNumber'> {}

export interface LoginUserDTO extends Pick<User, 'username'> {
    password: string;
}
export interface RegisterUserDTO extends Pick<User, 'email' | 'fullName' | 'username'> {
    password: string;
    confirmPassword: string;
}

export interface RegisterFormErrorMessageDTO extends JoiError {
    email: string;
    fullName: string;
    username: string;
    password: string;
    confirmPassword: string;
    general: string;
}

export interface LoginFormErrorMessageDTO extends JoiError {
    username: string;
    password: string;
    general: string;
}

export interface UpdateFormErrorMessageDTO extends JoiError {
    fullName: string;
    avatar: string;
    email: string;
    address: string;
    phoneNumber: string;
    general: string;
}
