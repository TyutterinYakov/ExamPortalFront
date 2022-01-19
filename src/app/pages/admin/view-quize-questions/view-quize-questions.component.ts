import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quize-questions',
  templateUrl: './view-quize-questions.component.html',
  styleUrls: ['./view-quize-questions.component.css']
})
export class ViewQuizeQuestionsComponent implements OnInit {

  quizeId=0;
  quizeTitle=null;
  questions=null;

  constructor(
    private _route:ActivatedRoute,
    private _question:QuestionService

  ) { }

  ngOnInit(): void {
    this.quizeId = this._route.snapshot.params['id'];
    this.quizeTitle = this._route.snapshot.params['title'];
    console.log(this.quizeId);
    console.log(this.quizeTitle);

    this._question.getQuestionsOfQuize(this.quizeId).subscribe(
      (data:any)=>{
        this.questions=data;
        console.log(this.questions);
      },
      (error)=>{
        Swal.fire("Ошибка!", "Попробуйте позже");
        console.log(error);
        
      }
    )
    
    

  }

  deleteQuestion(questionId:any){
    Swal.fire({
      icon: 'info',
      title:'Вы уверены?',
      confirmButtonText: 'Удалить',
      showCancelButton: true,
    }).then((result)=>{
      if(result.isConfirmed){
        this._question.deleteQuestion(questionId).subscribe(
          (data:any)=>{
            window.location.reload();
       
          },
            
          (error: any)=>{
            Swal.fire("Ошибка!", "Проблема на стороне сервера!");
            console.log(error);
            
          }
    
        );
    
      }
    });
    
  }

}
