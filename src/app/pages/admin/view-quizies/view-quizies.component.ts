import { Component, OnInit } from '@angular/core';
import { QuizeService } from 'src/app/services/quize.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizies',
  templateUrl: './view-quizies.component.html',
  styleUrls: ['./view-quizies.component.css']
})
export class ViewQuiziesComponent implements OnInit {

  quizies = null;

  constructor(private _quize:QuizeService) { }

  ngOnInit(): void {
    this._quize.quizies().subscribe(
      (data:any)=>{
        this.quizies=data;
        console.log(data);
      },
      (error)=>{
        console.log(error);
        Swal.fire("Ошибка", "попробуйте позже");
        
      }
    )
  }

}
