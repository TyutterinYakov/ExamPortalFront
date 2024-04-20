import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {
  category={
    id:'',
    title:'',
    description:'',

  };
  id=0;
  constructor(private _route:ActivatedRoute, private _category:CategoryService, private router:Router) { }

  ngOnInit(): void {
    this.id = this._route.snapshot.params['categoryId'];


    this._category.getCategory(this.id).subscribe(
      (data:any)=>{
        this.category=data;
        console.log(this.category);
      },
      (error)=>{
        console.log(error);
        Swal.fire("Ошибка!", "Попробуйте позже");
        
      }
    )
    
  }


  updateCategory(){

    this._category.updateCategory(this.category).subscribe(
      (data)=>{
        console.log(data);
        Swal.fire("Успешно", "Категория обновлена!").then((e)=>{
          this.router.navigate(['/admin/categories']);
        })
      },
      (error)=>{
        console.log(error);
      }
    )
  }

}
