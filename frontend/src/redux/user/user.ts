import { createSlice } from '@reduxjs/toolkit';
import { ReduxAction } from '../../common/interfaces/redux';
import { UserState, PossibleUpdateUserField } from '../../common/interfaces/user';
import { defaultUser } from '../common/defaultValue';
import { userThunk } from './userThunk';

const initialState: UserState = {
    isLogin: false,
    user: defaultUser,
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
        updateUser: (state: UserState, { payload }: ReduxAction<PossibleUpdateUserField>) => {
            return {
                ...state,
                ...payload,
            };
        },
        setLogin: (state: UserState, { payload }: ReduxAction<boolean>) => {
            //return initial state when isLogin set to false
            if (!payload) {
                return {
                    ...initialState,
                };
            }
            //update when isLogin is set to true
            return {
                ...state,
                isLogin: payload,
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(userThunk.getCurrentUser.fulfilled, (state, { payload }) => {
            return {
                isLogin: true,
                user: { ...payload },
            };
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
        builder.addCase(userThunk.logout.fulfilled, (state, { payload }) => {
            return {
                ...initialState,
            };
        });
    },
});
export const userListAction = { ...user.actions };
export default user.reducer;
