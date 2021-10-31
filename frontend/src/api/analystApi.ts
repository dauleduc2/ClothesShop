import { ServerResponse } from '../common/interfaces/Common/api';
import axiosClient from '../axios/config';
import {
    AnalystDate,
    GetEachProductProps,
    totalItemByType,
    totalPriceByType,
    AnalystResponse,
} from '../common/interfaces/Common/analyst';

export const analystApi = {
    adminGetTotalSaleOnTime: async (dateRange: AnalystDate) => {
        const url = '/api/admin/analyst/getTotalItem';
        return await axiosClient.post<ServerResponse<AnalystResponse<string>[], null>>(url, dateRange);
    },
    adminGetTotalPriceOnTime: async (dateRange: AnalystDate) => {
        const url = '/api/admin/analyst/getTotalPrice';
        return await axiosClient.post<ServerResponse<AnalystResponse<string>[], null>>(url, dateRange);
    },
    adminGetTotalItemByType: async (dateRange: AnalystDate) => {
        const url = '/api/admin/analyst/getTotalItemByCategory';
        return await axiosClient.post<ServerResponse<totalItemByType[], null>>(url, dateRange);
    },
    adminGetTotalPriceByType: async (dateRange: AnalystDate) => {
        const url = '/api/admin/analyst/getTotalPriceByCategory';
        return await axiosClient.post<ServerResponse<totalPriceByType[], null>>(url, dateRange);
    },
    adminGetEachProductAnalyst: async (data: GetEachProductProps) => {
        const url = '/api/admin/analyst/getEachProductAnalyst';
        return await axiosClient.post<ServerResponse<AnalystResponse<string>[], null>>(url, data);
    },
};
