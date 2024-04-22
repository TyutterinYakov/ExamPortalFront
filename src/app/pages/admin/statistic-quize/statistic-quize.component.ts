import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { map } from 'rxjs';
import { ExamResultService } from 'src/app/services/exam-result.service';
import { QuizeService } from 'src/app/services/quize.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-statistic-quize',
  templateUrl: './statistic-quize.component.html',
  styleUrls: ['./statistic-quize.component.css']
})
export class StatisticQuizeComponent implements OnInit {

  quizeId=0;
  resultMap:Map<String, Map<String, String>> = new Map<String, Map<String, String>>();
  statistics=[
    {
      id:'',
      user: {
        firstName:'',
        lastName:''
      },
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

  constructor(private _route:ActivatedRoute, private _exam:ExamResultService) { }

  ngOnInit(): void {
    this.quizeId=this._route.snapshot.params['quizeId'];

    this._exam.getStatisticQuize(this.quizeId).subscribe(
      (data:any)=>{
        this.statistics=data;
        console.log(this.statistics);
      },
      (error)=>{
        console.log(error);
      }
    )
    
  }

  removeResult(answerId:any){
    this._exam.deleteExamResult(answerId).subscribe(
      (data)=>{
        window.location.href="/admin/statistic/"+this.quizeId;
      },
      (error)=>{
        Swal.fire("Ошибка", "Попробуйте позже!");
      }
    )
    }

}
