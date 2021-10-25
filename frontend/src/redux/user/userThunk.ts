import { createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from '../../api/userApi';
import { UpdateFormErrorMessage, UpdateUserFieldDTO } from '../../common/interfaces/DTO/userDTO';
import * as notificationHelper from '../../utils/notificationHelper';
export const userThunk = {
    getCurrentUser: createAsyncThunk('user/getCurrentUser', async () => {
        const res = await userApi.getCurrentUser();
        return res.data.data;
    }),
    updateUser: createAsyncThunk<any, UpdateUserFieldDTO, { rejectValue: UpdateFormErrorMessage }>(
        '/user/updateUser',
        async (data, { rejectWithValue }) => {
            try {
                const res = await userApi.updateUser(data);
                const { fullName, avatar, email, address } = res.data.data;
                return { fullName, avatar, email, address };
            } catch (error: any) {
                const errorForm = error.response.data.detail.error as UpdateFormErrorMessage;
                if (errorForm.general) {
                    notificationHelper.warning(error.response.data.detail.error.general);
                }
                return rejectWithValue(errorForm);
            }
        }
    ),
    logout: createAsyncThunk('/user/logout', async () => {
        await userApi.logout();
    }),
    getAllUser: createAsyncThunk('/user/getAllUser', async ({ limit, page }: { limit: number; page: number }) => {
        const res = await userApi.getAllUser(limit, page);
        return res.data.data;
    }),
};
