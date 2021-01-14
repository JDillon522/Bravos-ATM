import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { WithdrawCash } from 'src/app/store/actions/atm.actions';
import { AtmState } from 'src/app/store/state/atm.state';
import { Transaction } from '../../../store/models/transaction';

@Component({
  selector: 'atm-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  public quickCashAmount: number = 70;
  public userName: string = 'Random User Name';
  @Select(AtmState.getCashOnHand) public cashOnHand$!: Observable<number>;

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {

  }

  public quickCash(): void {
    this.store.dispatch(new WithdrawCash(this.quickCashAmount));
  }
}
