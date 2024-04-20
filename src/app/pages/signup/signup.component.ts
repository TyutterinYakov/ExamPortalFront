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
  password:'',
  firstName:'',
  lastName:'',
  email:''
}

public ErrorResponse = {
  message:''
}

  ngOnInit(): void {
  }


  formSubmit() {
    console.log(this.user)
    if (this.user.email==''){
      this.snack.open('Введите почту','',{
        duration:1000, 


      });
      return;
    }
  //validate
  //addUser
  this.userService.addUser(this.user).subscribe({
    next: (v) => {
      if (v == null) {
        Swal.fire('Добро пожаловать, '+this.user.firstName, 'Регистрация прошла успешно');
      } else {
        console.log(v)
        this.snack.open('Пользователь с такой почтой уже зарегистрирован','',{
          duration: 2000,
        })
        }
      }
    }
  );
}

}