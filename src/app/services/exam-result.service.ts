import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ExamResultService {
  

  constructor(private _http: HttpClient) { }


  getStatisticQuize(quizeId: number) {
    return this._http.get(`${baseUrl}/api/admin/exam/${quizeId}`);
  }

  checkUserResult(quizeId: number) {
    return this._http.get(`${baseUrl}/api/exam/${quizeId}`);
  }

  deleteExamResult(answerId:number) {
    return this._http.delete(`${baseUrl}/api/admin/exam/${answerId}`);
  }

  public evalQuize(quizId:any, questions:any){
    return this._http.post(`${baseUrl}/api/exam/submit/${quizId}`, questions);
  }

  checkAllUserResult(){
    return this._http.get(`${baseUrl}/api/exam/`);
  }
}
