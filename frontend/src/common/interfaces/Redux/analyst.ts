import { totalItemByType, totalPriceByType, AnalystResponse } from './../Common/analyst';
export interface AnalystState {
    totalSale: AnalystResponse<string>[];
    totalPrice: AnalystResponse<string>[];
    totalItemByType: totalItemByType[];
    totalPriceByType: totalPriceByType[];
    eachProductAnalyst: AnalystResponse<string>[];
}
