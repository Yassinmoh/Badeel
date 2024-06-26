import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CommonModule } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ProductService } from '../../../core/Services/product.service';
import { Category } from '../../../core/model/Category';
import { CategoryService } from '../../../core/Services/category.service';
import { Store } from '@ngrx/store';
import * as categoryActions from '../../../../store/categories/category.actions'
import { getCategories } from '../../../../store/categories/category.selectors';
import { tap } from 'rxjs';
@Component({
  selector: 'app-submit-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ToastrModule, FormsModule],
  templateUrl: './submit-page.component.html',
  styleUrls: ['./submit-page.component.scss'],
  providers: [CategoryService]
})
export class SubmitPageComponent implements OnInit {
  private fb = inject(FormBuilder);
  productForm!: FormGroup;
  statusInput: string = ''
  categories: Category[] | any = []
  subCategories: any

  constructor(
    public firestore: AngularFirestore,
    private productsService: ProductService,
    private toastr: ToastrService,
    private categoryService:CategoryService,
    private store:Store
  ) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      status: ['', [Validators.required]],
      id: [],
      productArName: ['', [Validators.required, Validators.minLength(3)]],
      productEnName: ['', [Validators.required, Validators.minLength(3)]],
      company: ['', [Validators.required, Validators.minLength(3)]],
      category: [''],
      subCategory: [''],
      details: ['', [Validators.required, Validators.minLength(3)]],
    });

    this.productForm.get('status')?.valueChanges.subscribe(value => this.statusInput = value);
    this.store.dispatch(categoryActions.loadCategories())
    this.store.select(getCategories).pipe(
      tap((data) => {this.categories=data[0]})
    ).subscribe()
    // this.categoryService.getCategories()
  }

  ResetForm() {
    this.productForm.reset()
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.productForm.valid) {
      const newId = Math.floor(1000 + Math.random() * 9000);
      this.productForm.patchValue({ id: newId });
      try {
        this.productsService.addProduct(this.productForm.value)
        this.ResetForm();
        this.toastr.success(
          "تم إضافة المنتج بنجاح "
        );
      } catch (error) {
        this.toastr.error("Ops! something went wrong")
      }
    } else {
      this.toastr.error("عفواً! يوجد خطأ في النموذج. يرجى مراجعة البيانات قبل الإرسال")
    }
  }

  handleMainCategorySelection(event: Event) {
    const selectedCategory = (event.target as HTMLSelectElement).value;
    const category = this.categories.find((cat: any) => cat.catEnName === selectedCategory);
    if (category && category.subCategories) {
      this.subCategories = category.subCategories
      console.log("this.subCategories", this.subCategories);
    }
  }
}
