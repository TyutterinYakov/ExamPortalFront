import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamResultService } from 'src/app/services/exam-result.service';
import { LoginService } from 'src/app/services/login.service';
import { QuestionService } from 'src/app/services/question.service';
import { QuizeService } from 'src/app/services/quize.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  quizeId=0;
  user=null;
  questions:any;
  markGot:number=0;
  questionLength=0;
  questionSkip=0;
  badQuestion=0;

  timer:any;

  isSubmit=false;
  resultCheck:any;

  results:any;

  correctAnswer={
    countPoints:'',
    validQuestion:'',
    invalidQuestion:'',
    skipQuestion:''
  };
  corrected=0;
  constructor(private locationSt:LocationStrategy, private _login:LoginService,
     private _route:ActivatedRoute, private _question:QuestionService,
      private _exam:ExamResultService, private router:Router) { }

  ngOnInit(): void {
    this.quizeId = this._route.snapshot.params['quizeId'];
    this._exam.checkUserResult(this.quizeId).subscribe(
      (data)=>{
        this.resultCheck=data;
        console.log(data);
        
        if(this.resultCheck == true){

            this.router.navigate(['/user/category']).then(()=>{
              Swal.fire("Ошибка!", "Вы уже решали этот тест");
            });
        } else {
          
          this.preventBackButton();
          this.user = this._login.getUser();
          this.loadQuestions();
        }
      },
      (error)=>{
        console.log(error);
        this.router.navigate(['/user/category']).then(()=>{
          Swal.fire("Ошибка!", "В данный момент решение недоступно");
        });
        
      }
    )
  }

  loadQuestions(){
    this._question.getQuestionsOfQuizeTest(this.quizeId).subscribe(
      (data:any)=>{
        this.questions=data;
        console.log(data);
        if(this.questions.length<1){
            this.router.navigate(['/user/category']).then((e)=>{
              Swal.fire("Ошибка", "В этом тесте нет вопросов");
            });
        } else {
          for (let i = 0; i < this.questions.length; i++) {
            this.questions[i].questionId = this.questions[i].id;
            for (let j = 0; j < this.questions[i].answers.length; j++) {
              if (j == 0) {
                this.questions[i].option1 = this.questions[i].answers[j].reply;
              }
              if (j == 1) {
                this.questions[i].option2 = this.questions[i].answers[j].reply;
              }
              if (j == 2) {
                this.questions[i].option3 = this.questions[i].answers[j].reply;
              }
              if (j == 3) {
                this.questions[i].option4 = this.questions[i].answers[j].reply;
              }
            }
        }
        this.timer = this.questions[0].quiz.time;
        
        this.questions.forEach((q:any) => {
          q['givenAnswer']='';
        });
        console.log(this.questions);
        this.startTimer();
      }
      
      },
      (error)=>{
        console.log(error);
        Swal.fire("Ошибка", "Попробуйте позже!");
      }
    )
  }

  preventBackButton(){
    history.pushState(null, "", location.href);
    this.locationSt.onPopState(()=>{
    history.pushState(null, "", location.href);
  });
  }

  submitQuize(){
    Swal.fire({
      title: 'Вы действительно хотите закончить тест?',
      showDenyButton: true,

      confirmButtonText: 'Да',
      denyButtonText: `Нет`,
      icon: 'info'
    }).then((result) => {


      if (result.isConfirmed) {
        
        this.evalQuize();
      }
    })
  }
  evalQuize() {
    this.isSubmit=true;
      console.log(this.questions);
        this._exam.evalQuize(this.quizeId, this.questions).subscribe(
          (data:any)=>{
            this.correctAnswer=data;
            console.log(data);
          },
          (error)=>{
            console.log(error);
          }
        )
  }

  startTimer(){
    let winInterval:any = window.setInterval(()=>{
      if(this.timer<=0){
        if (!this.isSubmit) {
          this.evalQuize();
        }
        clearInterval(winInterval);
      } else {
        this.timer--;
      }
    },1000)
  }

  getFormattedTime(){
    let mm = Math.floor(this.timer/60);
    let ss = this.timer-mm*60;
    return `${mm}:${ss}`;
  }
}


