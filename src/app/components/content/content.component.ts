import { Router } from '@angular/router';
import {Component, OnInit} from '@angular/core';
import { TokenService } from 'src/app/services/auth/token.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  constructor(private tokenService:TokenService, private router:Router) {
  }

  ngOnInit(): void {
    console.log(true)
    
    
      console.log(this.tokenService.getExpirationDate()/1000000);
      console.log(new Date().getMilliseconds());
      
      
      // this.tokenService.removeToken()
      // this.router.navigateByUrl("/login")
    
  }

}
