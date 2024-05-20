import { Component, OnInit, inject, OnDestroy, Output, EventEmitter } from '@angular/core';
import { PopupService } from '../../../../core/Services/popup.service';
import { fadeIn, fadeInRight } from '../../../../core/animations';
import { HttpClient } from '@angular/common/http';
import { Category } from '../../../../core/model/Category';
import { FormBuilder, FormsModule, ReactiveFormsModule, FormGroup, FormArray, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  @Output() onFilter = new EventEmitter<any>()
  filterForm!: FormGroup
  categories: Category[] | any = []
  subCategories: string[] = []
  showSubCategories: boolean = false

  statusOptions = [{control:'status' ,arName: 'داعم', EnName: 'boycott' }, {control:'status' , arName: 'بديل', EnName: 'alternative' }, {control:'status' , arName: 'غير متأكد', EnName: 'unsure' }]

  closeFilterPopup() {
    this.popupService.closeFilterPopup()
  }

  resetFilter() {
    this.filterForm.reset()
  }

  ngOnInit() {
    this.getCategories()
    this.filterForm = this.fb.group({
      category: [''],
      subCategories: this.fb.array([]), // Array for subcategories (initially empty)
      // status: [''] // Status selection (initially empty)
    });
  }

  getCategories() {
    return this.http.get(`../../../../../assets/data/Categories.json`).subscribe(data => {
      console.log('Categories:', data);
      this.categories = data
    });
  }

  handleCategorySelection(event: Event) {
    const selectedCategory = this.filterForm.get('category')?.value;
    if (selectedCategory === 'no_select') {
      this.showSubCategories = false;
      return; // No need to proceed further if no category is selected
    }

    const category = this.categories.find((cat: any) => cat.catEnName === selectedCategory);
    if (category && category.subCategories) {
      this.subCategories = category.subCategories;
      this.showSubCategories = true;

      // Reset selected subcategory when a new category is selected
      this.filterForm.get('subCategory')?.patchValue('no_select');
    } else {
      this.showSubCategories = false;
    }
  }


  onCheckboxChange(event: any) {
    const isChecked = event.target.checked;
    const subCategoryValue = event.target.value;

    // Handle checkbox selection logic (e.g., logging)
    console.log(`Checkbox '${subCategoryValue}' is ${isChecked ? 'checked' : 'unchecked'}`);
  }


  filter(event: Event) {
    event.preventDefault();

    const formValues = this.filterForm.value;

    const selectedSubCategories = (formValues.subCategories as string[]);
    const filter = {
      category: formValues.category,
      subCategories: selectedSubCategories,
    };

    console.log("filter",filter);


  }

  ngOnDestroy(): void {
    this.showSubCategories = false
  }
}
