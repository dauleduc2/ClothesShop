export interface User {
    ID: string | null;
    username: string | null;
    fullName: string | null;
    avatar?: string | null;
    email: string | null;
    userStatus: number;
    role: number;
    createDate?: Date | null;
}

export interface UserState {
    isLogin: boolean;
    user: User;
}

export interface UserAction {
    type: string;
    payload: any;
}
export interface UserLoginPayload extends UserAction {
    payload: User;
}

export interface SetIsLoginPayload extends UserAction {
    payload: boolean;
}
