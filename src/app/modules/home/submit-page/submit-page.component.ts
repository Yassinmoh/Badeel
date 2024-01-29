import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-submit-page',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './submit-page.component.html',
  styleUrl: './submit-page.component.scss'
})
export class SubmitPageComponent implements OnInit {
  private fb = inject(FormBuilder)
  item$!: Observable<any[]>;

  productForm!: FormGroup;
  constructor(public firestore: Firestore) {
    console.log("firestore",firestore);

  }
  ngOnInit(): void {
    this.productForm = this.fb.group({
      status: [''],
      productArName: [''],
      productEnName: [''],
      company: [''],
      details: ['']
    });
}

  onSubmit(event:Event) {
    event.preventDefault()
    console.log("value",this.productForm.value);
  }

}
