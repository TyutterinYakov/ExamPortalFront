import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import { QuestionDto, AnswerDto } from '../add-question/answerDto';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {
  public Editor = ClassicEditorBuild;

  questionId=0;
  question={
    quizId:'',
    quiz:{
      title:'',
      id:''
    },
    content:'',
    option:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
    marks:0,
    time:0,
    answers:[{reply:'', correctly:false}]
  }
  constructor(private _question:QuestionService, private _route:ActivatedRoute, private _router:Router) { }

  ngOnInit(): void {
    this.questionId=this._route.snapshot.params['questionId'];
    this._question.getQuestion(this.questionId).subscribe(
      (data:any)=>{
        this.question=data;
        for (let i = 0; i < this.question.answers.length; i++) {
            if (this.question.answers[i].correctly) {
              this.question.answer = this.question.answers[i].reply;
            }
            if (i == 0) {
              this.question.option1 = this.question.answers[i].reply;
            }
            if (i == 1) {
              this.question.option2 = this.question.answers[i].reply;
            }
            if (i == 2) {
              this.question.option3 = this.question.answers[i].reply;
            }
            if (i == 3) {
              this.question.option4 = this.question.answers[i].reply;
            }
        }
        console.log(data);
        
      },
      (error)=>{
        Swal.fire("Ошибка", "Добавление в данный момент недоступно.");
      }
    )
  }
  
  updateQuestion(){
    const que = new QuestionDto(this.question.content, this.question.quiz.id, this.question.marks, this.question.time)
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
    this._question.updateQuestion(JSON.stringify(que), this.questionId).subscribe(
      (data)=>{
        Swal.fire("Удачно!", "Вопрос обновлен!").then((e)=>{
          this._router.navigate(['/admin/view-questions/'+this.question.quiz.id+"/"+this.question.quiz.title]);
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
