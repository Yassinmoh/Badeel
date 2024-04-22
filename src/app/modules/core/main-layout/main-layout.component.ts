import { Component, OnInit, OnDestroy } from '@angular/core';
import { PopupService } from '../Services/popup.service';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent implements OnInit,OnDestroy {
  constructor(public popupService: PopupService) { }
  showSplash: boolean = true
  duration:number=4000;
  timer$!:Subscription
  ngOnInit(): void {
    this.timer$ = timer(this.duration).subscribe(()=>{
      this.showSplash=false
    })
  }

  ngOnDestroy(): void {
      if(this.timer$){
        this.timer$.unsubscribe()
      }
  }
}
