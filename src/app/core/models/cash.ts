export interface Cash {
    hundreds: number;
    fifties: number;
    twenties: number;
    tens: number;
    fives: number;
    ones: number;
}

export type CashIndexs = 'hundreds' | 'fifties' | 'twenties' | 'tens' | 'fives' | 'ones';
export const CashValuesByIndex: Cash = {
    hundreds: 100,
    fifties: 50,
    twenties: 20,
    tens: 10,
    fives: 5,
    ones: 1
}

