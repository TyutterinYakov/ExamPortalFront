
import { Component, OnInit } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { CategoryService } from 'src/app/services/category.service';
import { QuizeService } from 'src/app/services/quize.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-generate-quiz',
  templateUrl: './generate-quize.component.html',
  styleUrls: ['./generate-quize.component.css'],
})
export class GenerateQuizeComponent implements OnInit {


  categoryData={
    id:'',
    title:'',
    description:''
  }
  
  quize={
    topic:'',
    difficulty:'',
    categoryId:this.categoryData.id,
    questionCount: 10
  }

  categories=null;

  constructor(private _category:CategoryService, private _snack:MatSnackBar, private _quize:QuizeService, private _router:Router) { }


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
    
  }

  formSubmit(){
    if(this.quize.topic.trim()=='' || this.quize.topic==null){
      this._snack.open("Введите обязательные поля!", "", {
        duration:1000
      })
      return;
    }
    if(this.quize.difficulty.trim()=='' || this.quize.difficulty==null){
      this._snack.open("Введите обязательные поля!", "", {
        duration:1000
      })
      return;
    }
        if(this.quize.questionCount==null){
      this._snack.open("Введите обязательные поля!", "", {
        duration:1000
      })
      return;
    }
    this._quize.generateQuiz(this.quize).subscribe(
      (data:any)=>{
        Swal.fire("Успешно!", "Тест сгенерирован!").then((e)=>{
          this._router.navigate(['/admin/quizies']);
        });


        
        
      },
      (error)=>{

        Swal.fire("Ошибка", "Попробуйте позже");
      }
    );
  }
}
