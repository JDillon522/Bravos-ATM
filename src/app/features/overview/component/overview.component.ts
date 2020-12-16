import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Transaction } from '../models/transaction';
import { TransactionService } from '../service/transaction.service';

@Component({
  selector: 'atm-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  public transactionData: MatTableDataSource<Transaction> = new MatTableDataSource<Transaction>();
  public recordsColumns: string[] = ['time', 'type', 'amount'];

  constructor(
    private transactionService: TransactionService
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.transactionService.transactionRecords$.subscribe(records => {
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
