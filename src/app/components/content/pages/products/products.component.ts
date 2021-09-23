import { ProductsService } from './../../../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/models/Products';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private _productService:ProductsService) { }

  ngOnInit(): void {
    this.getAllProducts(0, "");
    console.log(this.products);
    
  }


  //Start: Global Variable
  


  //End: Global Variable

  //Start:Open Close Box Search Product
  OPEN_BOX_SEARCH:boolean = false
  F_OPEN_BOX_SEARCH(){
    this.getAllProducts(0, '')
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





  //Start: Get All Products By Category
  products:Products[] = []
  totalPage:number = 0
  totalRow:number = 0
  getAllProducts(page:number, caterory:string){
    this._productService.getAllProductByCategory(page, caterory).subscribe(
      res => {
        console.log(res);
        this.products = res.list
        this.totalPage = res.totalPage
        this.totalRow = res.totalRow
      },
      err => {
        console.log(err)
      }
    )
  }

  //End: Get All Products By Category



  //Start: Search Products By Category
  F_Serach_Product_By_Category(page:number ,e:any){
    this.getAllProducts(page, e.target.value);
  }
  //End: Search Products By Category

  
  
  //Start: Search Product By Name
  getAllProductsByName(page:number, name:string){
    this._productService.getAllProductByName(page, name).subscribe(
      res => {
        console.log(res);
        this.products = res.list
        this.totalPage = res.totalPage
        this.totalRow = res.totalRow
      },
      err => {
        console.log(err)
      }
    )
  }
  //Start: Search Product By Name


//Start: Search Products By Category
F_Serach_Product_By_Name(page:number, e:any){
  this.getAllProductsByName(page, e.target.value);
}
//End: Search Products By Category

}
