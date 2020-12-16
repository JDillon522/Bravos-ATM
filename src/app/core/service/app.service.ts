import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Cash, CashIndexs, CashValuesByIndex } from '../models/cash';

const seedStartAmount: number = 10;
const seed: Cash = {
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
  public cashOnHand$: BehaviorSubject<Cash> = new BehaviorSubject<Cash>(seed);


  constructor() { }

  public withdrawCash(amount: number): Observable<boolean | string> {

    return of(true);
  }

  public calculateDenomination(currentAmount: number, ): Cash {
    const denominationBreakdown: Cash = {
      hundreds: 0,
      fifties: 0,
      twenties: 0,
      tens: 0,
      fives: 0,
      ones: 0
    };

    function denomination(level: CashIndexs): void {
      if (currentAmount >= CashValuesByIndex[level]) {
        denominationBreakdown[level]++;
        currentAmount -= CashValuesByIndex[level];
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
}
