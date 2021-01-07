import { CurrencyPipe } from '@angular/common';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { AddCash, WithdrawCash } from '../actions/atm.actions';
import { AtmCash } from '../models/cash';
import { Transaction } from '../models/transaction';
import { AtmState } from '../state/atm.state';
import { TransactionState } from '../state/transaction.state';


describe('TransactionState', () => {
    let store: Store;

    const BASE_STATE: AtmCash = {
        hundreds: 10,
        fifties: 10,
        twenties: 10,
        tens: 10,
        fives: 10,
        ones: 10
    };

    const testDenominations: AtmCash = {
        hundreds: 1,
        fifties: 1,
        twenties: 1,
        tens: 1,
        fives: 1,
        ones: 1
    };

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [
                NgxsModule.forRoot([AtmState, TransactionState])
            ],
            providers: [
                CurrencyPipe
            ]
        });

        store = TestBed.inject(Store);
        store.reset({
            ...store.snapshot(),
            atm: {
                cash: BASE_STATE
            },
            transaction: {
                records: []
            }
        });
    });

    it('Creates a record after adding cash to the ATM', () => {
        store.dispatch(new AddCash(testDenominations));
        const feed: Transaction[] = store.selectSnapshot(state => state.transaction.records);

        expect(feed[0].adjustedCashOnHandAmount).toEqual(2046);
        expect(feed[0].amount).toEqual(186);
        expect(feed[0].type).toEqual('restock');
        expect(feed[0].denominations).toEqual(testDenominations);
    });

    it('Creates a record after withdrawing cash from the ATM', () => {
        store.dispatch(new WithdrawCash(100));

        const feed: Transaction[] = store.selectSnapshot(state => state.transaction.records);

        const withdrawDenominations: AtmCash = {
            hundreds: 1,
            fifties: 0,
            twenties: 0,
            tens: 0,
            fives: 0,
            ones: 0
        };

        expect(feed[0].adjustedCashOnHandAmount).toEqual(1760);
        expect(feed[0].amount).toEqual(100);
        expect(feed[0].type).toEqual('withdraw');
        expect(feed[0].denominations).toEqual(withdrawDenominations);
    });
});
