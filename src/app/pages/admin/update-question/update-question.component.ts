import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {
  public Editor = ClassicEditorBuild;

  questionId=0;
  question={
    quize:{
      title:'',
      quizeId:'',
    },
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',

  };
  constructor(private _question:QuestionService, private _route:ActivatedRoute, private _router:Router) { }

  ngOnInit(): void {
    this.questionId=this._route.snapshot.params['questionId'];
    this._question.getQuestion(this.questionId).subscribe(
      (data:any)=>{
        this.question=data;
        console.log(data);
        
      },
      (error)=>{
        Swal.fire("Ошибка", "Добавление в данный момент недоступно.");
      }
    )
  }
  updateQuestion(){
    this._question.updateQuestion(this.question).subscribe(
      (data)=>{
        Swal.fire("Удачно!", "Вопрос обновлен!").then((e)=>{
          this._router.navigate(['/admin/view-questions/'+this.question.quize.quizeId+"/"+this.question.quize.title]);
        }
        );
      },
      (error)=>{
        Swal.fire("Ошибка", "Попробуйте еще раз!");
        console.log(error);
        
      }
    )
  }

}
