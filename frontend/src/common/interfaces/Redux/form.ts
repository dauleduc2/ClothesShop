import { AddColorErrorMessageDTO } from './../DTO/colorDTO';
import { LoginFormErrorMessageDTO, RegisterFormErrorMessageDTO, UpdateFormErrorMessageDTO } from '../DTO/userDTO';
import { AddSizeErrorMessageDTO } from './size';
import { AddTypeErrorMessageDTO } from './type';

export interface FormState {
    login: LoginFormErrorMessageDTO;
    register: RegisterFormErrorMessageDTO;
    updateUser: UpdateFormErrorMessageDTO;
    addSize: AddSizeErrorMessageDTO;
    addColor: AddColorErrorMessageDTO;
    addType: AddTypeErrorMessageDTO;
}
