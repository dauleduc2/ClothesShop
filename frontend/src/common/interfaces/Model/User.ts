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
