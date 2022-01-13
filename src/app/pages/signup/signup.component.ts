import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService:UserService, private snack:MatSnackBar) { }

public user={
  userName:'',
  password:'',
  firstName:'',
  lastName:'',
  email:'',
  phone:''
}

  ngOnInit(): void {
  }


  formSubmit()
  {
    console.log(this.user)
    if(this.user.userName=='' || this.user.userName==null){
      this.snack.open('Введите логин','',{
        duration:1000, 


      });
      return;
    }
//validate
//addUser
this.userService.addUser(this.user).subscribe(
  (data: any)=>{
    //success
    console.log(data);
    Swal.fire('Добро пожаловать, '+data.firstName, 'Регистрация прошла успешно');
  },
  (error)=>{
    //error
    console.log(error);
    this.snack.open('Пользователь с таким ником уже зарегистрирован','',{
      duration: 2000,
    })
  }
);

  }

}
