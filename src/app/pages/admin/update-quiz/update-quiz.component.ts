import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizeService } from 'src/app/services/quize.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {
  categoryData={
    categoryId:'',
    title:'',
    description:''
  }

  quizeId=0;
  quize={
    title:'',
    description:'',
    maxMarks:'',
    categoryDto:this.categoryData,
    active:'',

  }
  categories=null;

  constructor(private _route:ActivatedRoute, private _quize:QuizeService, private _category:CategoryService, private _snack:MatSnackBar, private _router:Router) { }

  ngOnInit(): void {
    this._category.categories().subscribe(
      (data:any)=>{
        this.categories=data;
        console.log(data);
        
      }, (error)=>{
        console.log(error);
        Swal.fire("Ошибка", "Попробуйте чуть позже");
        
      }
    )
    this.quizeId = this._route.snapshot.params['quizeId'];
    // alert(this.quizeId);
    this._quize.getQuizeAny(this.quizeId).subscribe(
      (data:any)=>{
        this.quize=data;
        console.log(this.quize);


      },
      (error)=>{
        console.log(error);
        Swal.fire("Ошибка", "Попробуйте вернуться назад!");
      }
    )

  }

  formSubmit(){
    if(this.quize.title.trim()=='' || this.quize.title==null || this.quize.maxMarks==null){
      this._snack.open("Введите обязательные поля!", "", {
        duration:1000
      })
      return;
    }
    this._quize.updateQuize(this.quize).subscribe(
      (data:any)=>{
        Swal.fire("Успешно!", "Тест обновлен").then((e)=>{
          this._router.navigate(['/admin/quizies/']);
        });
      },

      (error)=>{
        console.log("Ошибка на стороне сервера");
        Swal.fire("Ошибка", "Попробуйте позже");
      }
    );
  }

}
