import { fakeAsync, TestBed } from '@angular/core/testing';
import { Cash } from '../../models/cash';
import { ATMService, startingTotal } from './app.service';
import { clone } from 'lodash';
import { Transaction } from 'src/app/features/overview/models/transaction';

describe('AppService', () => {
  let service: ATMService;
  const testDenominations: Cash = {
    hundreds: 0,
    fifties: 0,
    twenties: 0,
    tens: 0,
    fives: 0,
    ones: 0
  };
  const testTransaction: Transaction = {
    amount: 0,
    type: 'withdraw',
    time: new Date().toDateString(),
    adjustedCashOnHandAmount: startingTotal,
    denominations: testDenominations
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ATMService);
  });

  it('withdrawCash() - Withdraw cash with valid input should return Observable<Transaction | Error>', fakeAsync(() => {
    const den = clone(testDenominations);
    den.fifties = 1;

    const tran = clone(testTransaction);
    tran.amount = 50;
    tran.denominations = den;
    tran.adjustedCashOnHandAmount -= 50;

    service.withdrawCash(50).subscribe(res => {
      expect(res).toEqual(tran);
    });
  }));

  it('restockCash() - Restock cash with valid input should return Observable<Transaction | Error>', fakeAsync(() => {
    const den = clone(testDenominations);
    den.fifties = 1;

    const tran = clone(testTransaction);
    tran.amount = 50;
    tran.denominations = den;
    tran.type = 'restock';
    tran.adjustedCashOnHandAmount += 50;

    service.restockCash(den, 50).subscribe(res => {
      expect(res).toEqual(tran);
    });
  }));

  it('calculateDenomination() - Calculates cash denomination breakdown correctly when withdrawing: 150', () => {
    const den = clone(testDenominations);
    den.hundreds = 1;
    den.fifties = 1;
    expect(service.calculateDenomination(150)).toEqual(den);
  });

  it('calculateDenomination() - Calculates cash denomination breakdown correctly when withdrawing: 342', () => {
    const den = clone(testDenominations);
    den.hundreds = 3;
    den.twenties = 2;
    den.ones = 2;
    expect(service.calculateDenomination(342)).toEqual(den);
  });

  it('calculateDenomination() - Calculates cash denomination breakdown correctly when withdrawing: 3', () => {
    const den = clone(testDenominations);
    den.ones = 3;
    expect(service.calculateDenomination(3)).toEqual(den);
  });

  it('calculateDenomination() - Calculates cash denomination breakdown correctly when withdrawing: 42', () => {
    const den = clone(testDenominations);
    den.twenties = 2;
    den.ones = 2;
    expect(service.calculateDenomination(42)).toEqual(den);
  });

  it('adjustState() - Adjusts cash on hand state correctly when withdrawing cash', () => {
    const state = clone(testDenominations);
    state.hundreds = 3;
    state.twenties = 2;
    state.ones = 2;

    const withdrawDenominations = clone(testDenominations);
    withdrawDenominations.hundreds = 1;
    withdrawDenominations.ones = 2;

    const expectedState = clone(testDenominations);
    expectedState.hundreds = 2;
    expectedState.twenties = 2;

    expect(service.adjustState(withdrawDenominations, state, 'withdraw')).toEqual(expectedState);
  });

  it('adjustState() - Adjusts cash on hand state correctly when restocking cash', () => {
    const state = clone(testDenominations);
    state.hundreds = 3;
    state.twenties = 2;
    state.ones = 2;

    const restockDenominations = clone(testDenominations);
    restockDenominations.hundreds = 1;
    restockDenominations.ones = 2;

    const expectedState = clone(testDenominations);
    expectedState.hundreds = 4;
    expectedState.twenties = 2;
    expectedState.ones = 4;
    expect(service.adjustState(restockDenominations, state, 'restock')).toEqual(expectedState);
  });
});
