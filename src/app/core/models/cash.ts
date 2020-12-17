export interface Cash {
    total: number;
    hundreds: number;
    fifties: number;
    twenties: number;
    tens: number;
    fives: number;
    ones: number;
}

export type CashIndexes = 'hundreds' | 'fifties' | 'twenties' | 'tens' | 'fives' | 'ones';
export const CashValuesByIndex: Cash = {
    total: 0,
    hundreds: 100,
    fifties: 50,
    twenties: 20,
    tens: 10,
    fives: 5,
    ones: 1
};

