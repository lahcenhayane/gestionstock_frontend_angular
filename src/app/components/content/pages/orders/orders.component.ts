import { Orders } from './../../../../models/Orders';

import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private _orders:OrderService) { }

  ngOnInit(): void {
    this.F_GET_ALL_ORDERS(0, "")
    console.log(this.orders);
    
  }

//Start: Global Variable
  


  //End: Global Variable

  //Start:Open Close Box Search Product
  OPEN_BOX_SEARCH:boolean = false
  F_OPEN_BOX_SEARCH(){
    this.OPEN_BOX_SEARCH = true;
  }
  F_CLOSE_BOX_SEARCH(){
    this.OPEN_BOX_SEARCH = false
  }
  //End:Open Close Box Search Product



  //Start: Open Close Product
  OPEN_BOX:boolean = false
  F_OPEN_BOX_PRODUCT(){
    this.OPEN_BOX = true
  }
  F_CLOSE_BOX_PRODUCT(){
    this.OPEN_BOX = false
  }

  F_CLOSE_ALL(){
    this.OPEN_BOX = false
    this.Open_Box_Add_Orders = false;
  }
  //End: Open Close Product


  Open_Box_Edit_Order:boolean = false





  //Open Box Add 
  Open_Box_Add_Orders:boolean = false
  F_OPEN_BOX_Add_Orders(){
    this.F_OPEN_BOX_PRODUCT()
    this.Open_Box_Add_Orders = true;
  }
  //End Box Add


  //Start: Get All Orders
  orders:Orders[] = []
  totalPage:number = 0
  totalRow:number = 0
  F_GET_ALL_ORDERS(page:number, search:any){
    this._orders.GetAllOrders(page, search).subscribe(
      res=>{

        console.log(res);
        
        this.orders = res.list
        this.totalPage = res.totalPage
        this.totalRow = res.totalRow
      },
      err=>{
        console.log(err)
      }
    )
  }
  //End: Get All Orders

}
