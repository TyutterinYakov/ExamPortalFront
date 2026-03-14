import { HttpClient, HttpParams } from '@angular/common/http';
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
  quiziesAdmin(from:number, size:number){
    const params = new HttpParams()
      .set('from', from.toString())
      .set('size', size.toString());
    return this._http.get(`${baseUrl}/api/admin/categories/quizzes`, { params });
  }

  public addQuize(quize:any){
    return this._http.post(`${baseUrl}/api/admin/categories/quizzes`, quize);
  }

  public generateQuiz(quize:any){
    return this._http.post(`${baseUrl}/api/admin/categories/quizzes/generate`, quize);
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
