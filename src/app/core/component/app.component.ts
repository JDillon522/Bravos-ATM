import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cash } from '../models/cash';
import { ATMService, cashOnHandSeed } from '../service/atm/app.service';

@Component({
  selector: 'atm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  public denomOnHand: Cash = cashOnHandSeed;
  public cashOnHand: number = 0;

  constructor(private atmService: ATMService) {
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.atmService.denominationsOnHand$.subscribe(denom => this.denomOnHand = denom)
    );
    this.subscriptions.add(
      this.atmService.totalCashOnHand$.subscribe(cash => this.cashOnHand = cash)
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
