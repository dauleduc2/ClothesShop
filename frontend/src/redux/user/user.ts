import { createSlice } from "@reduxjs/toolkit";
import {
    UserState,
    UserLoginPayload,
    SetIsLoginPayload,
} from "../../common/interfaces/user";
import { userThunk } from "./userThunk";

const initialState: UserState = {
    isLogin: false,
    user: {
        ID: null,
        username: null,
        fullName: null,
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
    extraReducers: (builder) => {
        builder.addCase(
            userThunk.getCurrentUser.fulfilled,
            (state, { payload }) => {
                const newState = { ...state };
                newState.isLogin = true;
                newState.user = {
                    ID: payload.ID,
                    avatar: payload.avatar,
                    createDate: payload.createDate,
                    email: payload.email,
                    fullName: payload.fullName,
                    role: payload.role,
                    userStatus: payload.userStatus,
                    username: payload.username,
                };
                return newState;
            }
        );
    },
});
export const userListAction = { ...user.actions };
export default user.reducer;
