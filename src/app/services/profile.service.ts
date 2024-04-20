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
    return this.http.delete(`${baseUrl}/api/users`);
  }
  updateUser(user: any) {
    return this.http.put(`${baseUrl}/api/users`, user);
  }
  updateImageProfile(formData: FormData) {
    return this.http.put(`${baseUrl}/api/users/image-profile-update`, formData);
  }
  getProfileImage() {
    return this.http.get(`${baseUrl}/api/users/image-profile`, {responseType:'blob'});
  }
}
