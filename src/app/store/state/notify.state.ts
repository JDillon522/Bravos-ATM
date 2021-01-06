import { CurrencyPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ATMService } from 'src/app/core/service/atm/app.service';
import { AddCash, WithdrawCash } from '../actions/atm.actions';
import { ErrorMessage, SuccessMessage } from '../actions/notify.actions';
import { AtmCash, cashOnHandSeed } from '../models/cash';

export interface NotifyStateModel {
    message: string;
}

@State<NotifyStateModel>({
    name: 'notify',
    defaults: {
        message: ''
    }
})
@Injectable({
    providedIn: 'root'
})
export class NotifyState {

    constructor(
        private snackBar: MatSnackBar,
        private currencyPipe: CurrencyPipe,
    ) { }

    @Action(SuccessMessage)
    public successMessage({ getState }: StateContext<NotifyStateModel>, { payload }: SuccessMessage ): void {
        const notification = this.snackBar.open(payload, 'X', { duration: 3000 });
    }

    @Action(ErrorMessage)
    public errorMessage({ getState }: StateContext<NotifyStateModel>, { payload }: ErrorMessage ): void {
        const notification = this.snackBar.open(payload, 'X', { duration: 3000 });
    }
}
