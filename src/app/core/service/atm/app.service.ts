import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Transaction } from 'src/app/features/overview/models/transaction';
import { Cash, CashIndexes, CashValuesByIndex } from '../../models/cash';

const seedStartAmount: number = 10;
export const startingTotal: number = 1860;
export const cashOnHandSeed: Cash = {
  hundreds: seedStartAmount,
  fifties: seedStartAmount,
  twenties: seedStartAmount,
  tens: seedStartAmount,
  fives: seedStartAmount,
  ones: seedStartAmount
};

@Injectable({
  providedIn: 'root'
})
export class ATMService {
  private _denominationsOnHandState: Cash = cashOnHandSeed;
  private _totalCashOnHandState: number = startingTotal;
  public totalCashOnHand$: BehaviorSubject<number> = new BehaviorSubject<number>(this._totalCashOnHandState);
  public denominationsOnHand$: BehaviorSubject<Cash> = new BehaviorSubject<Cash>(this._denominationsOnHandState);


  constructor() { }

  public withdrawCash(amount: number): Observable<Transaction | Error> {
    const necessaryDenominations: Cash = this.calculateDenomination(amount);
    console.log();

    this._denominationsOnHandState = this.adjustState(necessaryDenominations, this._denominationsOnHandState, 'withdraw');
    this.denominationsOnHand$.next(this._denominationsOnHandState);

    this._totalCashOnHandState -= amount;
    this.totalCashOnHand$.next(this._totalCashOnHandState);

    const record: Transaction = {
      amount: amount,
      adjustedCashOnHandAmount: this._totalCashOnHandState,
      type: 'withdraw',
      time: new Date().toDateString(),
      denominations: necessaryDenominations
    };
    return of(record);

    // TODO handle error case
  }

  public restockCash(denom: Cash, totalNewCash: number): Observable<Transaction | Error> {
    this._denominationsOnHandState = this.adjustState(denom, this._denominationsOnHandState, 'restock');
    this.denominationsOnHand$.next(this._denominationsOnHandState);

    this._totalCashOnHandState += totalNewCash;
    this.totalCashOnHand$.next(this._totalCashOnHandState);

    const record: Transaction = {
      amount: totalNewCash,
      adjustedCashOnHandAmount: this._totalCashOnHandState,
      type: 'restock',
      time: new Date().toDateString(),
      denominations: denom
    };
    return of(record);
  }

  public calculateDenomination(amount: number): Cash {
    const denominationBreakdown: Cash = {
      hundreds: 0,
      fifties: 0,
      twenties: 0,
      tens: 0,
      fives: 0,
      ones: 0
    };

    function denomination(level: CashIndexes): void {
      if (amount >= CashValuesByIndex[level]) {
        denominationBreakdown[level]++;
        amount -= CashValuesByIndex[level];
        denomination(level);
      }
    }

    denomination('hundreds');
    denomination('fifties');
    denomination('twenties');
    denomination('tens');
    denomination('fives');
    denomination('ones');

    return denominationBreakdown;
  }

  public adjustState(denominations: Cash, state: Cash, action: 'withdraw' | 'restock'): Cash {
    // TODO error handling when there is not enough cash on hand
    // TODO error handling when there are insufficient denominations to work
    for (const key in denominations) {

      if (action === 'withdraw') {
        state[key as keyof Cash] -= denominations[key as keyof Cash];

      } else {
        state[key as keyof Cash] += denominations[key as keyof Cash];
      }
    }

    return state;
  }

}
