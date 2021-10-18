import { createSlice } from '@reduxjs/toolkit';
import { formState } from '../../common/interfaces/form';
import { defaultRegisterUser, defaultUpdateUser, defautLoginUser } from '../common/defaultValue';
import { userThunk } from '../user/userThunk';
import { formThunk } from './formThunk';

const initialState: formState = {
    login: defautLoginUser,
    register: defaultRegisterUser,
    updateUser: defaultUpdateUser,
};
export const form = createSlice({
    name: 'form',
    initialState,
    reducers: {
        resetState: () => {
            return {
                ...initialState,
            };
        },
    },
    extraReducers: (builder) => {
        //login
        builder.addCase(formThunk.login.fulfilled, (state, { payload }: any) => {
            return {
                ...state,
                login: {
                    ...initialState.login,
                },
            };
        });
        builder.addCase(formThunk.login.rejected, (state, { payload }: any) => {
            return {
                ...state,
                login: {
                    ...payload?.detail.error,
                },
            };
        });
        //register
        builder.addCase(formThunk.register.fulfilled, (state) => {
            return {
                ...state,
                register: {
                    ...initialState.register,
                },
            };
        });
        builder.addCase(formThunk.register.rejected, (state, { payload }: any) => {
            return {
                ...state,
                register: {
                    ...payload?.detail.error,
                },
            };
        });
        //update
        builder.addCase(userThunk.updateUser.rejected, (state, { payload }: any) => {
            return {
                ...state,
                updateUser: {
                    ...payload?.detail.error,
                },
            };
        });
    },
});

export const productAction = { ...form.actions };
export default form.reducer;
