import { Observable, tap } from 'rxjs';
import { Component, OnInit, inject } from '@angular/core';
import { PopupService } from '../../../core/Services/popup.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.reducer';
import * as appActions from '../../../../store/app.actions'
import { getCurrentViewMood } from '../../../../store/app.selectors';
import { CommonModule } from '@angular/common';

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


  ngOnInit(): void {
    this.currentViewMood$ = this.store.select(getCurrentViewMood)
  }


  toggleClick(type: string): void {
    this.store.dispatch(appActions.setViewMood({ mood: type }))
    this.router.navigate([], { queryParams: { view: type } });
  }

  openFilterPopup() {
    this.popupService.openFilterPopup()
  }

}
