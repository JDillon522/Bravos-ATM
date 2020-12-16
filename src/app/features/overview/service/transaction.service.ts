import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Transaction } from '../models/transaction';

const dummyTransactions: Transaction[] = [
  {
    time: new Date().toDateString(),
    amount: 35,
    type: 'withdrawal',
    denominations: {
      100: 0,
      50: 0,
      20: 1,
      10: 1,
      5: 1,
      1: 0
    }
  },
  {
    time: new Date().toDateString(),
    type: 'withdrawal',
    amount: 63,
    denominations: {
      100: 0,
      50: 1,
      20: 0,
      10: 1,
      5: 0,
      1: 3
    }
  },
  {
    time: new Date().toDateString(),
    type: 'restock',
    amount: 128,
    denominations: {
      100: 0,
      50: 2,
      20: 0,
      10: 2,
      5: 0,
      1: 8
    }
  }
];

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  public transactionRecords$: BehaviorSubject<Transaction[]> = new BehaviorSubject<Transaction[]>(dummyTransactions);

  constructor() { }
}
