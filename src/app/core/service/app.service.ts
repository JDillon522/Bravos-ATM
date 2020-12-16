import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cash } from '../models/cash';

const seedStartAmount: number = 10;
const seed: Cash = {
  100: seedStartAmount,
  50: seedStartAmount,
  20: seedStartAmount,
  10: seedStartAmount,
  5: seedStartAmount,
  1: seedStartAmount
};

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public cashOnHand$: BehaviorSubject<Cash> = new BehaviorSubject<Cash>(seed);


  constructor() { }
}
