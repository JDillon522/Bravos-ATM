import { fakeAsync, TestBed } from '@angular/core/testing';
import { Cash } from '../../models/cash';
import { ATMService, startingTotal } from './app.service';
import { clone } from 'lodash';

describe('AppService', () => {
  let service: ATMService;
  const testDenominations: Cash = {
    total: 0,
    adjustedCashOnHand: startingTotal,
    hundreds: 0,
    fifties: 0,
    twenties: 0,
    tens: 0,
    fives: 0,
    ones: 0
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ATMService);
  });

  it('Withdraw cash with valid input should return Observable<Cash | Error>', fakeAsync(() => {
    const denominations = clone(testDenominations);
    denominations.total = 50;
    denominations.fifties = 1;
    denominations.adjustedCashOnHand = startingTotal - 50;
    service.withdrawCash(50).subscribe(res => {
      expect(res).toEqual(denominations);
    });
  }));

  it('Calculates cash denomination breakdown correctly', () => {
    let denominations = clone(testDenominations);
    denominations.hundreds = 1;
    denominations.fifties = 1;
    denominations.total = 150;
    denominations.adjustedCashOnHand = startingTotal - 150;
    expect(service.calculateDenomination(150)).toEqual(denominations);

    denominations = clone(testDenominations);
    denominations.hundreds = 3;
    denominations.twenties = 2;
    denominations.ones = 2;
    denominations.total = 342;
    denominations.adjustedCashOnHand = startingTotal - 342;
    expect(service.calculateDenomination(342)).toEqual(denominations);

    denominations = clone(testDenominations);
    denominations.ones = 3;
    denominations.total = 3;
    denominations.adjustedCashOnHand = startingTotal - 3;
    expect(service.calculateDenomination(3)).toEqual(denominations);

    denominations = clone(testDenominations);
    denominations.twenties = 2;
    denominations.ones = 2;
    denominations.total = 42;
    denominations.adjustedCashOnHand = startingTotal - 42;
    expect(service.calculateDenomination(42)).toEqual(denominations);
  });

  it('Adjusts cash on hand state correctly when withdrawing cash', () => {
    const state = clone(testDenominations);
    state.hundreds = 3;
    state.twenties = 2;
    state.ones = 2;
    state.total = 342;
    state.adjustedCashOnHand = 342;

    const withdrawDenominations = clone(testDenominations);
    withdrawDenominations.hundreds = 1;
    withdrawDenominations.ones = 2;
    withdrawDenominations.total = 102;
    withdrawDenominations.adjustedCashOnHand = 102;

    const expectedState = clone(testDenominations);
    expectedState.hundreds = 2;
    expectedState.twenties = 2;
    expectedState.total = 240;
    expectedState.adjustedCashOnHand = 240;

    expect(service.adjustState(withdrawDenominations, state, 'withdraw')).toEqual(expectedState);
  });

  it('Adjusts cash on hand state correctly when restocking cash', () => {
    const state = clone(testDenominations);
    state.hundreds = 3;
    state.twenties = 2;
    state.ones = 2;
    state.total = 342;
    state.adjustedCashOnHand = 342;

    const restockDenominations = clone(testDenominations);
    restockDenominations.hundreds = 1;
    restockDenominations.ones = 2;
    restockDenominations.total = 102;
    restockDenominations.adjustedCashOnHand = 102;

    const expectedState = clone(testDenominations);
    expectedState.hundreds = 4;
    expectedState.twenties = 2;
    expectedState.ones = 4;
    expectedState.total = 444;
    expectedState.adjustedCashOnHand = 444;
    expect(service.adjustState(restockDenominations, state, 'restock')).toEqual(expectedState);
  });
});
