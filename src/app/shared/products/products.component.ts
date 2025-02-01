import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ProductsComponent {
  displayedColumns: string[] = ['id', 'name', 'sellPrice', 'buyPrice', 'category', 'quantity'];
  products: Product[] = [];

  constructor(private productService: ProductService){}

    ngOnInit(): void {
      this.loadProducts();
    }

    loadProducts(): void {
      this.productService.getAllProducts().subscribe({
        next: (data) => {
          this.products = data;
          console.log(data)
        },
        error: (err) => {
          console.log('Erro ao buscar os produtos')
        }
      })
    }
  selectedRow: any = null;

  onCellClick(product: any): void {
    this.selectedRow = product;
  }

  clearSelection(): void {
    this.selectedRow = null;
  }

  editProduct(): void {
    console.log('Editar Produto:', this.selectedRow);
  }

  increaseStock(): void {
    console.log('Aumentar Stock:', this.selectedRow);
  }
}
