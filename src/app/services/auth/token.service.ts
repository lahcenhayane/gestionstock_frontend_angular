import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }


  saveToken(data:any){
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.username);
    localStorage.setItem("user_id", data.user_id);
    localStorage.setItem("id", data.id);
    localStorage.setItem("role", data.role);
  }
  removeToken(){
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("user_id");
    localStorage.removeItem("id");
    localStorage.removeItem("role");
  }



  getToken(){
    return localStorage.getItem("token");
  }
  getUsername(){
    return localStorage.getItem("username");
  }
  getUserID(){
    return localStorage.getItem("user_id");
  }
  getID(){
    return localStorage.getItem("id");
  }
  getRole(){
    return localStorage.getItem("role");
  }



  decoder(payload:string){
    return JSON.parse(atob(payload));
  }
  getPayload(token:string){
    const payload = token.split('.')[1];
    return this.decoder(payload);
  }

  getExpirationDate(){
    const exp = this.getInfo();
    return exp.exp
  }


  isValid(){
    const token = this.getToken();
    const username = this.getUsername();
    const id = this.getID();
    const user_id = this.getUserID();
    const role = this.getRole();

    if(token){
      const payload = this.getPayload(token);
      if(payload && (id == payload.id && user_id == payload.user_id && role == payload.role && username == payload.username)){
        return true;
      }else{
        this.removeToken();
        return false;
      }
    }
    this.removeToken();
    return false;
  }
  getInfo(){
    const token = this.getToken();
    if(token){
      const payload = this.getPayload(token);
      return payload ? payload : this.removeToken();
    }
    return this.removeToken();
  }
  logInOrOut(){
    return this.isValid();
  }

  expTimeLogout(exp:number){
    setTimeout(()=>{
      this.removeToken();
    }, exp);
  }

}
