import { TokenService } from './auth/token.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private tokenService:TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(Date());
    
    return next.handle(
      request.clone({
        setHeaders:{
          Authorization:`Bearer ${this.tokenService.getToken()}`
        }
      })
    );
  }
}
