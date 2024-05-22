import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductState } from '../../../../store/products/product.reducer';
import { Observable } from 'rxjs';
import { getSerchTerm } from '../../../../store/products/product.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-no-data-found',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './no-data-found.component.html',
  styleUrl: './no-data-found.component.scss'
})
export class NoDataFoundComponent implements OnInit {

  store = inject(Store<ProductState>)
  searchTerm$!:Observable<string>
  ngOnInit(): void {
    this.searchTerm$ = this.store.select(getSerchTerm)
  }
}
