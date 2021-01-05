import { CurrencyPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { Cash } from 'src/app/core/models/cash';
import { ATMService } from 'src/app/core/service/atm/app.service';
import { Transaction } from '../../overview/models/transaction';
import { TransactionService } from '../../overview/service/transaction.service';

@Component({
  selector: 'atm-restock',
  templateUrl: './restock.component.html',
  styleUrls: ['./restock.component.scss']
})
export class RestockComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();

  public form: FormGroup = this.fb.group({
    100: this.fb.control(0, Validators.required),
    50: this.fb.control(0, Validators.required),
    20: this.fb.control(0, Validators.required),
    10: this.fb.control(0, Validators.required),
    5: this.fb.control(0, Validators.required),
    1: this.fb.control(0, Validators.required)
  });

  get totalNewCash(): number {
    let total = 0;
    const form = this.form.getRawValue();
    for (const key in form) {
      total += parseInt(key, 10) * form[key];
    }

    return total;
  }
  public manualDisable: boolean = false;

  constructor(
    private fb: FormBuilder,
    private atmService: ATMService,
    private transactionService: TransactionService,
    private currencyPipe: CurrencyPipe,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public restockCash(): void {
    const cash: Cash = {
      ...this.form.getRawValue(),
    };

    this.subscriptions.add(
      this.handleRestock(cash)
    );
  }

  // I split this out to try and handle tests better
  private handleRestock(cash: Cash): Subscription {
    console.log('CAsH', cash)
    return this.atmService.restockCash(cash, this.totalNewCash).subscribe(res => {
      if ((res as Transaction).amount) {
        this.transactionService.addRecord(res as Transaction);

        const val = this.currencyPipe.transform(this.totalNewCash);
        this.manualDisable = true;

        const notification = this.snackBar.open(`Restocked ATM with ${val}`, 'X', { duration: 3000 });
        this.subscriptions.add(
          notification.afterDismissed().subscribe(() => {
            this.form.reset({
              100: 0,
              50: 0,
              20: 0,
              10: 0,
              5: 0,
              1: 0
            });
            this.manualDisable = false;
          })
        );

      } else {
        const notification = this.snackBar.open(`Failed to restock ATM`, 'X', { duration: 3000 });
      }
    });
  }
}
