import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { patch, append } from '@ngxs/store/operators';
import { RecordTransaction } from '../actions/transaction.actions';
import { Transaction } from '../models/transaction';
import { AtmState } from './atm.state';

export interface TransactionStateModel {
    records: Transaction[];
}

@State<TransactionStateModel>({
    name: 'transaction',
    defaults: {
        records: []
    }
})
@Injectable({
    providedIn: 'root'
})
export class TransactionState {

    constructor(
        private store: Store
    ) { }

    @Selector()
    static getTransactions(state: TransactionStateModel): Transaction[] {
        return state.records;
    }

    @Action(RecordTransaction)
    public addRecord({ getState, setState }: StateContext<TransactionStateModel>, { payload }: RecordTransaction): void {
        const record: Transaction = {
                adjustedCashOnHandAmount: this.store.selectSnapshot(AtmState.getCashOnHand),
                time: new Date().toDateString(),
                ...payload
              };

        setState(
            patch({
                records: append([record])
            })
        );
    }
}
