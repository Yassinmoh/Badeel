import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CommonModule } from '@angular/common';
import { AngularFireModule, FirebaseApp } from '@angular/fire/compat';
import { Firestore } from 'firebase/firestore/lite';

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

  constructor(public firestore: AngularFirestore) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      status: [''],
      productArName: [''],
      productEnName: [''],
      company: [''],
      details: [''],
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.productForm.valid) {
      this.firestore.collection('products').add(this.productForm.value).then(() => {
        console.log('Product added!');
      }).catch((error: any) => {
        console.error('Error adding product: ', error);
      });
    } else {
      console.error('Invalid form');
    }
  }
}
