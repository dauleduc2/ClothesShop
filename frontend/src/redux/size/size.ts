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
    },
});

export const productAction = { ...size.actions };
export default size.reducer;
