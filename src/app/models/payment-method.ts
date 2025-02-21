export interface PaymentMethod {
    type: 'dinheiro' | 'cartao' | 'm-pesa' | 'e-mola';
    amount: number;
}
