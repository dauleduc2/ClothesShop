import { createSlice } from '@reduxjs/toolkit';
import { TypeState } from '../../common/interfaces/Redux/type';
import { typeThunk } from './typeThunk';

const initialState: TypeState = {
    data: [],
};
export const type = createSlice({
    name: 'type',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(typeThunk.adminGetAllType.fulfilled, (state: TypeState, { payload }) => {
            return {
                ...state,
                data: payload,
            };
        });
        builder.addCase(typeThunk.adminAddNewType.fulfilled, (state: TypeState, { payload }) => {
            const newData = [...state.data, payload];
            return {
                ...state,
                data: newData,
            };
        });
    },
});

export const productAction = { ...type.actions };
export default type.reducer;
