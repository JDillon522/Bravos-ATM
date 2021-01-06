export interface AtmCash {
    hundreds: number;
    fifties: number;
    twenties: number;
    tens: number;
    fives: number;
    ones: number;
}

const seedStartAmount: number = 10;
export const startingTotal: number = 1860;
export const cashOnHandSeed: AtmCash = {
  hundreds: seedStartAmount,
  fifties: seedStartAmount,
  twenties: seedStartAmount,
  tens: seedStartAmount,
  fives: seedStartAmount,
  ones: seedStartAmount
};

export type CashIndexes = 'hundreds' | 'fifties' | 'twenties' | 'tens' | 'fives' | 'ones';
export const CashValuesByIndex: AtmCash = {
  hundreds: 100,
  fifties: 50,
  twenties: 20,
  tens: 10,
  fives: 5,
  ones: 1
};