import { createAsyncThunk } from '@reduxjs/toolkit';
import { store } from '..';
import { userApi } from '../../api/userApi';
import { LoginUserDTO, RegisterUserDTO } from '../../common/interfaces/form';
import { UpdateUserField } from '../../common/interfaces/user';
import { userListAction } from '../user/user';
import * as notificationHelper from '../../utils/notificationHelper';
export const formThunk = {
    login: createAsyncThunk('form/login', async (input: LoginUserDTO, { rejectWithValue }) => {
        try {
            const res = await userApi.loginUser(input);
            store.dispatch(userListAction.setLogin(true));
            return res;
        } catch (error: any) {
            if (error.response.data.detail.error.general) {
                notificationHelper.warning(error.response.data.detail.error.general);
            }
            return rejectWithValue(error.response.data);
        }
    }),
    register: createAsyncThunk('form/register', async (input: RegisterUserDTO, { rejectWithValue }) => {
        try {
            await userApi.registerUser(input);
        } catch (error: any) {
            if (error.response.data.detail.error.general) {
                notificationHelper.warning(error.response.data.detail.error.general);
            }
            return rejectWithValue(error.response.data);
        }
    }),
    update: createAsyncThunk('form/update', async (input: UpdateUserField, { rejectWithValue }) => {
        try {
            await userApi.updateUser(input);
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }),
};
