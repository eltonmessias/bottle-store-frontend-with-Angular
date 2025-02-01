import { Component } from '@angular/core';
import { ProductsComponent } from "../../shared/products/products.component";
import { MatDialog } from '@angular/material/dialog';
import { ProductFormComponent } from '../../shared/product-form/product-form.component';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [ProductsComponent],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent {

  constructor(private dialog: MatDialog) {}

  openCreateProductDialog() {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '679px',
      height: '531px',
      position: { top: '-90vh', left: '200px'},
      panelClass: 'product-form-container',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Produto criado:', result)
      }
    })
  }

  
}
