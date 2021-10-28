import { createAsyncThunk } from '@reduxjs/toolkit';
import { typeApi } from '../../api/typeApi';
import { AddTypeDTO, AdminRemoveTypeDTO } from '../../common/interfaces/DTO/typeDTO';
import { AddTypeErrorMessageDTO } from '../../common/interfaces/Redux/type';
import * as notificationHelper from '../../utils/notificationHelper';

export const typeThunk = {
    adminGetAllType: createAsyncThunk('type/adminGetAllType', async () => {
        const res = await typeApi.adminGetAllType();
        return res.data.data;
    }),
    adminAddNewType: createAsyncThunk<any, AddTypeDTO, { rejectValue: AddTypeErrorMessageDTO }>(
        'Type/adminAddNewType',
        async (newType, { rejectWithValue }) => {
            try {
                const res = await typeApi.adminAddNewType(newType);
                return res.data.data;
            } catch (error: any) {
                const errorForm = error.response.data.detail.error as AddTypeErrorMessageDTO;
                if (errorForm.general) {
                    notificationHelper.warning(error.response.data.detail.error.general);
                }
                return rejectWithValue(errorForm);
            }
        }
    ),
    adminRemoveType: createAsyncThunk<AdminRemoveTypeDTO, number>('color/adminRemoveType', async (ID) => {
        await typeApi.adminRemoveType(ID);
        return { ID };
    }),
};
