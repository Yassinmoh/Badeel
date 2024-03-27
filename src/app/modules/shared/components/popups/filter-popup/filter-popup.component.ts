import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { PopupService } from '../../../../core/Services/popup.service';
import { fadeIn, fadeInRight } from '../../../../core/animations';
import { HttpClient } from '@angular/common/http';
import { Category } from '../../../../core/model/Category';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter-popup',
  standalone: true,
  imports: [FormsModule,CommonModule ],
  templateUrl: './filter-popup.component.html',
  styleUrl: './filter-popup.component.scss',
  animations:[fadeInRight,fadeIn]
})
export class FilterPopupComponent implements OnInit,OnDestroy{
  popupService =inject(PopupService)
  http =inject(HttpClient)
  categories: Category[] | any=[]
  subCategories: string[] =[]
  showSubCategories:boolean=false
  closeFilterPopup(){
    this.popupService.closeFilterPopup()

  }

  ngOnInit(): void {
      this.getCategories()
  }

  getCategories() {
    return this.http.get(`../../../../../assets/data/Categories.json`).subscribe(data => {
      console.log('Categories:', data);
      this.categories = data
    });
  }

  handleMainCategorySelection(event: Event) {
    const selectedCategory = (event.target as HTMLSelectElement).value;
    if(selectedCategory == 'no_select'){
      this.showSubCategories =false
    }
    console.log("selectedCategory",selectedCategory);

    const category = this.categories.find((cat: any) => cat.catEnName === selectedCategory);
    if (category && category.subCategories) {
      this.subCategories= category.subCategories
      this.showSubCategories =true
    }
  }

  ngOnDestroy(): void {
    this.showSubCategories =false
  }
}
