import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Transaction } from '../models/transaction';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  public transactionRecords$: BehaviorSubject<Transaction[]> = new BehaviorSubject<Transaction[]>([]);

  constructor() { }
}
