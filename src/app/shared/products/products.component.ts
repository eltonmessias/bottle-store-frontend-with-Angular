import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ProductsComponent {
  displayedColumns: string[] = ['id', 'name', 'price', 'category', 'quantity'];
  products = [
    { id: 1, Name: 'Produto A', category: 'Categoria 1', price: 100.0,  quantity: 100 },
    { id: 2, name: 'Produto B', category: 'Categoria 2', price: 200.0,  quantity: 100 },
    { id: 3, name: 'Produto C', category: 'Categoria 1', price: 300.0, quantity: 100 },
    { id: 4, name: 'Produto D', category: 'Categoria 3', price: 400.0, quantity: 100 },
    { id: 1, Name: 'Produto A', category: 'Categoria 1', price: 100.0,  quantity: 100 },
    { id: 2, name: 'Produto B', category: 'Categoria 2', price: 200.0,  quantity: 100 },
    { id: 3, name: 'Produto C', category: 'Categoria 1', price: 300.0, quantity: 100 },
    { id: 4, name: 'Produto D', category: 'Categoria 3', price: 400.0, quantity: 100 },
  ];

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
