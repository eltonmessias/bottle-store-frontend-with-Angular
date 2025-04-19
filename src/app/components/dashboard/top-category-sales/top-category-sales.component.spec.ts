import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopCategorySalesComponent } from './top-category-sales.component';

describe('TopCategorySalesComponent', () => {
  let component: TopCategorySalesComponent;
  let fixture: ComponentFixture<TopCategorySalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopCategorySalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopCategorySalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
