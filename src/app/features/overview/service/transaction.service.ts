import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Transaction } from '../models/transaction';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private _state: Transaction[] = [];
  public transactionRecords$: BehaviorSubject<Transaction[]> = new BehaviorSubject<Transaction[]>(this._state);

  constructor() { }

  public addRecord(record: Transaction ): Observable<boolean> {
    this._state.push(record);
    this.transactionRecords$.next(this._state);
    return of(true);
    // TODO account for error state. Not sure how yet...
  }
}
