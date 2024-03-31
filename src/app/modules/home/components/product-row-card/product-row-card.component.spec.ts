import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRowCardComponent } from './product-row-card.component';

describe('ProductRowCardComponent', () => {
  let component: ProductRowCardComponent;
  let fixture: ComponentFixture<ProductRowCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductRowCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductRowCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
