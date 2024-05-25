import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashHomePageComponent } from './dash-home-page.component';

describe('DashHomePageComponent', () => {
  let component: DashHomePageComponent;
  let fixture: ComponentFixture<DashHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashHomePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
