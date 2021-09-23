import { Observable } from 'rxjs';
import { ProductsCategory } from './../models/ListsPage/ProductsCategory';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _http:HttpClient) { }

  private readonly _URL_PRODUCTS = environment.url_products;

  getAllProductByCategory(page:number, category:string):Observable<ProductsCategory>{
    return this._http.get<ProductsCategory>(`${this._URL_PRODUCTS}?page=${page}&categorie=${category}`);
  }

  getAllProductByName(page:number, name:string):Observable<ProductsCategory>{
    return this._http.get<ProductsCategory>(`${this._URL_PRODUCTS}/search?page=${page}&name=${name}`);
  }

}
