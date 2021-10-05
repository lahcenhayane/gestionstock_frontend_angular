import { Categories } from './../../../../models/Categories';
import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private _categorieService:CategoriesService) { }

  ngOnInit(): void {
    this.getAllCategories('')
    this.getCountCategories()
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
    this.Open_Box_Delete_Category = false
  }


  F_OPEN_BOX_SEARCH_add(){
    this.OPEN_BOX_SEARCH = true;
    this.formCategory.controls['labelle'].setValue("")
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




  //Start: Get All Caterories
  categories:Categories[] = []
  getAllCategories(search:string){
    this._categorieService.getCategoriesByName(search)
    .subscribe(
      res => this.categories = res,
      err=> console.log(err)
    )
  }

  //End: Get All Caterories

  //Start: Search Category
  Search_Categories(e:any){
    console.log(e.target.value);
    
    this.getAllCategories(e.target.value);
  }
  //End: Search Category



  //Start: Get Count Of Categories
  countCategories:any = 0
  getCountCategories(){
    this._categorieService.getCountCategories().subscribe(res=>this.countCategories = res)
  }
  //End: Get Count Of Categories



  //Start: Add New Categories
  formCategory = new  FormGroup({
    labelle:new FormControl("", Validators.required)
  })
  Add_Category(){
    this._categorieService.addCategory(this.formCategory.value).subscribe(
      res=>{
        this.categories = [res, ...this.categories]
        this.F_CLOSE_BOX_PRODUCT()
      },err=>{
        console.log(err)
      }
    )
  }
  //End: Add New Categories


//Start: Delete Category
ID_Category:number = 0;
Open_Box_Delete_Category:boolean = false
Show_Delete_Category(category:any){
  this.F_OPEN_BOX_PRODUCT()
  this.Open_Box_Delete_Category = true
  this.ID_Category = category.id
}
F_Delete_Category(){
  this._categorieService.deleteCAtegories(this.ID_Category).subscribe(
    ()=>{
      this.categories = this.categories.filter(row=>row.id != this.ID_Category)
      this.F_CLOSE_BOX_PRODUCT()
    },
    err=>console.log(err)
  )
}
//End: Delete Category



//Start: Edit Category
  Edit:boolean = false;
  ID_CATEGORY_EDIT:any = 0
  Edit_Category(item:Categories){
    this.Edit = true
    this.ID_CATEGORY_EDIT = item.id
    this.formCategory.controls['labelle'].setValue(item.labelle)
    this.F_OPEN_BOX_SEARCH()
  }

  edit(){
    this._categorieService.editCategory(this.ID_CATEGORY_EDIT, this.formCategory.value)
        .subscribe(
          ()=>{
            this.categories.map(row=>{
              if (row.id == this.ID_CATEGORY_EDIT) {
                row.labelle = this.formCategory.controls["labelle"].value
              }
            })
            this.F_CLOSE_BOX_SEARCH()
          }
        )
  }

//End: Edit Category

}
