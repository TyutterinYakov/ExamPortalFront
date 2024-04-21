import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizeService } from 'src/app/services/quize.service';
import { AnswerDto, QuestionDto } from 'src/app/pages/admin/add-question/answerDto';
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
    quizId:'',
    quiz:{
      title:'',
      id:''
    },
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
    marks:0,
    time:0,
    answers:''
  }
  

  

  constructor(private _route:ActivatedRoute, private _quize:QuizeService, private _question:QuestionService, private _router:Router) { }

  ngOnInit(): void {
    this.quizeId = this._route.snapshot.params['id'];
    this._quize.getQuizeAny(this.quizeId).subscribe(
      (data:any)=>{
        this.question.quiz=data;
        console.log(data);
        this.question.quizId = data.id;

      },
      (error)=>{
        Swal.fire("Ошибка!", "Зайдите позже");
        console.log(error);
        
      }
    )
  }
  addQuestion(){
    console.log(this.question);
    if(this.question.content.trim()!=""&&this.question.content!=null&&this.question.option1.trim()!=""&&this.question.option1!=null&&this.question.option2.trim()!=""&&this.question.option2!=null&&this.question.answer.trim()!=""&&this.question.answer!=null){
      const que = new QuestionDto(this.question.content, this.question.quizId, this.question.marks, this.question.time)
      if (this.question.option1 == this.question.answer) {
        que.answers.push(new AnswerDto(this.question.option1, true));
      } else {
        que.answers.push(new AnswerDto(this.question.option1, false));
      }
      if (this.question.option2 == this.question.answer) {
        que.answers.push(new AnswerDto(this.question.option2, true));
      } else {
        que.answers.push(new AnswerDto(this.question.option2, false));
      }
      var ans3 = null
      if (this.question.option3 == this.question.answer) {
        que.answers.push(new AnswerDto(this.question.option3, true));
      } else {
        que.answers.push(new AnswerDto(this.question.option3, false));
      }
      var ans4 = null
      if (this.question.option4 == this.question.answer) {
        que.answers.push(new AnswerDto(this.question.option4, true));
      } else {
        que.answers.push(new AnswerDto(this.question.option4, false));
      }




    this._question.addQuestion(JSON.stringify(que)).subscribe(
      (data:any)=>{
        
        Swal.fire("Успешно!", "Вопрос добавлен!").then((e)=>{
          this._router.navigate(['/admin/view-questions/'+this.question.quiz.id+"/"+this.question.quiz.title]);
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
