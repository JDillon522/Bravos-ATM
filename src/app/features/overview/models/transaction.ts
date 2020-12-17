import { Cash } from 'src/app/core/models/cash';

export interface Transaction {
    time: string;
    type: 'withdraw' | 'restock';
    amount: number;
    denominations: Cash;
}
