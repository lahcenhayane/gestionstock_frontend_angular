import { Products } from './../Products';

export interface ProductsCategory{
    list:Products[],
    totalPage:number,
    totalRow:number
}