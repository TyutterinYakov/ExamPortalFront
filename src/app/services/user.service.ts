import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http:HttpClient
  ) { }
//Add users

public addUser(user:any)
{
  return this.http.post('http://localhost:8080/user/', user);


}

}
