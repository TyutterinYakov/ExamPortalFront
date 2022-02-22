import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {



  constructor(private _http:HttpClient) { }


  public getQuestionsOfQuize(id:any){
    return this._http.get(`${baseUrl}/api/quizies/${id}/questions/any`);
  }
  public getQuestionsOfQuizeTest(id:any){
    return this._http.get(`${baseUrl}/api/quizies/${id}/questions`);
  }

  addQuestion(question: any) {
    return this._http.post(`${baseUrl}/api/quizies/questions`, question);
  }

  deleteQuestion(questionId: any) {
    return this._http.delete(`${baseUrl}/api/quizies/questions/${questionId}`);
  }


  public getQuestion(questionId:any){
    return this._http.get(`${baseUrl}/api/quizies/questions/${questionId}/any`);
  }

  updateQuestion(question: any) {
    return this._http.put(`${baseUrl}/api/quizies/questions`, question);
  }
}
