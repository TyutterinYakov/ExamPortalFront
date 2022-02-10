import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {


  constructor(private http:HttpClient, private login:LoginService) { }

  removeUser() {
    return this.http.delete(`${baseUrl}/user/`);
  }
  updateUser(user: any) {
    return this.http.put(`${baseUrl}/user/`, user);
  }
  updateImageProfile(formData: FormData) {
    return this.http.post(`${baseUrl}/user/image`, formData);
  }
  getProfileImage() {
    return this.http.get(`${baseUrl}/user/image`, {responseType:'blob'});
  }
}
