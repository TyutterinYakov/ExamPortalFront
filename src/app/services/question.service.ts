import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {



  constructor(private _http:HttpClient) { }


  public getQuestionsOfQuize(id:any){
    return this._http.get(`${baseUrl}/question/quize/all/${id}`);
  }
  public getQuestionsOfQuizeTest(id:any){
    return this._http.get(`${baseUrl}/question/quize/${id}`);
  }

  addQuestion(question: any) {
    return this._http.post(`${baseUrl}/question/`, question);
  }

  deleteQuestion(questionId: any) {
    return this._http.delete(`${baseUrl}/question/${questionId}`);
  }


  public getQuestion(questionId:any){
    return this._http.get(`${baseUrl}/question/${questionId}`);
  }

  updateQuestion(question: any) {
    return this._http.put(`${baseUrl}/question/`, question);
  }
}
