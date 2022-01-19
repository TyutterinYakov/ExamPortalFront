
import { Component, OnInit } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { CategoryService } from 'src/app/services/category.service';
import { QuizeService } from 'src/app/services/quize.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quize',
  templateUrl: './add-quize.component.html',
  styleUrls: ['./add-quize.component.css'],
})
export class AddQuizeComponent implements OnInit {


  categoryData={
    categoryId:'',
    title:'',
    description:''
  }
  
  quize={
    title:'',
    description:'',
    maxMarks:'',
    countOfQuestion:'',
    category:this.categoryData,
    active:'',

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
    if(this.quize.title.trim()=='' || this.quize.title==null || this.quize.maxMarks==null || this.quize.countOfQuestion==null ){
      this._snack.open("Введите обязательные поля!", "", {
        duration:1000
      })
      return;
    }
    this._quize.addQuize(this.quize).subscribe(
      (data:any)=>{
        Swal.fire("Успешно!", "Тест добавлен!").then((e)=>{
          this._router.navigate(['/admin/quizies']);
        });


        
        
      },
      (error)=>{

        Swal.fire("Ошибка", "Попробуйте позже");
      }
    );
  }
}
