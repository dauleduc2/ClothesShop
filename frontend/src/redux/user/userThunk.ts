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
            const { fullName, avatar, email, address } = res.data.data;
            return { fullName, avatar, email, address };
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }),
    logout: createAsyncThunk('/user/logout', async () => {
        await userApi.logout();
    }),
    getAllUser: createAsyncThunk('/user/getAllUser', async ({ limit, page }: { limit: number; page: number }) => {
        const res = await userApi.getAllUser(limit, page);
        return res.data.data;
    }),
};
