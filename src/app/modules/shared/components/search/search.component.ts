import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../../core/Services/product.service';
import { Product } from '../../../core/model/Product';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  @ViewChild('searchBody') searchBody!: ElementRef;
  @Output() onSearch = new EventEmitter<Product[]>();
  searchForm!: FormGroup
  fb = inject(FormBuilder)
  productService = inject(ProductService)
  isInputEmpty: boolean = true
  searchTerm: string = '';



  ngOnInit(): void {
    this.searchForm = this.fb.group({ searchInput: [''] })
    this.handleSearchBtn()

  }

  submit(e: Event) {
    e.preventDefault()
    this.searchTerm = this.searchForm.controls['searchInput'].value
    this.productService.searchProducts(this.searchTerm).subscribe(filteredProducts => {
      this.productService.updateSearchResults(filteredProducts)
      this.searchForm.reset()
    });


    window.scrollTo({ top: 400, behavior: "smooth" });
  }


  handleSearchBtn() {
    this.searchForm.valueChanges.subscribe(change => {
      if (change.searchInput.length !== 0) {
        this.isInputEmpty = false
      } else {
        this.isInputEmpty = true
      }
    })
  }
  onFocus(): void {
    this.searchBody.nativeElement.style.boxShadow = '0 32px 40px -12px #00000040';
  }
  onBlur(): void {
    this.searchBody.nativeElement.style.boxShadow = 'none'
  }
}
