import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApi } from "../../api/userApi";

export const userThunk = {
    getCurrentUser: createAsyncThunk("user/getCurrentUser", async () => {
        const res = await userApi.getCurrentUser();
        return res.data.data;
    }),
};
