import { createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from '../../api/userApi';
import { LoginUserDTO, RegisterUserDTO } from '../../common/interfaces/form';
import { UpdateUserField } from '../../common/interfaces/user';

export const formThunk = {
    login: createAsyncThunk('form/login', async (input: LoginUserDTO, { rejectWithValue }) => {
        try {
            return await userApi.loginUser(input);
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }),
    register: createAsyncThunk('form/register', async (input: RegisterUserDTO, { rejectWithValue }) => {
        try {
            await userApi.registerUser(input);
        } catch (error: any) {
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
