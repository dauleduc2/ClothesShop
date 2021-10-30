import { ServerResponse } from '../common/interfaces/Common/api';
import axiosClient from '../axios/config';
import { AnalystDate, TotalPriceOnTime, TotalSaleOnTime } from '../common/interfaces/Common/analyst';

export const analystApi = {
    adminGetTotalSaleOnTime: async (dateRange: AnalystDate) => {
        const url = '/api/admin/analyst/getTotalItem';
        return await axiosClient.post<ServerResponse<TotalSaleOnTime[], null>>(url, dateRange);
    },
    adminGetTotalPriceOnTime: async (dateRange: AnalystDate) => {
        const url = '/api/admin/analyst/getTotalPrice';
        return await axiosClient.post<ServerResponse<TotalPriceOnTime[], null>>(url, dateRange);
    },
};
