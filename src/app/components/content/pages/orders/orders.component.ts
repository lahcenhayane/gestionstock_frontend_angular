import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
  //End: Open Close Product


}
