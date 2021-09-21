import { DataState, DataStateEnum } from './../../../../state/state';

import { UsersPages } from './../../../../models/ListsPage/UsersPages'
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { Users } from 'src/app/models/Users';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private _userService:UserService) { }

  ngOnInit(): void {
    this.getAllUser(0, "")
  }


  /* Start: Declaration Variables */
  users:Users[] = [];
  totalPage:number=0;
  totalRow:number=0;
  

  ROLE:string = "";
  
  PAGE = 1;//Current Number Pagination
  /* End: Declaration Variables */



  /* Start Open and Close Box Of Search*/
  BOX_SEARCH_EMAIL:any;
  BOX_SEARCH:boolean=false;
  OPEN = true;
  openSearch(){
    this.OPEN = false;
    this.BOX_SEARCH = true //Enabled Search
    this.PAGE = 1;//Current Number Pagination
  }
  close(){
    this.OPEN = true;
    this.BOX_SEARCH =false //Disabled Search
    this.PAGE = 1;//Current Number Pagination
    this.getAllUser(0, "")
  }
  /* End Open and Close Box Of Search*/



  /* Start: Open Clox Box User */
  Open_Box:boolean = false;
  F_Open_Box_User(){
    this.Open_Box = true
  }
  F_Close_Box_User(){
    this.Open_Box = false
    this.Open_Box_Delete_User = false
    this.Open_Box_Add_User = false
  }
  /* End: Open Box User */



  /* Start:Choose Role you want? */
  RADIO_ROLE_EMPLOYEE:boolean=false;
  RADIO_ROLE_CLIENT:boolean=false;
  role(e:any){
    switch(e.target.value){
      case "Admin":{
        this.RADIO_ROLE_EMPLOYEE = false;
        this.RADIO_ROLE_CLIENT = false;
        return null; 
      }
      case "Client":{
        this.RADIO_ROLE_EMPLOYEE = false;
        return this.RADIO_ROLE_CLIENT = true;
      }
      case "Employee":{
        this.RADIO_ROLE_CLIENT = false;
        return this.RADIO_ROLE_EMPLOYEE = true;
      }
      default:
        return null;
    }
  }
  /* End:Choose Role you want? */



  /* Start: Get All Users */
  getAllUser(page:number, _role:string){
    if (this.ROLE != _role) {
      this.PAGE = 1;//Current Number Pagination
    }

    this.ROLE = _role
    this._userService.getAllUser(page, this.ROLE).subscribe(
      res => {
        this.users = res.list
        this.totalRow = res.totalRow
        this.totalPage = res.totalPage
      },
      err => console.log(err.messages)
    )
  }
  /* End: Get All Users */
  
  
  
  /* Start: Pagination */
  counterPagination(){
    return new Array(this.totalPage)
  }
  pagination(page:number){//Pagination of result beetwen 'GetAllUser' and 'FindUsersByEmail'
    this.PAGE = page
    if (!this.BOX_SEARCH) {// Check if box search is open.
      this.getAllUser(page, this.ROLE);//Get all users by role.
    }else{
      this.findUsersByEmail(this.BOX_SEARCH_EMAIL, this.PAGE)//Find Users By Email.
    }
  }
  /* End: Pagination */

  
  
  /* Start:Find Users By Email */
  search(email:any, page:number){
    this.findUsersByEmail(email.target.value, page);
  }

  findUsersByEmail(email:string, page:number){
    this.BOX_SEARCH_EMAIL = email
    
    this._userService.searchByEmail(this.BOX_SEARCH_EMAIL, page).subscribe(
      res => {
        this.users = res.list
        this.totalRow = res.totalRow
        this.totalPage = res.totalPage
      },
      err => console.log("Error: "+err.messages)
    )
  }
  /* End:Find Users By Email */



  /* Start:Show And Hide Password. */
  SHOW_PASSWORD:boolean=true;
  HIDE_PASSWORD:boolean=false;
  SHOW_HIDE_PASSWORD:boolean=true
  Show_Password(){
    this.SHOW_PASSWORD=false;
    this.HIDE_PASSWORD=true;
    this.SHOW_HIDE_PASSWORD=false
  }
  Hide_Password(){
    this.SHOW_PASSWORD=true;
    this.HIDE_PASSWORD=false;
    this.SHOW_HIDE_PASSWORD=true
  }
  /* End:Show And Hide Password. */


  
  /* Start:Generate Password */
  GENERATE_PASSWORD:string|null = null;
  generatePassword(){
    this.GENERATE_PASSWORD = Math.random().toString(30).substr(3, 15);
  }
  /* End:Generate Password */



  /* Start: Add New User */
  Open_Box_Add_User:boolean = false;
  F_Open_Box_Add_User(){
    this.F_Open_Box_User()
    this.Open_Box_Add_User = true;
  }
  formUser = new FormGroup({
    cin:new FormControl(null, [Validators.required, Validators.minLength(6),Validators.maxLength(9)]),
    nom:new FormControl(null, [Validators.required, Validators.minLength(3),Validators.maxLength(14)]),
    prenom:new FormControl(null, [Validators.required, Validators.minLength(3),Validators.maxLength(19)]),
    email:new FormControl(null, [Validators.required, Validators.email, Validators.minLength(8),Validators.maxLength(180)]),
    password:new FormControl(this.GENERATE_PASSWORD, [Validators.required, Validators.minLength(8), Validators.maxLength(80)]),
    ville:new FormControl(null, [Validators.required, Validators.maxLength(29)]),
    tel:new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    date_naissance:new FormControl(null, [Validators.required]),
    role:new FormControl("Admin", [Validators.required])
  },)
  F_Add_New_User(){
    console.log(this.formUser.value);
    console.log(true);
    
  }
  /* End: Add New User */



  /* Start: Delete User */
  Open_Box_Delete_User:boolean = false;
  ID_DELETE_USERL:any=0;
  F_Open_Box_Delete(user:Users){
    this.F_Open_Box_User()
    this.Open_Box_Delete_User = true;
    this.ID_DELETE_USERL = user.id;
  }

  delete(){
    this._userService.deleteUser(this.ID_DELETE_USERL).subscribe(
      () => {
        this.users = this.users.filter(row => row.id != this.ID_DELETE_USERL)
        this.ID_DELETE_USERL = 0;
        this.totalRow--;
        this.F_Close_Box_User()
      }
    );
  }
  /* End: Delete User */

}

