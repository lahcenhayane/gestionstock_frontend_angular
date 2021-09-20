import { AccountService } from './../../services/auth/account.service';
import { TokenService } from '../../services/auth/token.service';
import { LoginService } from './../../services/auth/login.service';
import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService:LoginService,
              private tokenService:TokenService,
              private accountService:AccountService,
              private router:Router) {
  }

  ngOnInit(): void {
    
  }


  login = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(99)])
  });


  connexion(){
    this.loginService.login(this.login.value).subscribe(
      res => this.saveToken(res),
      err => console.log("Email ou mot de passe n'est pas cerrect.")
    )
  }

  saveToken(data:any){
    this.tokenService.saveToken(data);
    this.accountService.changeStatus(this.tokenService.logInOrOut());
    this.tokenService.getExpirationDate();
    this.router.navigateByUrl("/home");
  }

  

}
