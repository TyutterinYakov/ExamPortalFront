import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ProfileService } from 'src/app/services/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private login:LoginService, private profile:ProfileService, private router:Router, private sanitizer:DomSanitizer) { 
  }
  user:any = null;
  profileImage:any;
  fileName = '';
  ngOnInit(): void {
    this.profile.getProfileImage().subscribe(
      (data:any)=>{
        let objectURL = URL.createObjectURL(data);
        this.profileImage=data;
        this.profileImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      },
      (error)=>{
        Swal.fire("Ошибка", "Попробуйте позже");
        console.log(error);
        
      }
    )
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
  updateLinkUser(){
    if(this.login.getUserRole()=="ADMIN"){
      this.router.navigate(['/admin/update']);
    } else {
      this.router.navigate(['/update']);
    }
  }
  onFileSelected(event:any) {

    const file:File = event.target.files[0];

    if (file) {

        this.fileName = file.name;

        const formData = new FormData();

        formData.append("image", file);

        this.profile.updateImageProfile(formData).subscribe(
          (data)=>{
            Swal.fire("Успешно", "Фото профиля обновлено").then(()=>{
              window.location.reload();
            })
          },
          (error)=>{
            Swal.fire("Ошибка", "Попробуйте позже");
          }
        )
    }
}
}
