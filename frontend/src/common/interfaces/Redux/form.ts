import { LoginFormErrorMessageDTO, RegisterFormErrorMessageDTO, UpdateFormErrorMessageDTO } from '../DTO/userDTO';

export interface FormState {
    login: LoginFormErrorMessageDTO;
    register: RegisterFormErrorMessageDTO;
    updateUser: UpdateFormErrorMessageDTO;
}
