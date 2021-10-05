import { Categories } from './../models/Categories';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _http:HttpClient) { }

  private readonly _URL_CATEGORIES = environment.url_categories;


  getCategoriesByName(name:string){
    return this._http.get<Categories[]>(`${this._URL_CATEGORIES}?name=${name}`);
  }

  getCountCategories(){
    return this._http.get(`${this._URL_CATEGORIES}/count`);
  }

  deleteCAtegories(category:number){
    return this._http.delete(`${this._URL_CATEGORIES}/${category}`)
  }

  addCategory(data:any){
    return this._http.post(`${this._URL_CATEGORIES}`, data);
  }

  editCategory(id:number, data:any){
    return this._http.put(`${this._URL_CATEGORIES}/${id}`, data)
  }

}
