import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
}
