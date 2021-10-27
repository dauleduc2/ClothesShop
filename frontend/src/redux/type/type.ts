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
    },
});

export const productAction = { ...type.actions };
export default type.reducer;
