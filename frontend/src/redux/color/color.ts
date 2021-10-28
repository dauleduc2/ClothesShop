import { createSlice } from '@reduxjs/toolkit';
import { ColorState } from '../../common/interfaces/Redux/color';
import { colorThunk } from './colorThunk';

const initialState: ColorState = {
    data: [],
};
export const color = createSlice({
    name: 'color',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(colorThunk.adminGetAllColor.fulfilled, (state: ColorState, { payload }) => {
            return {
                ...state,
                data: payload,
            };
        });
        builder.addCase(colorThunk.adminAddNewColor.fulfilled, (state: ColorState, { payload }) => {
            const newData = [...state.data, payload];
            return {
                ...state,
                data: newData,
            };
        });
        builder.addCase(colorThunk.adminRemoveColor.fulfilled, (state, { payload }) => {
            const newColorList = state.data.filter((color) => color.ID !== payload.ID);
            return {
                ...state,
                data: newColorList,
            };
        });
    },
});

export const productAction = { ...color.actions };
export default color.reducer;
