import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CommonModule } from '@angular/common';
import { AngularFireModule, FirebaseApp } from '@angular/fire/compat';
import { Firestore } from 'firebase/firestore/lite';
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
  item$!: Observable<any[]>;

  productForm!: FormGroup;

  constructor(public firestore: AngularFirestore, private productsService: ProductService) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      status: [''],
      id: [],
      productArName: [''],
      productEnName: [''],
      company: [''],
      details: [''],
    });
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
