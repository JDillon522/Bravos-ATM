import { CurrencyPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Cash } from 'src/app/core/models/cash';
import { ATMService } from 'src/app/core/service/atm/app.service';
import { Transaction } from '../../overview/models/transaction';
import { TransactionService } from '../../overview/service/transaction.service';
import { minQty } from '../shared/customValidators/minQty.ts/minQty';

@Component({
  selector: 'atm-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  public form: FormGroup = this.fb.group({
    amount: this.fb.control(null, Validators.compose([
      Validators.required,
      minQty(1)
    ]))
  });

  get amountControl(): FormControl {
    return this.form.get('amount') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private atmService: ATMService,
    private snackBar: MatSnackBar,
    private currencyPipe: CurrencyPipe,
    private transactionService: TransactionService
  ) { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public withdrawCash(): void {
    this.subscriptions.add(
      this.atmService.withdrawCash(this.amountControl.value).subscribe(res => {
        if ((res as Transaction).amount) {
          this.transactionService.addRecord(res as Transaction);

          const val = this.currencyPipe.transform(this.amountControl.value);
          const notification = this.snackBar.open(`Dispensed ${val}`, 'X', { duration: 3000 });
          this.subscriptions.add(
            notification.afterDismissed().subscribe(() => {
              this.amountControl.reset(null);
            })
          );
        } else {
          const notification = this.snackBar.open(`Insufficient Funds`, 'X', { duration: 3000 });
        }

      })
    );
  }

}
