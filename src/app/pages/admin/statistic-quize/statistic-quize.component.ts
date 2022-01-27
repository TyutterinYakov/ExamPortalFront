import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
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
  statistics=null;

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

  removeResult(answerId:number){
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
