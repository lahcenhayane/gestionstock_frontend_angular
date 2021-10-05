import { Users } from './../models/Users';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private _http:HttpClient) { }

  
  private readonly _URL_CLIENTS = environment.url_clients


  getAllClients(search:string){
    return this._http.get<Users[]>(`${this._URL_CLIENTS}?search=${search}`);
  }

  getCountCmdClient(id:any){
    return this._http.get(`${this._URL_CLIENTS}/countcmd/${id}`);
  }
}
