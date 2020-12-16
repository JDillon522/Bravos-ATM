import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { Transaction } from '../models/transaction';

import { TransactionService } from './transaction.service';

export const dummyTransactions: Transaction[] = [
  {
    time: new Date().toDateString(),
    amount: 35,
    type: 'withdrawal',
    denominations: {
      100: 0,
      50: 0,
      20: 1,
      10: 1,
      5: 1,
      1: 0
    }
  },
  {
    time: new Date().toDateString(),
    type: 'withdrawal',
    amount: 63,
    denominations: {
      100: 0,
      50: 1,
      20: 0,
      10: 1,
      5: 0,
      1: 3
    }
  },
  {
    time: new Date().toDateString(),
    type: 'restock',
    amount: 128,
    denominations: {
      100: 0,
      50: 2,
      20: 0,
      10: 2,
      5: 0,
      1: 8
    }
  }
];

describe('OverviewService', () => {
  let service: TransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionService);
  });

  it('Should have transactionRecords$', () => {
    expect(service.transactionRecords$).toBeTruthy();
  });

  it('Should update transactionRecords$ with data', (done) => {
    service.transactionRecords$.next(dummyTransactions);
    service.transactionRecords$.subscribe(records => {
      expect(records.length).toEqual(dummyTransactions.length);
      expect(records[0].amount).toEqual(dummyTransactions[0].amount);
      done();
    });
  });
});
