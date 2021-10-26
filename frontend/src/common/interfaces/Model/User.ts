export enum UserRole {
    CUSTOMER = 'CUSTOMER',
    ADMIN = 'ADMIN',
}
export type UserRoleString = keyof typeof UserRole;
export interface User {
    ID: string;
    username: string;
    fullName: string;
    avatar: string;
    email: string;
    userStatus: number;
    address: string;
    role: UserRoleString;
    createDate: string;
    phoneNumber: string;
}
