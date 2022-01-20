import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizeService } from 'src/app/services/quize.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  quizeId=0;
  quize={
    title:'',
    description:'',
    countOfQuestion:'',
    maxMarks:'',

  };
  constructor(private _route:ActivatedRoute, private _quize:QuizeService, private _router:Router) { }

  ngOnInit(): void {
    this.quizeId=this._route.snapshot.params['quizeId'];

    this._quize.getQuize(this.quizeId).subscribe(
      (data:any)=>{
        this.quize=data;
        console.log(data);
      },
      (error)=>{
        Swal.fire("Ошибка", "Попробуйте позже!");
        console.log(error);
        
      }
    )
  }
  startQuize(){
    Swal.fire({
      title: 'Вы действительно хотите начать тест?',
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Начать',
      denyButtonText: `Отмена`,
      icon: 'info'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._router.navigate(['/start/'+this.quizeId]);
      } else if (result.isDenied) {
        
      }
    })
  }

}
