import { UsersPages } from './../models/ListsPage/UsersPages';
import { Users } from './../models/Users';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http:HttpClient) { }
  
  private readonly _URL = environment.url_admins;
  private readonly _URL_CLIENTS = environment.url_clients;
  private readonly _URL_USERS = environment.url_users
  private readonly _URL_ORDERS = environment.url_orders
  private readonly _URL_PRODUCTS = environment.url_products
  private readonly _URL_CATEGORIES = environment.url_categories

  /**
   * Get All Users
   * @param page 
   * @returns 
   */
  getAllUser(page:number, role:string):Observable<UsersPages>{
    return this._http.get<UsersPages>(`${this._URL}?page=${page}&role=${role}`);
  }


  searchByEmail(email:string, page:number):Observable<UsersPages>{
    return this._http.get<UsersPages>(`${this._URL}/search?email=${email}&page=${page}`);
  }

  deleteUser(id:any){
    return this._http.delete(`${this._URL}/${id}`);
  }

  createNewUser(data:Users){
    return this._http.post<Users>(`${this._URL_USERS}`, data)
  }

  editUser(id:any, user:any){
    return this._http.put(`${this._URL_USERS}/${id}`, user)
  }

  getCountUser(){
    return this._http.get(`${this._URL_USERS}/count`);
  }
  getCountOrders(){
    return this._http.get(`${this._URL_ORDERS}/count`);
  }

  getCountProducts(){
    return this._http.get(`${this._URL_PRODUCTS}/count`);
  }
  getCountCategory(){
    return this._http.get(`${this._URL_CATEGORIES}/count`);
  }


  getTopSeverClient(){
    return this._http.get<Users[]>(`${this._URL_CLIENTS}/top5`);
  }
}
