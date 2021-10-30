import { ServerResponse } from '../common/interfaces/Common/api';
import axiosClient from '../axios/config';
import { AnalystDate, TotalSaleOnTime } from '../common/interfaces/Common/analyst';

export const analystApi = {
    adminGetTotalSaleOnTime: async (dateRange: AnalystDate) => {
        const url = '/api/admin/analyst/product';
        return await axiosClient.post<ServerResponse<TotalSaleOnTime[], null>>(url, dateRange);
    },
};
