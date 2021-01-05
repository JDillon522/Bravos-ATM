import { AtmCash } from '../models/cash';


export class AddCash {
    static readonly type = '[ATM] Add Cash to the ATM';

    constructor(public payload: AtmCash) { }
}

export class WithdrawCash {
    static readonly type = '[ATM] Withdraw Cash from the ATM';

    constructor(public payload: AtmCash) { }
}
