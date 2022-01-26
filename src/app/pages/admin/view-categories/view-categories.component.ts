import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categories=null;

  constructor(private _category:CategoryService) { }

  ngOnInit(): void {
    this._category.categories().subscribe(
      (data:any)=>{
        this.categories=data;
        console.log(data);
      },
      (error)=>{
        console.log(error);
        Swal.fire("Ошибка", "Попробуйте немного позже");
      }
    )
  }
  deleteCategory(categoryId:any){
    Swal.fire({
      icon: 'info',
      title:'Вы уверены?',
      confirmButtonText: 'Удалить',
      showCancelButton: true,
    }).then((result)=>{
      if(result.isConfirmed){
        this._category.deleteCategory(categoryId).subscribe(
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
