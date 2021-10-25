import { LoginFormErrorMessage, RegisterFormErrorMessage, UpdateFormErrorMessage } from '../DTO/userDTO';

export interface FormState {
    login: LoginFormErrorMessage;
    register: RegisterFormErrorMessage;
    updateUser: UpdateFormErrorMessage;
}
