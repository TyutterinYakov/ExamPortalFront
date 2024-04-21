import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {



  constructor(private _http:HttpClient) { }


  public getQuestionsOfQuize(id:any){
    return this._http.get(`${baseUrl}/api/admin/quizzes/${id}/questions`);
  }
  public getQuestionsOfQuizeTest(id:any){
    return this._http.get(`${baseUrl}/api/quizies/${id}/questions`);
  }

  addQuestion(question: any) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'});
  let options = { headers: headers };
    console.log(question)
    return this._http.post(`${baseUrl}/api/admin/quizzes/questions`, question, options);
  }

  deleteQuestion(questionId: any) {
    return this._http.delete(`${baseUrl}/api/admin/quizzes/questions/${questionId}`);
  }


  public getQuestion(questionId:any){
    return this._http.get(`${baseUrl}/api/admin/quizzes/questions/${questionId}`);
  }

  updateQuestion(question: any, questionId:any) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'});
  let options = { headers: headers };
  console.log(question)
    return this._http.put(`${baseUrl}/api/admin/quizzes/questions/${questionId}`, question, options);
  }
}
