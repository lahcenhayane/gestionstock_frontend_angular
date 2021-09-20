import { UsersPages } from './../models/ListsPage/UsersPages';
import { Roles } from './../models/Roles';
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

}