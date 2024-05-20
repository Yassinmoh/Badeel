import { Component, EventEmitter, Output } from '@angular/core';
import { TypewriterComponent } from '../../../shared/components/typewriter/typewriter.component';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { Product } from '../../../core/model/Product';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [TypewriterComponent,SearchComponent],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss'
})
export class IntroComponent {
  @Output() onSearch = new EventEmitter<Product[]>();

  getSearchResult(products: Product[]): void {
    this.onSearch.emit(products);
  }
}
