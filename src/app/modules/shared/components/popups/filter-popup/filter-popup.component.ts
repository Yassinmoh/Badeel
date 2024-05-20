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
  subCategories: any[] = []
  showSubCategories: boolean = false
  formData: object = {}
  statusOptions = [{ control: 'status', arName: 'داعم', EnName: 'boycott' }, { control: 'status', arName: 'بديل', EnName: 'alternative' }, { control: 'status', arName: 'غير متأكد', EnName: 'unsure' }]



  ngOnInit() {
    this.getCategories()
    this.filterForm = this.fb.group({
      category: ['no_select'],
      subCategories: this.fb.array([]),
      status: this.fb.array(this.statusOptions.map(() => new FormControl(false)))
    });
  }

  getCategories() {
    return this.http.get(`../../../../../assets/data/Categories.json`).subscribe(data => {
      console.log('Categories:', data);
      this.categories = data
    });
  }




  handleCategorySelection(event: Event) {
    const selectedCategory = (event.target as HTMLSelectElement).value;
    const category = this.categories.find((cat: any) => cat.catEnName === selectedCategory);

    if (category) {
      this.subCategories = category.subCategories.map((subCat: any) => subCat.subCatArName);
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
      .map((checked: boolean, i: number) => checked ? this.statusOptions[i].arName : null)
      .filter((v: any) => v !== null);

    this.formData = {
      category: this.filterForm.value.category,
      selectedSubCategories: selectedSubCategories,
      selectedStatuses: selectedStatuses
    };
    console.log("formData", this.formData);

  }

  closeFilterPopup() {
    this.popupService.closeFilterPopup()
  }

  resetFilter() {
    this.filterForm.reset()
    this.showSubCategories = false
    this.filterForm.controls['category'].patchValue('no_select')
  }

  ngOnDestroy(): void {
    this.showSubCategories = false
  }
}
