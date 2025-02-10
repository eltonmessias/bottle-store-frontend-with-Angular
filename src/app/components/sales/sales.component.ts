import { ChangeDetectorRef, Component, computed, signal, Signal } from '@angular/core';
import { CartItem } from '../../models/cart-item';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';


@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [
    FormsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule
  ],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss'
})
export class SalesComponent {
  

  constructor(private cdr: ChangeDetectorRef, private productService: ProductService){}
  allProducts: Product[] = [];
  cartItems = signal<CartItem[]>([])
  searchQuery = signal('');
  filteredProducts: Product[] = []
  showDropdown = signal(false); 

  ngOnInit(): void {
    // Carregar os produtos da API ao inicializar o componente
    this.productService.getAllProducts().subscribe(
      (products: Product[]) => {
        this.allProducts = products;
        this.filteredProducts = products; // Inicializar os produtos filtrados
        console.log(products)
      },
      error => {
        console.error('Erro ao carregar os produtos:', error);
      }
    );
  }

  // Atualiza a lista de produtos filtrados conforme o usuário digita
  // filterProducts() {
  //   if (!this.searchQuery) {
  //     this.filteredProducts = this.allProducts;
  //   } else {
  //     this.filteredProducts = this.allProducts.filter(product =>
  //       product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
  //     );
  //   }
  // }
  filterProducts = computed(() => 
    this.searchQuery().trim() === ''
    ? []
    : this.allProducts.filter(product => 
      product.name.toLowerCase().includes(this.searchQuery().toLowerCase())
    )
  )

  // Função para adicionar produto ao carrinho
  addToCart(product: Product) {
    this.cdr.detectChanges()
    console.log('Produto clicado:', product);
    this.cartItems.update(cart => {
      const existingItem = cart.find(item => item.product === product.name);
      if (existingItem) {
        return cart.map(item =>
          item.product === product.name
            ? { ...item, quantity: item.quantity + 1, subtotal: (item.quantity + 1) * item.sellPrice }
            : item
        );
      } else {
        return [
          ...cart,
          {
            product: product.name,
            quantity: 1,
            sellPrice: product.sellPrice,
            subtotal: product.sellPrice
          }
        ]
      }
    })
    
  
    // Deixe a pesquisa e o filtro como estão, mas apenas feche o dropdown
    this.showDropdown.set(false);
    this.searchQuery.set('');
  }

  // Função para atualizar o total do produto no carrinho
  updateTotal(item: CartItem) {
    this.cartItems.update(cart => 
      cart.map(i => (i.product === item.product ? {...i, subtotal: i.quantity * i.sellPrice} : i))
    );
  }

  // Função para remover item do carrinho
  removeItem(item: CartItem) {
    this.cartItems.update(cart => cart.filter(i => i !== item));
  }

  // Calcula o total do carrinho
  totalAmount =  computed(() =>
    this.cartItems().reduce((total, item) => total + item.subtotal, 0)
  );

  onFocus() {
    this.showDropdown.set(true);
  }

  onBlur() {
    setTimeout(() => this.showDropdown.set(false), 200);  // Espera um tempo para o clique
  }

}
