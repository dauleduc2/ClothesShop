import { TotalPriceOnTime, TotalSaleOnTime } from './../Common/analyst';
export interface AnalystState {
    totalSale: TotalSaleOnTime[];
    totalPrice: TotalPriceOnTime[];
}
