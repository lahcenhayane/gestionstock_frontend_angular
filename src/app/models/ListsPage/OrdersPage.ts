import { Orders } from './../Orders';

export interface OrdersPage{
    list:Orders[],
    totalPage:number,
    totalRow:number
}