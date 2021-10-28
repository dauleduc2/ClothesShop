import { createAsyncThunk } from '@reduxjs/toolkit';
import { colorApi } from '../../api/colorApi';
import { AddColorDTO, AddColorErrorMessageDTO } from '../../common/interfaces/DTO/colorDTO';
import * as notificationHelper from '../../utils/notificationHelper';

export const colorThunk = {
    adminGetAllColor: createAsyncThunk('color/adminGetAllColor', async () => {
        const res = await colorApi.adminGetAllColor();
        return res.data.data;
    }),
    adminAddNewColor: createAsyncThunk<any, AddColorDTO, { rejectValue: AddColorErrorMessageDTO }>(
        'color/adminAddNewColor',
        async (newColor, { rejectWithValue }) => {
            try {
                const res = await colorApi.adminAddNewColor(newColor);
                return res.data.data;
            } catch (error: any) {
                const errorForm = error.response.data.detail.error as AddColorErrorMessageDTO;
                if (errorForm.general) {
                    notificationHelper.warning(error.response.data.detail.error.general);
                }
                return rejectWithValue(errorForm);
            }
        }
    ),
};
