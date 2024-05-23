import { Component, OnInit, inject, OnDestroy, Output, EventEmitter } from '@angular/core';
import { PopupService } from '../../../../core/Services/popup.service';
import { fadeIn, fadeInRight } from '../../../../core/animations';
import { HttpClient } from '@angular/common/http';
import { Category } from '../../../../core/model/Category';
import { FormBuilder, FormsModule, ReactiveFormsModule, FormGroup, FormArray, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../store/App/app.reducer';
import * as ProductActions from '../../../../../store/products/product.actions'
import { CategoryState } from '../../../../../store/categories/category.reducer';
import * as categoryActions from  '../../../../../store/categories/category.actions';
import { getCategories } from '../../../../../store/categories/category.selectors';
import { tap } from 'rxjs';

@Component({
  selector: 'app-filter-popup',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './filter-popup.component.html',
  styleUrl: './filter-popup.component.scss',
  animations: [fadeInRight, fadeIn]
})
export class FilterPopupComponent implements OnInit, OnDestroy {
  popupService = inject(PopupService)
  http = inject(HttpClient)
  fb = inject(FormBuilder)
  store = inject(Store<AppState | CategoryState>)


  @Output() onFilter = new EventEmitter<any>()
  filterForm!: FormGroup
  categories: Category[] | any = []
  subCategories: any[] = []
  showSubCategories: boolean = false
  formData: object = {}
  statusOptions = [{ control: 'status', arName: 'داعم', EnName: 'boycott' }, { control: 'status', arName: 'بديل', EnName: 'alternative' }, { control: 'status', arName: 'غير متأكد', EnName: 'unsure' }]



  ngOnInit() {
    this.filterForm = this.fb.group({
      category: ['جميع المنتجات'],
      subCategories: this.fb.array([]),
      status: this.fb.array(this.statusOptions.map(() => new FormControl(false)))
    });

    this.store.dispatch(categoryActions.loadCategories())
    this.store.select(getCategories).pipe(
      tap((data) => {this.categories=data[0]})
    ).subscribe()
  }

  handleCategorySelection(event: Event) {
    const selectedCategory = (event.target as HTMLSelectElement).value;
    const category = this.categories.find((cat: any) => cat.catEnName === selectedCategory);

    if (category) {
      this.subCategories = category.subCategories.map((subCat: any) => subCat.subCatEnName);
      this.showSubCategories = true;
      this.updateSubCategoryControls(this.subCategories);
    } else {
      this.subCategories = [];
      this.showSubCategories = false;
      this.updateSubCategoryControls([]);
    }
  }

  updateSubCategoryControls(subCategories: string[]) {
    const subCategoriesArray = this.filterForm.get('subCategories') as FormArray;
    subCategoriesArray.clear();
    subCategories.forEach(() => {
      subCategoriesArray.push(new FormControl(false));
    });
  }

  get subCategoriesFormArray() {
    return this.filterForm.get('subCategories') as FormArray;
  }

  get statusFormArray() {
    return this.filterForm.get('status') as FormArray;
  }

  filter() {
    const selectedSubCategories = this.subCategoriesFormArray.value
      .map((checked: boolean, i: number) => checked ? this.subCategories[i] : null)
      .filter((v: any) => v !== null);

    const selectedStatuses = this.statusFormArray.value
      .map((checked: boolean, i: number) => checked ? this.statusOptions[i].EnName : null)
      .filter((v: any) => v !== null);

    this.formData = {
      category:[ this.filterForm.value.category],
      selectedSubCategories: selectedSubCategories,
      selectedStatuses: selectedStatuses
    };
    this.store.dispatch(ProductActions.setCurrentActiveFilterItems({CurrentActiveFilterItems:this.formData}))
    this.store.dispatch(ProductActions.filterProducts({filterBy:this.formData}))
    this.closeFilterPopup()
  }

  closeFilterPopup() {
    this.popupService.closeFilterPopup()
  }

  resetFilter() {
    this.filterForm.reset()
    this.showSubCategories = false
    this.filterForm.controls['category'].patchValue('جميع المنتجات')
  }

  ngOnDestroy(): void {
    this.showSubCategories = false
  }
}
