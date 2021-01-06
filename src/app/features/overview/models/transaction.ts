import { AtmCash } from 'src/app/store/models/cash';

export interface Transaction {
    time: string;
    type: 'withdraw' | 'restock';
    amount: number;
    adjustedCashOnHandAmount: number;
    denominations: AtmCash;
}
