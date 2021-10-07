import { createSlice } from '@reduxjs/toolkit';
import { UserState, UpdateUserPayload, SetIsLoginPayload } from '../../common/interfaces/user';
import { userThunk } from './userThunk';

const initialState: UserState = {
    isLogin: false,
    user: {
        ID: '',
        username: '',
        fullName: '',
        avatar: '',
        email: '',
        userStatus: -1,
        role: -1,
        createDate: '',
    },
};

export const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetState: () => {
            return {
                ...initialState,
            };
        },
        updateUser: (state: UserState, action: UpdateUserPayload) => {
            return {
                ...state,
                ...action.payload,
            };
        },
        setLogin: (state: UserState, action: SetIsLoginPayload) => {
            //return initial state when isLogin set to false
            if (!action.payload) {
                return {
                    ...initialState,
                };
            }
            //update when isLogin is set to true
            return {
                ...state,
                isLogin: action.payload,
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(userThunk.getCurrentUser.fulfilled, (state, { payload }) => {
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
        });
        builder.addCase(userThunk.updateUser.fulfilled, (state, { payload }) => {
            const newState = {
                ...state,
                user: {
                    ...state.user,
                    ...payload,
                },
            };

            return newState;
        });
    },
});
export const userListAction = { ...user.actions };
export default user.reducer;
