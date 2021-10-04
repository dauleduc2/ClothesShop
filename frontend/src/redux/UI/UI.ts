import { createSlice } from "@reduxjs/toolkit";
import { UIAction, UIState } from "../../common/interfaces/UI";

const initialState: UIState = {
    isLoading: false,
    isSideBarOpenning: true,
};

export const UI = createSlice({
    name: "UI",
    initialState,
    reducers: {
        setSideBarOpenning: (state: UIState, action: UIAction) => {
            const isSideBarOpenning = action.payload;
            return {
                ...state,
                isSideBarOpenning,
            };
        },
    },
});
export const UIListAction = { ...UI.actions };
export default UI.reducer;
