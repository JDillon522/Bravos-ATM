import { TransactionRequest } from '../models/transaction';

export class RecordTransaction {
    static readonly type = '[TRANSACTION] Record a transaction';

    constructor(public payload: TransactionRequest) { }
}
