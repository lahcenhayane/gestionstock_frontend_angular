import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/models/Users';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _userService:UserService) { }

  ngOnInit(): void {
    this.getAll()
    // console.log(this.TopClients)
  }

  countUsers:any = 0
  countOrders:any = 0
  countCategory:any = 0 
  countProducts:any = 0
  TopClients:Users[] = []

  getAll(){
    this.getCountUser()
    this.getCountOrders()
    this.getCountProducts()
    this.getCountCategory()
    this.getTopSeverClients()
  }
  getCountUser(){
    this._userService.getCountUser().subscribe(res=> this.countUsers = res);
  }
  getCountOrders(){
    this._userService.getCountOrders().subscribe(res=> this.countOrders = res);
  }
  getCountProducts(){
    this._userService.getCountProducts().subscribe(res=> this.countProducts = res);
  }
  getCountCategory(){
    this._userService.getCountCategory().subscribe(res=> this.countCategory = res);
  }

  getTopSeverClients(){
    this._userService.getTopSeverClient().subscribe(res=>this.TopClients = res)
  }
}
