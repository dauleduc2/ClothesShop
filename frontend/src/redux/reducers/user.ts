import { createSlice } from "@reduxjs/toolkit";
import {
    UserState,
    UserLoginPayload,
    SetIsLoginPayload,
} from "../../common/interfaces/user";

const initialState: UserState = {
    isLogin: false,
    user: {
        ID: null,
        username: null,
        fullname: null,
        avatar: null,
        email: null,
        userStatus: -1,
        role: -1,
        createDate: null,
    },
};

export const user = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetState: () => {
            return {
                ...initialState,
            };
        },
        setUser: (state: UserState, action: UserLoginPayload) => {
            const data = {
                ...action.payload,
            };
            return {
                ...state,
                user: data,
            };
        },
        setLogin: (state: UserState, action: SetIsLoginPayload) => {
            return {
                ...state,
                isLogin: action.payload,
            };
        },
    },
});
export const userListAction = { ...user.actions };
export default user.reducer;
