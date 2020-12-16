import { fakeAsync, TestBed } from '@angular/core/testing';
import { Cash } from '../models/cash';
import { ATMService } from './app.service';
import { clone } from 'lodash';

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

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ATMService);
  });

  it('Withdraw cash with valid input should return Observable<true>', fakeAsync(() => {
    service.withdrawCash(50).subscribe(res => {
      expect(res).toBeTrue();
    });
  }));

  it('Calculates cash denomination breakdown correctly', () => {
    let denominations = clone(testDenominations);
    denominations.hundreds = 1;
    denominations.fifties = 1;
    expect(service.calculateDenomination(150)).toEqual(denominations);

    denominations = clone(testDenominations);
    denominations.hundreds = 3;
    denominations.twenties = 2;
    denominations.ones = 2;
    expect(service.calculateDenomination(342)).toEqual(denominations);

    denominations = clone(testDenominations);
    denominations.ones = 3;
    expect(service.calculateDenomination(3)).toEqual(denominations);

    denominations = clone(testDenominations);
    denominations.twenties = 2;
    denominations.ones = 2;
    expect(service.calculateDenomination(42)).toEqual(denominations);
  });
});
