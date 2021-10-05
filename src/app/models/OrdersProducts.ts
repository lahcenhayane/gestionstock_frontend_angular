import { Orders } from './Orders';
import { Products } from './Products';
export interface OrdersProducts{
    id?:number,
    quantute:number
    commandes?:Orders
    produits:Products
}