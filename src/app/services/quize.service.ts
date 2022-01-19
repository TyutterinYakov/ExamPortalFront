import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizeService {


  constructor(private _http:HttpClient) { }

  quizies(){
    return this._http.get(`${baseUrl}/quize/`);
  }

  public addQuize(quize:any){
    return this._http.post(`${baseUrl}/quize/`, quize);
  }

  deleteQuize(id: any) {
    return this._http.delete(`${baseUrl}/quize/${id}`);
  }

  getQuize(quizeId: any){
    return this._http.get(`${baseUrl}/quize/${quizeId}`);
  }

  updateQuize(quize: any) {
    return this._http.put(`${baseUrl}/quize/`, quize);
  }

  getQuizeByCategory(categoryId:any){
    return this._http.get(`${baseUrl}/quize/category/${categoryId}`);
  }
}
