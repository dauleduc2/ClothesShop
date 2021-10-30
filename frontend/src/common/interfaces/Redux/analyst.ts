import { TotalItemByType, totalPriceByType, TotalPriceOnTime, TotalSaleOnTime } from './../Common/analyst';
export interface AnalystState {
    totalSale: TotalSaleOnTime[];
    totalPrice: TotalPriceOnTime[];
    TotalItemByType: TotalItemByType[];
    totalPriceByType: totalPriceByType[];
}
