import { CartItem } from "./cart-item";
import { PaymentMethod } from "./payment-method";

export interface sale {
    saleItems: CartItem[],
    payments: PaymentMethod[]
}