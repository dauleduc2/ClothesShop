import { User } from '../Model/User';

export interface UserState {
    isLogin: boolean;
    user: User;
    admin: {
        userList: User[];
        count: number;
    };
}
