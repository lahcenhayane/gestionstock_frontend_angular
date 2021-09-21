import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../services/auth/account.service';
import { TokenService } from '../services/auth/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private tokenService:TokenService, private accountService:AccountService, private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
      if (!this.tokenService.logInOrOut()) {
        this.tokenService.removeToken()
        this.accountService.changeStatus(this.tokenService.isValid())
        this.router.navigateByUrl("/login")
        return false;
      }
      
      return true;
    }
  
}
