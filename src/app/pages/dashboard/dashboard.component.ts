import { Component } from '@angular/core';
import { TopCategorySalesComponent } from "../../components/dashboard/top-category-sales/top-category-sales.component";
import { MontlySalesChartComponent } from "../../components/dashboard/montly-sales-chart/montly-sales-chart.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TopCategorySalesComponent, MontlySalesChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
