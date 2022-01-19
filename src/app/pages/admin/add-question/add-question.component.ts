import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizeService } from 'src/app/services/quize.service';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  public Editor = ClassicEditorBuild;
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

  constructor(private _route:ActivatedRoute, private _quize:QuizeService, private _question:QuestionService, private _router:Router) { }

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
    if(this.question.content.trim()!=""&&this.question.content!=null&&this.question.option1.trim()!=""&&this.question.option1!=null&&this.question.option2.trim()!=""&&this.question.option2!=null&&this.question.answer.trim()!=""&&this.question.answer!=null){
    this._question.addQuestion(this.question).subscribe(
      (data:any)=>{
        
        Swal.fire("Успешно!", "Вопрос добавлен!").then((e)=>{
          this._router.navigate(['/admin/view-questions/'+this.quizeId+"/"+this.question.quize.title]);
        });


        
      },
      (error)=>{
        Swal.fire("Ошибка!", "Попробуйте еще раз");
        console.log(error);
      }
    );
    } else {
      Swal.fire("Ошибка!", "Заполните все поля!");
      return;
    }
  }
}
