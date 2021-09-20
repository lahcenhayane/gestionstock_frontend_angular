import { DataState, DataStateEnum } from './../../../../state/state';

import { UsersPages } from './../../../../models/ListsPage/UsersPages'
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { Users } from 'src/app/models/Users';

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
  users:Users[] | null = null;
  totalPage:number | null = null;
  totalRow:number | null = null;
  
  


  ROLE:string = "";
  
  PAGE = 1;//Current Number Pagination

  BOX_SEARCH_EMAIL:any;
  BOX_SEARCH:boolean=false;
  /* End: Declaration Variables */

  /* Start Open and Close Box Of Search*/
  open = true;

  openSearch(){
    this.open = false;
    this.BOX_SEARCH = true //Enabled Search
    this.PAGE = 1;//Current Number Pagination
  }
  close(){
    this.open = true;
    this.BOX_SEARCH =false //Disabled Search
    this.PAGE = 1;//Current Number Pagination
    this.getAllUser(0, "")
  }
  /* End Open and Close Box Of Search*/

  /* Start: Open Box Add New User */
  Box_Add_New_User = false
  Open_Box_User(){
    this.Box_Add_New_User = true
  }
  Close_Box_User(){
    this.Box_Add_New_User = false
  }
  /* End: Open Box Add New User */

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
}
