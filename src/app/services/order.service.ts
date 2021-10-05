import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrdersPage } from '../models/ListsPage/OrdersPage';
import { environment } from 'src/environments/environment';
import { Orders } from '../models/Orders';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _http:HttpClient) { }

  private readonly _URL_ORDERS = environment.url_orders

  GetAllOrders(page:number, id:number):Observable<OrdersPage>{
    return this._http.get<OrdersPage>(`${this._URL_ORDERS}?page=${page}&id=${id}`);
  }


  createNewOrder(data:any){
    return this._http.post(`${this._URL_ORDERS}`, data)
  }


  delete(id:number){
    return this._http.delete(`${this._URL_ORDERS}/${id}`)
  }
}
