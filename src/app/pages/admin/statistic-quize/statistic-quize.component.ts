import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { QuizeService } from 'src/app/services/quize.service';

@Component({
  selector: 'app-statistic-quize',
  templateUrl: './statistic-quize.component.html',
  styleUrls: ['./statistic-quize.component.css']
})
export class StatisticQuizeComponent implements OnInit {

  quizeId=0;
  statistics:any;
  constructor(private _route:ActivatedRoute, private quize:QuizeService) { }

  ngOnInit(): void {
    this.quizeId=this._route.snapshot.params['quizeId'];

    this.quize.getStatisticQuize(this.quizeId).subscribe(
      (data)=>{
        this.statistics=data;
        console.log(this.statistics);
        
      },
      (error)=>{
        console.log(error);
      }
    )
    
  }

}
