import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { QuizeService } from 'src/app/services/quize.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {


catId=0;
quizies=null;

  constructor(private _route:ActivatedRoute, private _quize:QuizeService) { }

  ngOnInit(): void {
    this.catId = this._route.snapshot.params['catId'];
    console.log(this.catId);

    if(this.catId==0){
    this._quize.quizies().subscribe(
      (data:any)=>{
        this.quizies=data;
        console.log(data);
        
      },
      (error)=>{
        console.log(error);
        Swal.fire("Ошибка", "Список тестов временно недоступен");
      }
    )
    } else {
      // this._quize.getQuize().subscribe
    }

  }

}
