import { TokenService } from 'src/app/services/auth/token.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Categories } from './../../../../models/Categories';
import { ProductsService } from './../../../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/models/Products';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private _productService:ProductsService, private _categorieService:CategoriesService, private _tokenService:TokenService) { }

  ngOnInit(): void {
    this.getAllProducts(0, "");
    this.F_Get_Categories_By_Name("")
    console.log(this.categories);
    
  }


  //Start: Global Variable
  role:any = this._tokenService.getRole();


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
  F_Close_All(){
    this.OPEN_BOX = false
    this.Open_Box_Add_Product = false;
    this.Open_Box_Delete_Product = false;
    this.Open_Box_Edit_Product = false
    this.F_EMPTY_ALL_FORM_PRODUCTS();
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





  //Start: Get Categories By Name
  categories:Categories[]=[]
  F_Get_Categories_By_Name(name:string){
    this._categorieService.getCategoriesByName(name).subscribe(
      res=>{
        this.categories = res;
      },
      err=>{
        console.log(err) 
      }
    )
  }
  //End: Get Categories By Name



  //Star: Search Categorie By Name
  F_Search_Categorie(e:any){
    this.F_Get_Categories_By_Name(e.target.value);
  }
  //End: Search Categorie By Name




  //Start: Add New Product

  Open_Box_Add_Product:boolean = false;
  F_Open_Box_Add_Product(){
    this.F_OPEN_BOX_PRODUCT()
    this.F_Get_Categories_By_Name("")
    this.Open_Box_Add_Product = true;
  }
  F_Close_Add_Product(){
    this.F_CLOSE_BOX_PRODUCT()
    this.Open_Box_Add_Product = false;
  }

  formProduct = new FormGroup({
    nom : new FormControl(null, [Validators.required, Validators.minLength(8),Validators.maxLength(200)]),
    quantity : new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$")]),
    prix : new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*[.]+[0-9]+$")]),
    categorie : new FormGroup({
      id : new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$")]),
      labelle : new FormControl(null),
    })
  })

  F_EMPTY_ALL_FORM_PRODUCTS(){
    
    this.formProduct.get('nom')?.setValue(null);
    this.formProduct.get('quantity')?.setValue(null);
    this.formProduct.get('prix')?.setValue(null);
    this.formProduct.controls['categorie'].get('id')?.setValue(null);
  }
  createNewProduct(){
    this._productService.createNewProduct(this.formProduct.value).subscribe(
      res=>{
        console.log(res);
        this.totalRow++
        this.products = [res, ...this.products];
        this.F_CLOSE_BOX_PRODUCT()
        this.F_EMPTY_ALL_FORM_PRODUCTS()
      },
      err=>{
        console.log(err)
      }
    )
  }
  //End: Add New Product



  //Start: Show Product
  product:Products = {
    id:0,
    nom:'',
    prix:0,
    quantity:0.0,
    quantute:0,
    categorie:{
      id:0,
      labelle:''
    }
  }
  OPEN_BOX_SHOW_PRODUCT:boolean = false;
  F_Show_Product(product:Products){
    this.OPEN_BOX_SHOW_PRODUCT = true
    this.product = product;
  }
  F_CLOSE_BOX_INFO_PRODUCT(){
    this.OPEN_BOX_SHOW_PRODUCT = false
  }
  //Start: Show Product




  //Start:Delete Product By ID.
  Open_Box_Delete_Product:boolean = false;
  ID_PRODUCT:any = 0

  F_Open_Box_Delete_Product(product:Products){
    this.F_Close_All()
    this.F_OPEN_BOX_PRODUCT()
    this.Open_Box_Delete_Product=true;
    this.ID_PRODUCT = product.id
  }

  F_Close_Box_Delete_Product(){
    console.log(true);
    this.F_CLOSE_BOX_PRODUCT()
    this.Open_Box_Delete_Product=false;
  }
  F_Delete_Product(){
    
    this._productService.deleteProduct(this.ID_PRODUCT).subscribe(
      ()=>{
        this.products = this.products.filter(row=> row.id != this.ID_PRODUCT);
        this.totalRow--
        this.F_CLOSE_BOX_PRODUCT()
      },
      err=>{
        console.log(err)
      }
    )
  }
  //End:Delete Product By ID.





  //Start:Edit Product
  Open_Box_Edit_Product:boolean = false;
  ID_PRODUCT_edit:any=0
  F_Open_Box_Edit_Product(product:Products){
    this.F_Close_All()
    this.F_OPEN_BOX_PRODUCT()
    this.Open_Box_Edit_Product = true
    this.Open_Box_Add_Product = true
    
    this.ID_PRODUCT_edit = product.id;

    this.formProduct.get('nom')?.setValue(product.nom);
    this.formProduct.get('quantity')?.setValue(product.quantity);
    this.formProduct.get('prix')?.setValue(product.prix);
    this.formProduct.controls['categorie'].get('id')?.setValue(product.categorie.id);
    this.formProduct.controls['categorie'].get('labelle')?.setValue(product.categorie.labelle);    
  }

  F_Edit_Product(){
    console.log(this.ID_PRODUCT_edit);
    console.log(this.formProduct.value);    
    this._productService.editProduct(this.ID_PRODUCT_edit, this.formProduct.value).subscribe(
      () => {

        this.products.map(
          row=>{
            if (row.id ==this.ID_PRODUCT_edit) {
              console.log(row);
              
              row.id = this.formProduct.get('nom')?.value
              row.quantity = this.formProduct.get('quantity')?.value;
              row.prix = this.formProduct.get('prix')?.value;
              row.categorie.id = this.formProduct.controls['categorie'].get('id')?.value
            }
          }
        )
        this.F_Close_All()
      },
      err => {
        console.log(err)
      }
    )
  }


  //End:Edit Product

  //Start: On Submit Form
  onSubmit(){
    if (this.Open_Box_Edit_Product) {
      this.F_Edit_Product()
    }
    if (!this.Open_Box_Edit_Product) {
      this.createNewProduct()
    }
  }
  //End: On Submit Form
}
