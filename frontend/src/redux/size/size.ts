import { createSlice } from '@reduxjs/toolkit';
import { SizeState } from '../../common/interfaces/Redux/size';
import { sizeThunk } from './sizeThunk';

const initialState: SizeState = {
    data: [],
};
export const size = createSlice({
    name: 'size',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(sizeThunk.adminGetAllSize.fulfilled, (state: SizeState, { payload }) => {
            return {
                ...state,
                data: payload,
            };
        });
        builder.addCase(sizeThunk.adminAddNewSize.fulfilled, (state: SizeState, { payload }) => {
            const newData = [...state.data, payload];

            return {
                ...state,
                data: newData,
            };
        });
        builder.addCase(sizeThunk.adminRemoveSize.fulfilled, (state, { payload }) => {
            const newSizeList = state.data.filter((size) => size.ID !== payload.ID);
            return {
                ...state,
                data: newSizeList,
            };
        });
    },
});

export const productAction = { ...size.actions };
export default size.reducer;
