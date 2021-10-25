import { createAsyncThunk } from '@reduxjs/toolkit';
import { store } from '..';
import { userApi } from '../../api/userApi';
import {
    LoginFormErrorMessage,
    LoginUserDTO,
    RegisterFormErrorMessage,
    RegisterUserDTO,
    UpdateFormErrorMessage,
    UpdateUserFieldDTO,
} from '../../common/interfaces/DTO/userDTO';
import { userListAction } from '../user/user';
import * as notificationHelper from '../../utils/notificationHelper';
export const formThunk = {
    login: createAsyncThunk<any, LoginUserDTO, { rejectValue: LoginFormErrorMessage }>(
        'form/login',
        async (input, { rejectWithValue }) => {
            try {
                const res = await userApi.loginUser(input);
                store.dispatch(userListAction.setLogin(true));
                return res;
            } catch (error: any) {
                const errorForm = error.response.data.detail.error as RegisterFormErrorMessage;
                if (errorForm.general) {
                    notificationHelper.warning(error.response.data.detail.error.general);
                }
                return rejectWithValue(errorForm);
            }
        }
    ),
    register: createAsyncThunk<any, RegisterUserDTO, { rejectValue: RegisterFormErrorMessage }>(
        'form/register',
        async (input, { rejectWithValue }) => {
            try {
                await userApi.registerUser(input);
            } catch (error: any) {
                const errorForm = error.response.data.detail.error as RegisterFormErrorMessage;

                if (errorForm.general) {
                    notificationHelper.warning(error.response.data.detail.error.general);
                }
                return rejectWithValue(errorForm);
            }
        }
    ),
    update: createAsyncThunk<any, UpdateUserFieldDTO, { rejectValue: UpdateFormErrorMessage }>(
        'form/update',
        async (input, { rejectWithValue }) => {
            try {
                await userApi.updateUser(input);
            } catch (error: any) {
                const errorForm = error.response.data.detail.error as UpdateFormErrorMessage;
                if (errorForm.general) {
                    notificationHelper.warning(error.response.data.detail.error.general);
                }
                return rejectWithValue(errorForm);
            }
        }
    ),
};
