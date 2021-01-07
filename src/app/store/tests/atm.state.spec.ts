import { CurrencyPipe } from '@angular/common';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { AddCash, WithdrawCash } from '../actions/atm.actions';
import { AtmCash } from '../models/cash';
import { AtmState } from '../state/atm.state';


describe('AtmState', () => {
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
                NgxsModule.forRoot([AtmState])
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
            }
        });
    });

    it('Should select ATM Cash Denominations', () => {
        const cash = store.selectSnapshot(AtmState.getAtmDenom);
        expect(cash).toEqual(BASE_STATE);
    });


    it('Should select the cash on hand with BASE_STATE', () => {
        const cash = store.selectSnapshot(AtmState.getCashOnHand);
        expect(cash).toEqual(1860);
    });

    it('Should select the cash on hand with additional testDenominations', () => {
        store.dispatch(new AddCash(testDenominations));
        const cash = store.selectSnapshot(AtmState.getCashOnHand);
        expect(cash).toEqual(2046);
    });

    it('Should select the cash on hand after withdraw', () => {
        store.dispatch(new WithdrawCash(100));
        const cash = store.selectSnapshot(AtmState.getCashOnHand);
        expect(cash).toEqual(1760);
    });

    it('Adds cash to ATM', () => {
        store.dispatch(new AddCash(testDenominations));
        const testState: AtmCash = {
            hundreds: 11,
            fifties: 11,
            twenties: 11,
            tens: 11,
            fives: 11,
            ones: 11
        };
        const feed = store.selectSnapshot(state => state.atm.cash);

        expect(feed).toEqual(testState);
    });

    it('Withdraws cash from ATM', () => {
        store.dispatch(new WithdrawCash(100));
        const cash = store.selectSnapshot(AtmState.getCashOnHand);
        expect(cash).toEqual(1760);
        const denoms = store.selectSnapshot(AtmState.getAtmDenom);
        const testState: AtmCash = {
            hundreds: 9,
            fifties: 10,
            twenties: 10,
            tens: 10,
            fives: 10,
            ones: 10
        };
        expect(denoms).toEqual(testState);
    });
});
