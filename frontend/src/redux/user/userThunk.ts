import { createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from '../../api/userApi';
import { UpdateUserField } from '../../common/interfaces/user';
export const userThunk = {
    getCurrentUser: createAsyncThunk('user/getCurrentUser', async () => {
        const res = await userApi.getCurrentUser();
        return res.data.data;
    }),
    updateUser: createAsyncThunk('/user/updateUser', async (data: UpdateUserField, { rejectWithValue }) => {
        try {
            const res = await userApi.updateUser(data);
            const { fullName, avatar, email } = res.data.data;
            return { fullName, avatar, email };
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }),
    logout: createAsyncThunk('/user/logout', async () => {
        await userApi.logout();
    }),
};
