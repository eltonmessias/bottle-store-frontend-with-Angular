import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormComponent } from '../../shared/product-form/product-form.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent implements OnInit{

  refreshProducts = false;


  displayedColumns: string[] = ['id', 'name', 'sellPrice', 'buyPrice', 'category', 'quantity'];
  products: Product[] = [];
  categories = [];

  constructor(private productService: ProductService,private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  

  openCreateProductDialog() {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '679px',
      height: '531px',
      panelClass: 'product-form-container',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Produto criado:', result);
        this.loadProducts();
      }
    })
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
