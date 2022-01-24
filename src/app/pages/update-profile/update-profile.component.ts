import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ProfileService } from 'src/app/services/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  constructor(private login:LoginService, private profile:ProfileService, private router:Router) { }
  public user={
    firstName:'',
    lastName:'',
    email:'',
    phone:''
  }
  ngOnInit(): void {
    this.user = this.login.getUser();
  }

  updateUser(){
    this.profile.updateUser(this.user).subscribe(
      (data)=>{
          Swal.fire("Удачно!", "Данные обновлены").then((e)=>{
          if(this.login.getUserRole()=="ADMIN"){
            this.router.navigate(['/admin/profile']);
          } else {
            this.router.navigate(['/user/profile']);
          }
        }
        )
      
      },
      (error)=>{
        console.log(error);
        Swal.fire("Ошибка!", "Введите все данные");
        
      }
    )
  }

}
