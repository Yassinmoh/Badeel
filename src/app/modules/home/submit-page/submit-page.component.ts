import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/Services/product.service';

@Component({
  selector: 'app-submit-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './submit-page.component.html',
  styleUrls: ['./submit-page.component.scss'],
})
export class SubmitPageComponent implements OnInit {
  private fb = inject(FormBuilder);
  productForm!: FormGroup;
  statusInput: string = ''
  constructor(public firestore: AngularFirestore, private productsService: ProductService) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      status: ['',[Validators.required]],
      id: [],
      productArName: ['',[Validators.required, Validators.minLength(3)]],
      productEnName: ['',[Validators.required, Validators.minLength(3)]],
      company: ['',[Validators.required, Validators.minLength(3)]],
      details: ['',[Validators.required, Validators.minLength(3)]],
    });


    this.productForm.get('status')?.valueChanges.subscribe(value => this.statusInput = value);
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.productForm.valid) {
      const newId = Math.floor(1000 + Math.random() * 9000);
      this.productForm.patchValue({ id: newId });
      try {
        this.productsService.addProduct(this.productForm.value)
        console.log("Product added successfully");
      } catch (error) {
        console.log("something went wrong", error);
      }
    } else {
      console.error('Invalid form');
    }
  }
}
