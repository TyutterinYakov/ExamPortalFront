import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http:HttpClient) { }

  //load list category
  public categories(){
    return this._http.get(`${baseUrl}/api/categories`)
  }

  public addCategory(category:any){
    return this._http.post(`${baseUrl}/api/categories`, category);
  }

  public getCategory(category:any){
    return this._http.get(`${baseUrl}/api/categories/${category}`,);
  }

  deleteCategory(categoryId: any) {
    return this._http.delete(`${baseUrl}/api/categories/${categoryId}`);
  }

  updateCategory(category:any) {
    return this._http.put(`${baseUrl}/api/categories`, category);
  }


}
