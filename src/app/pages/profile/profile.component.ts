import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private login:LoginService, private profile:ProfileService) { 
  }
  user:any = null;
  ngOnInit(): void {
    this.login.getCurrentUser().subscribe(
      (user:any)=>{
        this.user=user;
      },
      (error)=>{
        alert('Внутренняя ошибка!')
      }
    )
  }
  removeUser(){
    this.profile.removeUser().subscribe(
      (data)=>{
        console.log("YES");
        this.login.logout();
        window.location.reload();
        
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }
}
