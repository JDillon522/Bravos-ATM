import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ATMService } from 'src/app/core/service/atm/app.service';
import { AddCash, WithdrawCash } from '../actions/atm.actions';
import { AtmCash, cashOnHandSeed } from '../models/cash';

export interface AtmStateModel {
    cash: AtmCash;
}

@State<AtmStateModel>({
    name: 'atm',
    defaults: {
        cash: cashOnHandSeed
    }
})
@Injectable({
    providedIn: 'root'
})
export class AtmState {

    constructor(
        private atmService: ATMService
    ) {

    }
    @Selector()
    static getAtmDenom(state: AtmStateModel): AtmCash {
        return state.cash;
    }

    @Selector()
    static getCashOnHand(state: AtmStateModel): number {
        let total = 0;
        total += state.cash.hundreds * 100;
        total += state.cash.fifties * 50;
        total += state.cash.twenties * 20;
        total += state.cash.tens * 10;
        total += state.cash.fives * 5;
        total += state.cash.ones;

        return total;
    }

    @Action(AddCash)
    public addCash({ getState, patchState }: StateContext<AtmStateModel>, { payload }: AddCash): void {
        const state = getState().cash;
        patchState({
            cash: {
                hundreds: state.hundreds + payload.hundreds,
                fifties: state.fifties + payload.fifties,
                twenties: state.twenties + payload.twenties,
                tens: state.tens + payload.tens,
                fives: state.fives + payload.fives,
                ones: state.ones + payload.ones
            }
        });
    }

    @Action(WithdrawCash)
    public withdrawCash({ getState, patchState }: StateContext<AtmStateModel>, { payload }: WithdrawCash): void {
        const state = getState().cash;
        const cashByDenominations: AtmCash = this.atmService.calculateDenomination(payload);

        patchState({
            cash: {
                hundreds: state.hundreds - cashByDenominations.hundreds,
                fifties: state.fifties - cashByDenominations.fifties,
                twenties: state.twenties - cashByDenominations.twenties,
                tens: state.tens - cashByDenominations.tens,
                fives: state.fives - cashByDenominations.fives,
                ones: state.ones - cashByDenominations.ones
            }
        });
    }
}
