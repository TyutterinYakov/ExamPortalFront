import { LocationStrategy } from '@angular/common';
import { WrappedNodeExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { LoginService } from 'src/app/services/login.service';
import { QuestionService } from 'src/app/services/question.service';
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
  markGot=0;
  questionLength=0;

  timer:any;

  isSubmit=false;

  results:any;

  correctAnswer=0;
  attempted=0;
  constructor(private locationSt:LocationStrategy, private _login:LoginService, private _route:ActivatedRoute, private _question:QuestionService) { }

  ngOnInit(): void {
    this.quizeId = this._route.snapshot.params['quizeId'];
    this.preventBackButton();
    this.user = this._login.getUser();
    this.loadQuestions();
    

  }

  loadQuestions(){
    this._question.getQuestionsOfQuizeTest(this.quizeId).subscribe(
      (data:any)=>{
        this.questions=data;
        this.questionLength=this.questions.length;
        this.timer = this.questionLength*2*60;
        console.log("Length "+this.questionLength);
        
        this.questions.forEach((q:any) => {
          q['givenAnswer']='';
        });
        console.log(this.questions);
        this.startTimer();
        

        
        
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
        this.questions.forEach((q:any) => {


          if(q.givenAnswer==q.answer){
            this.correctAnswer++;
            let marksSingle = this.questions[0].quize.maxMarks/this.questions.length;
            this.markGot+=marksSingle;

          } 
          
          if(q.givenAnswer.trim()==''){
            this.attempted++;
          }
        });
  }

  startTimer(){
    let winInterval:any = window.setInterval(()=>{
      if(this.timer<=0){
        this.evalQuize();
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


