import { Component, OnInit, inject, OnDestroy, Output, EventEmitter } from '@angular/core';
import { PopupService } from '../../../../core/Services/popup.service';
import { fadeIn, fadeInRight } from '../../../../core/animations';
import { HttpClient } from '@angular/common/http';
import { Category } from '../../../../core/model/Category';
import { FormBuilder, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter-popup',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './filter-popup.component.html',
  styleUrl: './filter-popup.component.scss',
  animations:[fadeInRight,fadeIn]
})
export class FilterPopupComponent implements OnInit,OnDestroy{
  popupService =inject(PopupService)
  http =inject(HttpClient)
  fb =inject(FormBuilder)
  @Output() onFilter = new EventEmitter<any>()
  filterForm!:FormGroup
  categories: Category[] | any=[]
  subCategories: string[] =[]
  showSubCategories:boolean=false

  closeFilterPopup(){
    this.popupService.closeFilterPopup()
  }

  ngOnInit(): void {
      this.getCategories()
      this.filterForm = this.fb.group({
        category:['no_select'],
        subCategory:this.fb.array([]),
        status:this.fb.array([])
      })
  }

  getCategories() {
    return this.http.get(`../../../../../assets/data/Categories.json`).subscribe(data => {
      console.log('Categories:', data);
      this.categories = data
    });
  }

  handleCategorySelection(event: Event) {
    const selectedCategory = this.filterForm.get('category')?.value;
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

  filter(e:Event){
    this.onFilter.emit(this.categories)
  }

  ngOnDestroy(): void {
    this.showSubCategories =false
  }
}
