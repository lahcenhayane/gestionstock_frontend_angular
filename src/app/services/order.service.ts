import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrdersPage } from '../models/ListsPage/OrdersPage';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _http:HttpClient) { }

  private readonly _URL_ORDERS = environment.url_orders

  GetAllOrders(page:number, search:string):Observable<OrdersPage>{
    return this._http.get<OrdersPage>(`${this._URL_ORDERS}?page=${page}&search=${search}`);
  }
}
