import axiosClient from "../axios/config";
import { ServerResponse } from "../common/interfaces/api";
import { User } from "../common/interfaces/user";

export const userApi = {
    getCurrentUser: async () => {
        const url = "/api/user/me";
        const res = await axiosClient.get<ServerResponse<User>>(url);
        return res;
    },
};
