import { Observable, map, tap } from 'rxjs';
import { Component, OnInit, inject } from '@angular/core';
import { PopupService } from '../../../core/Services/popup.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.reducer';
import * as appActions from '../../../../store/app.actions'
import * as productActions from '../../../../store/products/product.actions'
import { getCurrentViewMood } from '../../../../store/app.selectors';
import { CommonModule } from '@angular/common';
import { getCurrentActiveFilterItems } from '../../../../store/products/product.selectors';

@Component({
  selector: 'app-active-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './active-filter.component.html',
  styleUrl: './active-filter.component.scss'
})
export class ActiveFilterComponent implements OnInit {
  popupService = inject(PopupService)
  router = inject(Router)
  store = inject(Store<AppState>)

  pressed: string = '';
  currentViewMood$!: Observable<string>
  currentActiveFilterItems$!:Observable<any>

  ngOnInit(): void {
    this.currentViewMood$ = this.store.select(getCurrentViewMood)
    this.currentActiveFilterItems$ = this.store.select(getCurrentActiveFilterItems).pipe(tap(ele => console.log(ele)
    ))
  }


  toggleClick(type: string): void {
    this.store.dispatch(appActions.setViewMood({ mood: type }))
    this.router.navigate([], { queryParams: { view: type } });
  }

  openFilterPopup() {
    this.popupService.openFilterPopup()
  }

  handleClick(filterName: string, value: string) {
    this.store.dispatch(productActions.removeActiveFilterItem({ filterName, value }));
  }

}
