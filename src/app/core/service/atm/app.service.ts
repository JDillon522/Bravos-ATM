import { Injectable } from '@angular/core';
import { AtmCash, CashIndexes, CashValuesByIndex } from 'src/app/store/models/cash';

@Injectable({
  providedIn: 'root'
})
export class ATMService {

  constructor() { }

  public calculateDenomination(amount: number): AtmCash {
    const denominationBreakdown: AtmCash = {
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

  public calculateCashFromDenominations(cash: AtmCash): number {
    let total = 0;
    total += cash.hundreds * 100;
    total += cash.fifties * 50;
    total += cash.twenties * 20;
    total += cash.tens * 10;
    total += cash.fives * 5;
    total += cash.ones;

    return total;
  }

}
