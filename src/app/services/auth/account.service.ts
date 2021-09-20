import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private tokenService:TokenService) { }

  private loggedIn = new BehaviorSubject<Boolean>(this.tokenService.logInOrOut());

  authStatus = this.loggedIn.asObservable();


  changeStatus(value : Boolean){
    this.loggedIn.next(value);
  }

}
