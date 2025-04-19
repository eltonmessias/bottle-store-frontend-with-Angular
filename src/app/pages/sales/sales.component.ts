import { ChangeDetectorRef, Component, computed, signal, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

import { CartItem } from '../../models/cart-item';
import { Product } from '../../models/product';
import { PaymentMethod } from '../../models/payment-method';
import { ProductService } from '../../services/product/product.service';
import { AuthService } from '../../services/auth/auth.service';
import { SaleService } from '../../services/sale/sale.service';
import { Sale } from '../../models/sale';



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
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  cartItems = signal<CartItem[]>([]);
  payments = signal<PaymentMethod[]>([]);
  searchQuery = signal('');
  showDropdown = signal(false);
  username: string | null = '';

  latestSales: Sale[] = [];

  paymentOptions = [
    { type: 'dinheiro', label: 'Dinheiro' },
    { type: 'cartao', label: 'Cartão' },
    { type: 'm-pesa', label: 'M-Pesa' },
    { type: 'e-mola', label: 'E-Mola' }
  ];

  constructor(
    private cdr: ChangeDetectorRef,
    private productService: ProductService,
    private authService: AuthService,
    private saleService: SaleService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadUser();
    
  }

  

  // --- API Calls ---
  private loadProducts() {
    this.productService.getAllProducts().subscribe(
      (products: Product[]) => {
        this.allProducts = products;
        this.filteredProducts = products;
      },
      error => console.error('Erro ao carregar os produtos:', error)
    );
  }

  private loadUser() {
    this.authService.getUsername().subscribe(
      response => (this.username = response.username),
      error => console.error('Erro ao obter o nome do usuário:', error)
    );
  }

  // --- Computed Properties ---
  filterProducts = computed(() =>
    this.searchQuery().trim() === ''
      ? this.allProducts
      : this.allProducts.filter(product =>
          product.name.toLowerCase().includes(this.searchQuery().toLowerCase())
        )
  );

  totalAmount = computed(() =>
    this.cartItems().reduce((total, item) => total + item.subtotal, 0)
  );

  totalPayment = computed(() =>
    this.payments().reduce((total, payment) => total + payment.amount, 0)
  );

  changeAmount = computed(() => {
    const change = this.totalPayment() - this.totalAmount();
    return change > 0 ? change : 0;
  });

  // --- Cart Operations ---
  addToCart(product: Product) {
    this.cdr.detectChanges();
    this.cartItems.update(cart => {
      const existingItem = cart.find(item => item.product === product.name);
      if (existingItem) {
        return cart.map(item =>
          item.product === product.name
            ? { ...item, quantity: item.quantity + 1, subtotal: (item.quantity + 1) * item.sellPrice }
            : item
        );
      } else {
        return [...cart, { productId: product.id, product: product.name, quantity: 1, availableQuantity: product.stockQuantity, sellPrice: product.sellingPrice, subtotal: product.sellingPrice }];
      }
    });
    this.showDropdown.set(false);
    this.searchQuery.set('');
  }

  removeItem(item: CartItem) {
    this.cartItems.update(cart => cart.filter(i => i !== item));
  }

  updateTotal(item: CartItem) {
    this.cartItems.update(cart =>
      cart.map(i => (i.product === item.product ? { ...i, subtotal: i.quantity * i.sellPrice } : i))
    );
  }

  // --- Quantity Updates ---
  increaseQuantity(index: number) {
    this.cartItems()[index].quantity += 1;
    this.updateSubtotal(index);
  }

  decreaseQuantity(index: number) {
    if (this.cartItems()[index].quantity > 1) {
      this.cartItems()[index].quantity -= 1;
      this.updateSubtotal(index);
    }
  }

  updateQuantity(index: number) {
    if (this.cartItems()[index].quantity < 1) {
      this.cartItems()[index].quantity = 1;
    }
    this.updateSubtotal(index);
  }

  private updateSubtotal(index: number) {
    this.cartItems.update(cart => {
      const updatedCart = [...cart];
      updatedCart[index] = {
        ...updatedCart[index],
        subtotal: updatedCart[index].quantity * updatedCart[index].sellPrice
      };
      return updatedCart;
    });
  }

  // --- Payment Handling ---
  getPaymentAmount(type: string): number {
    const payment = this.payments().find(p => p.type === type);
    return payment ? payment.amount : 0;
  }

  updatePayment(type: string, value: string) {
    const amount = parseFloat(value) || 0;
    this.payments.update(payments => {
      const index = payments.findIndex(p => p.type === type);
      if (index > -1) {
        return payments.map((p, i) => (i === index ? { ...p, amount } : p));
      } else {
        return [...payments, { type: type as PaymentMethod['type'], amount }];
      }
    });
  
    console.log("📌 Pagamentos atualizados:", this.payments());
  }

  confirmPayment() {
  if (this.totalPayment() >= this.totalAmount()) {
    const saleData = {
      items: this.cartItems().map(item => ({ productId: item.productId, quantity: item.quantity })),
      payments: this.payments(),
      totalAmount: this.totalAmount(),
      totalPaid: this.totalPayment(),
      change: this.changeAmount()
    };

    console.log("📌 Dados da venda enviados:", JSON.stringify(saleData, null, 2));

    this.saleService.processSale(saleData).subscribe(
      () => {
        alert(`✅ Pagamento Confirmado!`);
        this.cartItems.set([]);
        this.payments.set([]);
      },
      error => {
        console.error('Erro ao registrar a venda:', error);
        alert('❌ Erro ao processar a venda. Tente novamente.');
      }
    );
  } else {
    alert('❌ Pagamento Insuficiente!');
  }
}


  // --- UI Handlers ---
  onFocus() {
    this.showDropdown.set(true);
  }

  onBlur() {
    setTimeout(() => this.showDropdown.set(false), 200);
  }
}
