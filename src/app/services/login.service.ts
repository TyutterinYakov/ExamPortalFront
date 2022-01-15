import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) {}
    
  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`);
  }

  //Создание токена
    public generateToken(loginData:any){
      

      return this.http.post(`${baseUrl}/generate-token`, loginData);

    }

    //Авторизация пользователя: установка токена
    public loginUser(token: string){
      localStorage.setItem('token', token);
      return true;
    }

    //Проверка входа пользователя
    public isLoggedIn(){
      let tokenStr = localStorage.getItem('token');
      if(tokenStr==undefined||tokenStr==''||tokenStr==null){
        return false;
      } else {
        return true;
      }
    }

    //Выход - удаление токена
    public logout(){
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return true;
    }

    //Получение токена
    public getToken(){
      return localStorage.getItem('token');
    }

    //UserDetails
    public setUser(user: any){
      localStorage.setItem('user', JSON.stringify(user));
    }

    //Получение пользователя
    public getUser(){
      let userStr=localStorage.getItem("user");
      if(userStr!=null){
        return JSON.parse(userStr);
      } else {
        this.logout();
        return null;
      }
    }
    //Получение роли
    public getUserRole(){
      let user=this.getUser()
      return user.authorities[0].authority; 

    } 
}
