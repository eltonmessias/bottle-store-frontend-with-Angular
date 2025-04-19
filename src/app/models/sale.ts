import { CartItem } from "./cart-item";
import { PaymentMethod } from "./payment-method";

export interface Sale {
    saleItems: CartItem[],
    payments: PaymentMethod[],
    saleDate: Date;
    totalAmount: number
}