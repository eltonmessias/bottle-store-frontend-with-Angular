import { Component } from '@angular/core';
import { ProductsComponent } from "../../shared/products/products.component";

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [ProductsComponent],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent {

}
