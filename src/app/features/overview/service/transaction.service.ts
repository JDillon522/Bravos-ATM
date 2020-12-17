import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Cash } from 'src/app/core/models/cash';
import { Transaction } from '../models/transaction';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private _state: Transaction[] = [];
  public transactionRecords$: BehaviorSubject<Transaction[]> = new BehaviorSubject<Transaction[]>(this._state);

  constructor() { }

  public addRecord(data: Cash, action: 'withdraw' | 'restock' ): Observable<boolean> {
    this._state.push({
      amount: data.total,
      adjustedCashOnHandAmount: data.adjustedCashOnHand,
      time: new Date().toDateString(),
      type: action,
      denominations: data
    });
    this.transactionRecords$.next(this._state);
    return of(true);
    // TODO account for error state. Not sure how yet...
  }
}
