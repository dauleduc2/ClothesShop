export enum UserRole {
    CUSTOMER,
    ADMIN,
}
export interface User {
    ID: string;
    username: string;
    fullName: string;
    avatar: string;
    email: string;
    userStatus: number;
    address: string;
    role: UserRole;
    createDate: string;
    phoneNumber: string;
}

export interface PossibleUpdateUserField {
    fullName: string;
    avatar: string;
    email: string;
    userStatus: number;
    createDate: string;
}

export interface UserState {
    isLogin: boolean;
    user: User;
}

export interface UpdateUserField {
    fullName: string;
    email: string;
    avatar: File | string | null;
    address: string;
    phoneNumber: string;
}
