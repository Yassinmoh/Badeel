import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CommonModule } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ProductService } from '../../../core/Services/product.service';
import { HttpClient } from '@angular/common/http';
import { Category } from '../../../core/model/Category';

@Component({
  selector: 'app-submit-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ToastrModule, FormsModule],
  templateUrl: './submit-page.component.html',
  styleUrls: ['./submit-page.component.scss'],
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
    private http: HttpClient
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
    this.getCategories()
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

  getCategories() {
    return this.http.get(`../../../../../assets/data/Categories.json`).subscribe(data => {
      console.log('Categories:', data);
      this.categories = data
    });
  }


  handleMainCategorySelection(event: Event) {
    const selectedCategory = (event.target as HTMLSelectElement).value;
    const category = this.categories.find((cat: any) => cat.catEnName === selectedCategory);
    if (category && category.subCategories) {
      this.subCategories = category.subCategories
      console.log("this.subCategories", this.subCategories);

    }
  }

  // renderSubcategories(subcategories: string[]) {

  // }
}
