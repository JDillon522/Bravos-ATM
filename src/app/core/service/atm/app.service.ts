import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Cash, CashIndexes, CashValuesByIndex } from '../../models/cash';

const seedStartAmount: number = 10;
export const cashOnHandSeed: Cash = {
  total: 1860,
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
  private _cashOnHandState: Cash = cashOnHandSeed;
  public cashOnHand$: BehaviorSubject<Cash> = new BehaviorSubject<Cash>(this._cashOnHandState);


  constructor() { }

  public withdrawCash(amount: number): Observable<boolean | string> {
    const necessaryDenominations = this.calculateDenomination(amount);
    // TODO in the real world find a way to flatten observables to handle concurrent transactions
    this._cashOnHandState = this.adjustState(necessaryDenominations, this._cashOnHandState, 'withdraw');
    this.cashOnHand$.next(this._cashOnHandState);

    return of(true);

    // TODO handle error case
  }

  public calculateDenomination(amount: number): Cash {
    const denominationBreakdown: Cash = {
      total: amount,
      hundreds: 0,
      fifties: 0,
      twenties: 0,
      tens: 0,
      fives: 0,
      ones: 0
    };

    // TODO handle restock at the same time
    function denomination(level: CashIndexes): void {
      if (amount >= CashValuesByIndex[level]) {
        denominationBreakdown[level]++;
        // TODO handle insufficient denominations on hand
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

  private pickNextSmallestDenomination(level: CashIndexes): CashIndexes {
    switch (level) {
      case 'hundreds':
        return 'fifties';

      case 'fifties':
        return 'twenties';

      case 'twenties':
        return 'tens';

      case 'tens':
        return 'fives';

      default:
        return 'ones';
    }
  }
}
