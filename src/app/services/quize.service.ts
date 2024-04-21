import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizeService {



  constructor(private _http:HttpClient) { }

  quizies(){
    return this._http.get(`${baseUrl}/api/categories/quizzes`);
  }
  quiziesAdmin(){
    return this._http.get(`${baseUrl}/api/admin/categories/quizzes`);
  }

  public addQuize(quize:any){
    return this._http.post(`${baseUrl}/api/admin/categories/quizzes`, quize);
  }

  deleteQuize(id: any) {
    return this._http.delete(`${baseUrl}/api/admin/categories/quizzes/${id}`);
  }

  getQuize(quizeId: any){
    return this._http.get(`${baseUrl}/api/categories/quizzes/${quizeId}`);
  }

  updateQuize(quize: any) {
    return this._http.put(`${baseUrl}/api/admin/categories/quizzes/${quize.id}`, quize);
  }

  getQuizeByCategoryUser(categoryId:any){
    return this._http.get(`${baseUrl}/api/categories/${categoryId}/quizzes`);
  }
  getQuizeByCategory(categoryId:any){
    return this._http.get(`${baseUrl}/api/admin/categories/${categoryId}/quizzes`);
  }

  getQuizeAny(quizeId: any){
    return this._http.get(`${baseUrl}/api/admin/categories/quizzes/${quizeId}`);
  }

}
