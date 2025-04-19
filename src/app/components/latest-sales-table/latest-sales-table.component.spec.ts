import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestSalesTableComponent } from './latest-sales-table.component';

describe('LatestSalesTableComponent', () => {
  let component: LatestSalesTableComponent;
  let fixture: ComponentFixture<LatestSalesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LatestSalesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatestSalesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
