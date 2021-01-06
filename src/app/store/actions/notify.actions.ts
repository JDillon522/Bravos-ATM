export class SuccessMessage {
    static readonly type = '[NOTIFY] Send a success message';

    constructor(public payload: string) { }
}

export class ErrorMessage {
    static readonly type = '[NOTIFY] Send an error message';

    constructor(public payload: string) { }
}
