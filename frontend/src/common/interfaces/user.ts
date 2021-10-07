export interface User {
    ID: string;
    username: string;
    fullName: string;
    avatar?: string;
    email: string;
    userStatus: number;
    role: number;
    createDate?: string;
}

export interface PossibleUpdateUserField {
    fullName?: string;
    avatar?: string;
    email?: string;
    userStatus?: number;
    createDate?: string;
}

export interface UserState {
    isLogin: boolean;
    user: User;
}

export interface UserAction {
    type: string;
    payload: any;
}
export interface UpdateUserPayload extends UserAction {
    payload: PossibleUpdateUserField;
}

export interface SetIsLoginPayload extends UserAction {
    payload: boolean;
}

export interface UpdateUserField {
    fullName: string;
    email: string;
    avatar: File | string | null;
}
