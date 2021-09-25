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
}
