import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { Transaction } from 'src/app/store/models/transaction';

@Component({
  selector: 'atm-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  public transactionData: MatTableDataSource<Transaction> = new MatTableDataSource<Transaction>();
  public recordsColumns: string[] = ['time', 'type', 'amount', 'adjustedCashOnHandAmount'];

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
