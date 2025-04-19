import { Component } from '@angular/core';
import { GoogleChartsModule } from 'angular-google-charts';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'app-montly-sales-chart',
  standalone: true,
  imports: [
    GoogleChartsModule,

  ],
  templateUrl: './montly-sales-chart.component.html',
  styleUrl: './montly-sales-chart.component.scss'
})
export class MontlySalesChartComponent {
  chart = {
    title: 'Month Sales',
    type: ChartType.LineChart,
    data: [
      ['Jan', 1000],
      ['Feb', 1170],
      ['Mar', 660],
      ['Apr', 1030],
      ['May', 850],
      ['Jun', 920],
      ['Jul', 1100],
      ['Aug', 1300],
      ['Sep', 980],
      ['Oct', 1150],
      ['Nov', 990],
      ['Dec', 1230]
    ],
    columnNames:['Vendas','Mês'],
   

    options: {
      title: 'Vendas Mensais',
    curveType: 'function',
    legend: { position: 'bottom' },
    pointSize: 6,
    colors: ['#4caf50'],
    animation: {
      duration: 1000,
      easing: 'out',
      startup: true,
      is3D: true}
    },
    width: 650,
    height: 260
  };

}
