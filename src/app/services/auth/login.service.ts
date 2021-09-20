import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient,) { }

  private readonly URL = environment.url;

  
  login(data:{email:string, password:string}){
    return this.http.post(`${this.URL}/login`, data);
  }
}
