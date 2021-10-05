import { TokenService } from './../../../services/auth/token.service';
import { AccountService } from './../../../services/auth/account.service';
import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private accountService:AccountService, 
              private tokenService:TokenService,
              private router:Router) {
  }
  
  username:string | null =  null;
  role:string | null = null;

  ngOnInit(): void {
    this.username = this.tokenService.getUsername();
    this.role = this.tokenService.getRole();  
    
  }

}
