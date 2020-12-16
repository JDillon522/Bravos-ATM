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
      hundreds: 0,
      fifties: 0,
      twenties: 1,
      tens: 1,
      fives: 1,
      ones: 0
    }
  },
  {
    time: new Date().toDateString(),
    type: 'withdrawal',
    amount: 63,
    denominations: {
      hundreds: 0,
      fifties: 1,
      twenties: 0,
      tens: 1,
      fives: 0,
      ones: 3
    }
  },
  {
    time: new Date().toDateString(),
    type: 'restock',
    amount: 128,
    denominations: {
      hundreds: 0,
      fifties: 2,
      twenties: 0,
      tens: 2,
      fives: 0,
      ones: 8
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
