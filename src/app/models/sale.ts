import { CartItem } from "./cart-item";
import { Customer } from "./Customer";
import { PaymentMethod } from "./payment-method";

export interface Sale {
    id?: number,
    sellCode: String,
    saleItems: CartItem[],
    payments: PaymentMethod[],
    saleDate: Date;
    totalAmount: number,
    customer: Customer
}