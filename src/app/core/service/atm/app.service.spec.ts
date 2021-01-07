import { TestBed } from '@angular/core/testing';
import { ATMService } from './app.service';
import { clone } from 'lodash';
import { AtmCash } from 'src/app/store/models/cash';

describe('AppService', () => {
  let service: ATMService;
  const testDenominations: AtmCash = {
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

});
