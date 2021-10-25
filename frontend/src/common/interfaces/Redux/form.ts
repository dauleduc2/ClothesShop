import { LoginUserDTO, RegisterUserDTO, UpdateUserDTO } from '../DTO/userDTO';

export interface FormState {
    login: LoginUserDTO;
    register: RegisterUserDTO;
    updateUser: UpdateUserDTO;
}
