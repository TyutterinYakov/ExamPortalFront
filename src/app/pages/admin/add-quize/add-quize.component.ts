import { Component, OnInit } from '@angular/core';

import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-quize',
  templateUrl: './add-quize.component.html',
  styleUrls: ['./add-quize.component.css'],
})
export class AddQuizeComponent implements OnInit {

  categories=null;
  constructor(private _category:CategoryService) { }

  ngOnInit(): void {
    this._category.categories().subscribe(
      (data:any)=>{
        this.categories=data;
        console.log(data);
        
      }, (error)=>{
        console.log(error);
        
      }
    )
    
  }
}
