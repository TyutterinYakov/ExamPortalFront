import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData={
    userName:'',
    password:'',
  }
  constructor(private snack:MatSnackBar, private login:LoginService, private router:Router) { }

  ngOnInit(): void {
  }
  formSubmit(){
    console.log("login btn click");
    if(this.loginData.userName.trim()==''||this.loginData.password.trim()==''){
      this.snack.open("Не введено имя пользователя или пароль","",{
        duration:3000,
      });
      return;
    }


    //Генерация токена
    this.login.generateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log("Success");
        console.log(data);

        this.login.loginUser(data.token);

        this.login.getCurrentUser().subscribe(
          (user:any)=>{
            this.login.setUser(user);
            console.log(user);
            //refirect admin
            
         //   redirect user
            // for(let role in this.login.getUserRole){
            //   if(role.valueOf()=="ADMIN"){
            //     window.location.href="/admin";
            //   }
            // }
            // let 
            // for(let i=0; i<this.login.getUserRole.length; i++){
            //   if(this.login.getUserRole=="USER"){
            //     window.location.href="user";
            //   }
            // }


            if(this.login.getUserRole()=="ADMIN"){
              
              this.router.navigate(['/admin']);
              this.login.loginStatusSubject.next(true);

            } else if(this.login.getUserRole()=="USER"){

              this.router.navigate(['/user']);
              this.login.loginStatusSubject.next(true);
              
            } else {
            this.login.logout();

            }
            

          }
        )


      },
      (error)=>{
        console.log("Error generate token");
        this.snack.open("Неправильный логин или пароль", '', {
          duration:3000
        });
      }
    )


  }

}
