import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MontlySalesChartComponent } from './montly-sales-chart.component';

describe('MontlySalesChartComponent', () => {
  let component: MontlySalesChartComponent;
  let fixture: ComponentFixture<MontlySalesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MontlySalesChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MontlySalesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
