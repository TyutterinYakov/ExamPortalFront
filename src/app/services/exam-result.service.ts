import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ExamResultService {
  

  constructor(private _http: HttpClient) { }


  getStatisticQuize(quizeId: number) {
    return this._http.get(`${baseUrl}/exam/statistic/${quizeId}`);
  }

  checkUserResult(quizeId: number) {
    return this._http.get(`${baseUrl}/exam/checkUserResult/${quizeId}`);
  }

  deleteExamResult(answerId:number) {
    return this._http.delete(`${baseUrl}/exam/examResult/${answerId}`);
  }

  public evalQuize(questions:any){
    return this._http.post(`${baseUrl}/exam/eval-quize`, questions);
  }

  checkAllUserResult(){
    return this._http.get(`${baseUrl}/exam/checkAllUserResult`);
  }
}
