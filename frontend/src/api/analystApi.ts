import { ServerResponse } from '../common/interfaces/Common/api';
import axiosClient from '../axios/config';
import {
    AnalystDate,
    TotalItemByType,
    totalPriceByType,
    TotalPriceOnTime,
    TotalSaleOnTime,
} from '../common/interfaces/Common/analyst';

export const analystApi = {
    adminGetTotalSaleOnTime: async (dateRange: AnalystDate) => {
        const url = '/api/admin/analyst/getTotalItem';
        return await axiosClient.post<ServerResponse<TotalSaleOnTime[], null>>(url, dateRange);
    },
    adminGetTotalPriceOnTime: async (dateRange: AnalystDate) => {
        const url = '/api/admin/analyst/getTotalPrice';
        return await axiosClient.post<ServerResponse<TotalPriceOnTime[], null>>(url, dateRange);
    },
    adminGetTotalItemByType: async (dateRange: AnalystDate) => {
        const url = '/api/admin/analyst/getTotalItemByCategory';
        return await axiosClient.post<ServerResponse<TotalItemByType[], null>>(url, dateRange);
    },
    adminGetTotalPriceByType: async (dateRange: AnalystDate) => {
        const url = '/api/admin/analyst/getTotalPriceByCategory';
        return await axiosClient.post<ServerResponse<totalPriceByType[], null>>(url, dateRange);
    },
};
