import { Component, OnInit } from '@angular/core';
import { ExamResultService } from 'src/app/services/exam-result.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-result',
  templateUrl: './view-result.component.html',
  styleUrls: ['./view-result.component.css']
})
export class ViewResultComponent implements OnInit {

  resultMap:Map<String, Map<String, String>> = new Map<String, Map<String, String>>();
  results=[
    {
      maxMarks:'',
      countPoints:'',
      validQuestion:'',
      invalidQuestion:'',
      skipQuestion:'',
      questionsAndGivenAnswer: this.resultMap,
      answerId:'',
      quizTitle:'',
      categoryTitle:'',
      examAnswers:[{givenAnswer:'', answer:'', questionContent:''}]
    },
  ];
  constructor(private _exam:ExamResultService) { }

  ngOnInit(): void {
    this._exam.checkAllUserResult().subscribe(
      (data:any)=>{
        console.log(data);
        this.results=data;
        
      },
      (error)=>{
        Swal.fire("Ошибка", "Попробуйте выполнить запрос позже!");
        console.log(error);
        
      }
    )
  }

}
