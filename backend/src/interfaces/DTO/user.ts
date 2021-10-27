import { User } from "../../entity/User";

export interface UpdateUserDTO
    extends Partial<
        Pick<User, "fullName" | "avatar" | "email" | "address" | "phoneNumber">
    > {}

export interface LoginUserDTO extends Pick<User, "username"> {
    password: string;
}

export interface RegisterUserDTO
    extends Pick<User, "email" | "fullName" | "username"> {
    password: string;
    confirmPassword: string;
}
