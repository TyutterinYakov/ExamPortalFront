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
}
