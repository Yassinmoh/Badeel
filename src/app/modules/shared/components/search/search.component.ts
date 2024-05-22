import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../../core/Services/product.service';
import { Product } from '../../../core/model/Product';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/App/app.reducer';
import * as productActions from '../../../../store/products/product.actions'
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
  router = inject(Router)
  route = inject(ActivatedRoute)
  store = inject(Store<AppState>)

  productService = inject(ProductService)
  isInputEmpty: boolean = true
  searchTerm: string = '';



  ngOnInit(): void {
    this.searchForm = this.fb.group({ searchInput: [''] })
    this.handleSearchBtn()
  }

  submit(e: Event) {
    e.preventDefault();
    const searchTerm = this.searchForm.controls['searchInput'].value;
    this.store.dispatch(productActions.searchProducts({searchTrem:searchTerm}))
    // this.productService.searchProductsFilter(searchTerm).subscribe(filteredProducts => {
    //   this.onSearch.emit(filteredProducts)
    //   this.handleQueryParams(searchTerm)
    //   this.searchForm?.reset();
    // });
    window.scrollTo({ top: 400, behavior: "smooth" });
  }

  handleQueryParams(trem: string) {
    const currentParams = this.route.snapshot.queryParams;
    const queryParams = { ...currentParams, query: trem };
    this.router.navigate([], { queryParams: queryParams });
  }

  handleSearchBtn() {
    this.searchForm.valueChanges.subscribe(change => {
      if (change.searchInput?.length !== 0) {
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
