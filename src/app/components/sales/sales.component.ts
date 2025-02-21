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
import { PaymentMethod } from '../../models/payment-method';
import { AuthService } from '../../services/auth.service';


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
  

  constructor(private cdr: ChangeDetectorRef, private productService: ProductService, private authService: AuthService){}
  allProducts: Product[] = [];
  cartItems = signal<CartItem[]>([])
  searchQuery = signal('');
  filteredProducts: Product[] = []
  showDropdown = signal(false); 
  username: string | null = '';
 

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

    this.authService.getUsername().subscribe((response) => {
      this.username = response.username;
    },
    (error) => {
      console.error("Erro ao obter o nome do usuário: ", error);
    }
    )
  }


  
  filterProducts = computed(() => 
    this.searchQuery().trim() === ''
    ? this.allProducts
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
            sellPrice: product.sellingPrice,
            subtotal: product.sellingPrice
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

  paymentOptions = [
    { type: 'dinheiro', label: 'Dinheiro' },
    { type: 'cartao', label: 'Cartão' },
    { type: 'm-pesa', label: 'M-Pesa' },
    { type: 'e-mola', label: 'E-Mola' }
  ];
  payments = signal<PaymentMethod[]>([]);

  totalPayment = computed(() => 
    this.payments().reduce((total, payment) => total + payment.amount, 0)
  )

  getPaymentAmount(type:string): number {
    const payment = this.payments().find(p => p.type === type);
    return payment ? payment.amount : 0
  }

  changeAmount = computed(() => {
    const change = this.totalPayment() - this.totalAmount();
    return change > 0 ? change : 0;
  })

  updatePayment(type: string, value: string) {
    const amount = parseFloat(value) || 0;
    this.payments.update(payments => {
      const index = payments.findIndex(p => p.type === type);
      if (index > -1) {
        // Se já existir esse tipo de pagamento, cria um novo array atualizando o item
        return payments.map((p, i) =>
          i === index ? { ...p, amount } : p
        );
      } else {
        // Se não existir, retorna um novo array com o novo pagamento adicionado
        return [...payments, { type: type as PaymentMethod['type'], amount }];
      }
    });

  }

  confirmPayment() {
    const totalDue = this.totalAmount();
  const totalPaid = this.totalPayment();
  const change = this.changeAmount();

  if (totalPaid >= totalDue) {
    alert(`✅ Pagamento Confirmado! \n\n💰 Total Pago: ${totalPaid.toFixed(2)} \n💵 Troco: ${change.toFixed(2)}`);
    // Aqui você pode chamar um serviço para registrar a venda ou limpar o carrinho
    this.cartItems.set([]);
    this.payments.set([]);
  } else {
    alert(`❌ Pagamento Insuficiente! \n\n💰 Total Pago: ${totalPaid.toFixed(2)} \n📌 Total Devido: ${totalDue.toFixed(2)}`);
  }
  }
  

  onFocus() {
    this.showDropdown.set(true);
  }

  onBlur() {
    setTimeout(() => this.showDropdown.set(false), 200);  // Espera um tempo para o clique
  }


  increaseQuantity(index: number){
    this.cartItems()[index].quantity += 1
    this.updateSubtotal(index)
  }
  decreaseQuantity(index:number) {
    if (this.cartItems()[index].quantity > 1) {
      this.cartItems()[index].quantity -= 1;
      this.updateSubtotal(index);
    }
  }

  updateQuantity(index:number) {
    if (this.cartItems()[index].quantity < 1) {
      this.cartItems()[index].quantity = 1; // Evita valores negativos ou zero
    }
    this.updateSubtotal(index);
  }

  updateSubtotal(index: number) {
    this.cartItems.update(cart => {
      const updatedCart = [...cart];
      updatedCart[index] = {
        ...updatedCart[index],
        subtotal: updatedCart[index].quantity * updatedCart[index].sellPrice
      };
      return updatedCart;
    });
  }
}
