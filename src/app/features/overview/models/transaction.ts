import { Cash } from 'src/app/core/models/cash';

export interface Transaction {
    time: string;
    type: 'withdrawal' | 'restock';
    amount: number;
    denominations: Cash;
}
