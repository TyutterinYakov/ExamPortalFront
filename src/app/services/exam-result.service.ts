import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ExamResultService {
  

  constructor(private _http: HttpClient) { }


  getStatisticQuize(quizeId: number) {
    return this._http.get(`${baseUrl}/api/exam/result/${quizeId}`);
  }

  checkUserResult(quizeId: number) {
    return this._http.get(`${baseUrl}/api/exam/user-result/${quizeId}`);
  }

  deleteExamResult(answerId:number) {
    return this._http.delete(`${baseUrl}/api/exam/result/${answerId}`);
  }

  public evalQuize(questions:any){
    return this._http.post(`${baseUrl}/api/exam/user-result/submit`, questions);
  }

  checkAllUserResult(){
    return this._http.get(`${baseUrl}/api/exam/user-result/all`);
  }
}
