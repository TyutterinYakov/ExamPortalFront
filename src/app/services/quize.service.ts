import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizeService {



  constructor(private _http:HttpClient) { }

  quizies(){
    return this._http.get(`${baseUrl}/categories/quizies`);
  }
  quiziesAdmin(){
    return this._http.get(`${baseUrl}/categories/quizies/any`);
  }

  public addQuize(quize:any){
    return this._http.post(`${baseUrl}/categories/quizies`, quize);
  }

  deleteQuize(id: any) {
    return this._http.delete(`${baseUrl}/categories/quizies/${id}`);
  }

  getQuize(quizeId: any){
    return this._http.get(`${baseUrl}/categories/quizies/${quizeId}`);
  }

  updateQuize(quize: any) {
    return this._http.put(`${baseUrl}/categories/quizies/`, quize);
  }

  getQuizeByCategoryUser(categoryId:any){
    return this._http.get(`${baseUrl}/categories/${categoryId}/quizies`);
  }
  getQuizeByCategory(categoryId:any){
    return this._http.get(`${baseUrl}/categories/${categoryId}/quizies/any`);
  }

  getQuizeAny(quizeId: any){
    return this._http.get(`${baseUrl}/categories/quizies/${quizeId}/any`);
  }

}
