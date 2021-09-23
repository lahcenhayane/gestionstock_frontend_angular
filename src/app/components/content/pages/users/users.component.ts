import { TokenService } from './../../../../services/auth/token.service';

import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Users } from 'src/app/models/Users';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private _userService:UserService, private tokenService:TokenService) { }

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



  /* Start: Open Close Box User */
  Open_Box:boolean = false;
  F_Open_Box_User(){
    this.Open_Box = true
    this.RADIO_ROLE_CLIENT = false;
    this.RADIO_ROLE_EMPLOYEE = false;
  }
  F_Close_Box_User(){
    this.OPEN_EDIT=false
    this.Open_Box = false
    this.Open_Box_Delete_User = false
    this.Open_Box_Add_User = false
    this.F_EMPTY_ALL_FORM_USER()
  }
  /* End: Open Close Box User */



  /* Start:Choose Role you want? */
  RADIO_ROLE_EMPLOYEE:boolean=false;
  RADIO_ROLE_CLIENT:boolean=false;
  role(e:any){
    switch(e.target.value){
      case "Admin":{
        if (!this.OPEN_EDIT) {
          this.formUser.controls['client'].get('adresse')?.setValidators(null)
          this.formUser.controls['client'].get('adresse')?.setValue(null)
          
          this.formUser.controls['employee'].get('salaire')?.setValidators(null)
          this.formUser.controls['employee'].get('salaire')?.setValue(null)
        }
        
        this.RADIO_ROLE_EMPLOYEE = false;
        this.RADIO_ROLE_CLIENT = false;
        break;
      }
      case "Client":{
        this.formUser.controls['client'].get('adresse')?.setValidators([Validators.required, Validators.minLength(8),Validators.maxLength(180)])
        if (!this.OPEN_EDIT) {
          this.formUser.controls['employee'].get('salaire')?.setValidators(null)
          this.formUser.controls['employee'].get('salaire')?.setValue(null)
        }
        this.RADIO_ROLE_EMPLOYEE = false;
        this.RADIO_ROLE_CLIENT = true;
        break;
      }
      case "Employee":{
        this.formUser.controls['employee'].get('salaire')?.setValidators([Validators.required, Validators.pattern("^[0-9]*[.]?[0-9]+$")])
        if (!this.OPEN_EDIT) {
          this.formUser.controls['client'].get('adresse')?.setValidators(null)
          this.formUser.controls['client'].get('adresse')?.setValue(null)
        }
        this.RADIO_ROLE_EMPLOYEE = true;
        this.RADIO_ROLE_CLIENT = false;
        break;
      }
      default:
        return;
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
    this.password()
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
    email:new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(180)]),
    password:new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(80)]),
    ville:new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(29)]),
    tel:new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0][5-7][0-9]*$")]),
    dateNaissance:new FormControl(null, [Validators.required]),
    gendre:new FormControl("Homme", [Validators.required]),
    role:new FormControl("Admin", [Validators.required]),
    employee:new FormGroup({
      salaire:new FormControl(null,[])
    }),
    client:new FormGroup({
      adresse:new FormControl(null,[])
    })
  });
  
  
  F_EMPTY_ALL_FORM_USER(){
    
    this.formUser.get('cin')?.setValue(null);
    this.formUser.get('nom')?.setValue(null);
    this.formUser.get('prenom')?.setValue(null);
    this.formUser.get('email')?.setValue(null);
    this.formUser.get('password')?.setValue(null);
    this.formUser.get('ville')?.setValue(null);
    this.formUser.get('tel')?.setValue(null);
    this.formUser.get('dateNaissance')?.setValue(null);
    this.formUser.get('gendre')?.setValue("Homme");
    this.formUser.get('role')?.setValue("Admin");
    this.formUser.controls['employee'].get('salaire')?.setValue(null);
    this.formUser.controls['client'].get('adresse')?.setValue(null);
  }

  F_VALIDATE_DATE(){
    
    if (new Date() < this.formUser.get('dateNaissance')?.value) {
      return false;
    }
    return true;
  }

  password(){
      this.formUser.get('password')?.setValue(this.GENERATE_PASSWORD);
  }
  F_Add_New_User(){
    
    this._userService.createNewUser(this.formUser.value).subscribe(
      res => {
        this.users = [res, ...this.users];
        this.totalRow++;
        this.F_Close_Box_User();
        this.F_EMPTY_ALL_FORM_USER();
      }
    )

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
        this.F_CLOSE_BOX_INFO_USER()
      }
    );
  }
  /* End: Delete User */


  /* Start:Show User */
  user:Users = {
    id:0,
    cin:'',
    nom:'',
    prenom:'',
    email:'',
    password:'',
    ville:'',
    tel:'',
    dateNaissance:new Date,
    gendre:'',
    role:'',

    client:{
      id:-1,
      adresse:''
    },
    employee:{
      id:-1,
      salaire:0
    }
  };

  OPEN_CLOSE_BOX_INFO_USER:boolean = false
  F_CLOSE_BOX_INFO_USER(){
    this.OPEN_CLOSE_BOX_INFO_USER = false
  }
  F_OPEN_BOX_INFO_USER(){
    this.OPEN_CLOSE_BOX_INFO_USER = true
  }
  F_SHOW_USER(item:Users){
    this.F_OPEN_BOX_INFO_USER()
    return this.user = item;
  }
  
  /* Start:Show User */



  /* Start: Edit User */
  id?:number = 0;
  OPEN_EDIT:boolean =false;
  F_EDIT_USER(user:Users){
    this.F_Open_Box_Add_User()
    this.OPEN_EDIT = true

    this.id = user.id;
    this.formUser.get('cin')?.setValue(user.cin);
    this.formUser.get('nom')?.setValue(user.nom);
    this.formUser.get('prenom')?.setValue(user.prenom);
    this.formUser.get('email')?.setValue(user.email);
    this.formUser.get('password')?.setValue('');
    this.formUser.get('ville')?.setValue(user.ville);
    this.formUser.get('tel')?.setValue(user.tel);
    this.formUser.get('dateNaissance')?.setValue(user.dateNaissance);
    this.formUser.get('gendre')?.setValue(user.gendre);

    this.formUser.get('role')?.setValue(user.role);
    
    if (user.role == "Employee") {
      this.formUser.controls['employee'].get('salaire')?.setValue(user.employee?.salaire);
      this.RADIO_ROLE_EMPLOYEE = true;
      this.RADIO_ROLE_CLIENT = false;
    }
    if (user.role == "Client") {
      this.formUser.controls['client'].get('adresse')?.setValue(user.client?.adresse);
      this.RADIO_ROLE_CLIENT = true;
      this.RADIO_ROLE_EMPLOYEE = false;
    }
    if (user.role == "Admin") {
      this.RADIO_ROLE_CLIENT = false;
      this.RADIO_ROLE_EMPLOYEE = false;
    }
  }
  F_MODIFIER_USER(){
 
    this._userService.editUser(this.id, this.formUser.value).subscribe(
      ()=>{
        console.log(this.formUser.value);
        this.users.map(user => {
          if (user.id == this.id) {
            user.cin = this.formUser.get('cin')?.value
            user.nom = this.formUser.get('nom')?.value
            user.prenom = this.formUser.get('prenom')?.value
            user.email = this.formUser.get('email')?.value
            user.ville = this.formUser.get('ville')?.value
            user.tel = this.formUser.get('tel')?.value
            user.dateNaissance = this.formUser.get('dateNaissance')?.value
            user.gendre = this.formUser.get('gendre')?.value
            user.role = this.formUser.get('role')?.value  
          }
        })
        this.F_Close_Box_User()
        this.F_CLOSE_BOX_INFO_USER()
      },
      err=>console.log(err)
    )
    
  }
  
  /* End: Edit User */
  onSubmit(){
    if (this.OPEN_EDIT) {
      this.F_MODIFIER_USER()
    }
    if (!this.OPEN_EDIT) {
      this.F_Add_New_User()
    }
  }


}

