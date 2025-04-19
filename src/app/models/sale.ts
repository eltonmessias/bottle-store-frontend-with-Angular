import { CartItem } from "./cart-item";
import { PaymentMethod } from "./payment-method";

export interface Sale {
    id: number,
    saleItems: CartItem[],
    payments: PaymentMethod[],
    saleDate: Date;
    totalAmount: number
}