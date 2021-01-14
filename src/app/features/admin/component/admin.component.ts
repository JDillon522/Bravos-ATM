import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store, Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { AtmCash } from 'src/app/store/models/cash';
import { Transaction } from 'src/app/store/models/transaction';
import { AtmState } from 'src/app/store/state/atm.state';

@Component({
  selector: 'atm-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  public transactionData: MatTableDataSource<Transaction> = new MatTableDataSource<Transaction>();
  public recordsColumns: string[] = ['time', 'type', 'amount', 'adjustedCashOnHandAmount'];

  @Select(AtmState.getAtmDenom) public denomOnHand$!: Observable<AtmCash>;
  @Select(AtmState.getCashOnHand) public cashOnHand$!: Observable<number>;

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.store.select(state => state.transaction.records).subscribe(records => {
        if (records) {
          this.transactionData.data = records;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
