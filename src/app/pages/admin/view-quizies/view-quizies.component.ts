import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { switchAll } from 'rxjs';
import { QuizeService } from 'src/app/services/quize.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizies',
  templateUrl: './view-quizies.component.html',
  styleUrls: ['./view-quizies.component.css']
})
export class ViewQuiziesComponent implements OnInit {

  quizies=null;
  // quizies = [{
  //   quizeId:'',
  //   title:'',
  //   description:'',
  //   active:'',
  //   categoryDto: {
  //     title:''
  //   }
  // }];

  constructor(private _quize:QuizeService) { }

  ngOnInit(): void {
    this._quize.quiziesAdmin().subscribe(
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

  public deleteQuize(quizeId: any){

    Swal.fire({
      icon: 'info',
      title:'Вы уверены?',
      confirmButtonText: 'Удалить',
      showCancelButton: true,
    }).then((result)=>{
      if(result.isConfirmed){
        this._quize.deleteQuize(quizeId).subscribe(
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
