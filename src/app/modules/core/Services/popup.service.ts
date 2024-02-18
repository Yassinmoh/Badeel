import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private openFilterSubject$:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public openFilter:Observable<boolean> = this.openFilterSubject$.asObservable();
  constructor() { }

  openFilterPopup() {
    this.openFilterSubject$.next(true);
  }

  closeFilterPopup() {
    this.openFilterSubject$.next(false);
  }
}
