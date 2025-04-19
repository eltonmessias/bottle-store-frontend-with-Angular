import { Component } from '@angular/core';
import { SaleService } from '../../services/sale/sale.service';
import { Sale } from '../../models/sale';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-latest-sales-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule, MatButtonModule
  ],
  templateUrl: './latest-sales-table.component.html',
  styleUrl: './latest-sales-table.component.scss'
})
export class LatestSalesTableComponent {

  displayedColumns: string[] = ['id', 'totalAmount'];

  latestSales: Sale[] = []
  sales: Sale[] = [];

  constructor(private saleService: SaleService){}


  ngOnInit(): void {
    this.getLatestSales();
  }

  private getLatestSales() {
    this.saleService.getLatestSales(5).subscribe(data => {
      this.latestSales = data;
      console.log(data)
    })
    
  }

}
