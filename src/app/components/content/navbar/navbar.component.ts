import { TokenService } from '../../../services/auth/token.service';
import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/auth/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private tokenService:TokenService,
              private accountService:AccountService,
              private router:Router) {
  }

  ngOnInit(): void {
  }

  logout(){
    this.tokenService.removeToken()
    this.router.navigateByUrl("/login")
    this.accountService.changeStatus(this.tokenService.logInOrOut())
  }

}
