import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChartType } from 'angular-google-charts';
import { GoogleChartsModule } from 'angular-google-charts';

@Component({
  selector: 'app-top-category-sales',
  standalone: true,
  imports: [
    GoogleChartsModule,
    CommonModule,

  ],
  templateUrl: './top-category-sales.component.html',
  styleUrl: './top-category-sales.component.scss',
})
export class TopCategorySalesComponent {
  chart = {
    title: 'Top Produtos',
    type: ChartType.PieChart,
    data: [
      ['Cerveja', 40],
      ['Vinho', 25],
      ['Whisky', 15],
      ['Vodka', 10],
      ['Outros', 10]
    ],
    columnNames: ['Produto', 'Vendas (%)'],
    options: {
      is3D: true
    },
    width: 524,
    height: 200
  };
}
