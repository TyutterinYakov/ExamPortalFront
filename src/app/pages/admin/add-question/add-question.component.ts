import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizeService } from 'src/app/services/quize.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  quizeId=0;

  question={
    quize:{
      title:'',
    },
    content:'',
    image:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:''
  }

  constructor(private _route:ActivatedRoute, private _quize:QuizeService, private _question:QuestionService) { }

  ngOnInit(): void {
    this.quizeId = this._route.snapshot.params['id'];
    this._quize.getQuize(this.quizeId).subscribe(
      (data:any)=>{
        this.question.quize=data;

        
      },
      (error)=>{
        Swal.fire("Ошибка!", "Зайдите позже");
        console.log(error);
        
      }
    )
  }
  addQuestion(){
    this._question.addQuestion(this.question).subscribe(
      (data:any)=>{
        Swal.fire("Успешно!", "Вопрос добавлен");

        
      },
      (error)=>{
        Swal.fire("Ошибка!", "Попробуйте еще раз");
        console.log(error);
      }
    );
  }
}
