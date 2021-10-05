import { Router } from '@angular/router';
import { Products } from 'src/app/models/Products';
import { OrdersProducts } from './../../../../../models/OrdersProducts';
import { TokenService } from './../../../../../services/auth/token.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientsService } from './../../../../../services/clients.service';
import { UserService } from './../../../../../services/user.service';
import { Users } from './../../../../../models/Users';
import { OrderService } from 'src/app/services/order.service';
import { Orders } from './../../../../../models/Orders';
import { Component, OnInit, NgModule } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Panier } from 'src/app/models/Panier';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(private _orderService:OrderService, 
              private _orders:OrderService,
              private _toeknService:TokenService,
              private _clientService:ClientsService,
              private _productService:ProductsService,
              private _userService:UserService,
              private _router:Router) { }

  ngOnInit(): void {
    this.getAllProducts(0, "")
    this.getAllClients("");
  }

  //Start:La facture
  
  

  ordersPanier:Orders = {
    prixTotal:45.67,
    employes:{
      id:0,
      salaire:0
    },
    admins:{
      id: 0
    },
    clients:{
      id:0,
      adresse:""
    },
    produits:[
    ]
  }
  
  
  add(){
    this.ordersPanier.prixTotal = this.countTotal
    this.ordersPanier.clients.id = this.clientPanier?.client?.id
    if (this._toeknService.getRole()?.toString() == "Admin") {
      this.ordersPanier.admins.id = 1
    }

    this.ordersPanier.employes.id = 1

    this.p.map(
      row=>{
        let orderProductPanier = {
          quantute:row.quantute,
          produits:{
            id:row.id,
            nom:row.nom,
            prix:row.prix,
            quantute:row.quantute,
            quantity:row.quantity,
            categorie:{
            }
          }
        }
        this.ordersPanier.produits.push(orderProductPanier)
      }
    )
    console.log(this.ordersPanier);
    this._orderService.createNewOrder(this.ordersPanier).subscribe(
      res=>{console.log(res); this._router.navigateByUrl("/orders")}
    )
  }
  p:Products[] = []
  countTotal:number = 0
  AddProductToPanier(product:Products){
    if (product.quantute > 0 && product.quantity>product.quantute) {
      this.p.map(row => {
        if (row.id != product.id) {
        }
      })
      this.p = [product, ...this.p]
      this.p.map(row => this.countTotal = this.countTotal+ (row.prix*row.quantute))
    }
  }
  Annuler(item:any){
    this.p = this.p.filter(row=> row.id != item.id)
    this.p.map(row=>{
      this.countTotal = 0
      this.countTotal = this.countTotal + (row.prix*row.quantute)
    })
  }
  clientPanier:Users | null= null;
  AddClientToPanier(user:Users){
    this.clientPanier = user
    console.log(this.clientPanier)
  }
  Quantity:any = 0;
  QuantityProduct(e:any){
    this.Quantity = e.target.value
  }

  orders:Orders | null = null
  id:number | null = 0
  addToPanier(product:Products){
    
  }
  //End:La facture


  Search_Client(e:any){
    this.getAllClients(e.target.value);
  }
  //Start:Get All Client
  users:Users[] = [];
  getAllClients(search:string){
    this._clientService.getAllClients(search).subscribe(
      res => this.users = res,
      err => console.log(err.messages)
    )
  }
  //Start:Get All Client

  

  search_Product(e:any){
    this.getAllProducts(0, e.target.value)
  }
  //Start: Get All Products By Category
  products:Products[] = []
  getAllProducts(page:number, caterory:string){
    this._productService.getAllProductByCategory(page, caterory).subscribe(
      res => this.products = res.list,
      err => console.log(err)
    )
  }
  //End: Get All Products By Category


 
  


}
