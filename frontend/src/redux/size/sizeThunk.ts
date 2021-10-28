import { createAsyncThunk } from '@reduxjs/toolkit';
import { sizeApi } from '../../api/sizeApi';
import { AddSizeDTO, AdminRemoveSizeDTO } from '../../common/interfaces/DTO/sizeDTO';
import { AddSizeErrorMessageDTO } from '../../common/interfaces/Redux/size';
import * as notificationHelper from '../../utils/notificationHelper';

export const sizeThunk = {
    adminGetAllSize: createAsyncThunk('size/adminGetAllSize', async () => {
        const res = await sizeApi.adminGetAllSize();
        return res.data.data;
    }),
    adminAddNewSize: createAsyncThunk<any, AddSizeDTO, { rejectValue: AddSizeErrorMessageDTO }>(
        'Size/adminAddNewSize',
        async (newSize, { rejectWithValue }) => {
            try {
                const res = await sizeApi.adminAddNewSize(newSize);
                return res.data.data;
            } catch (error: any) {
                const errorForm = error.response.data.detail.error as AddSizeErrorMessageDTO;
                if (errorForm.general) {
                    notificationHelper.warning(error.response.data.detail.error.general);
                }
                return rejectWithValue(errorForm);
            }
        }
    ),
    adminRemoveSize: createAsyncThunk<AdminRemoveSizeDTO, number>('color/adminRemoveSize', async (ID) => {
        await sizeApi.adminRemoveSize(ID);
        return { ID };
    }),
};
