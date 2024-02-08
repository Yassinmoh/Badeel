import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  @ViewChild('searchBody') searchBody!: ElementRef;

  onFocus(): void{
    this.searchBody.nativeElement.style.boxShadow='0 32px 40px -12px #00000040';
  }
  onBlur(): void{
    this.searchBody.nativeElement.style.boxShadow='none'
  }
}
