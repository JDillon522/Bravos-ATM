import { CurrencyPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { ATMService } from 'src/app/core/service/atm/app.service';
import { DoesntExceedOnHand } from 'src/app/shared/customValidators/doesntExceedOnHand/doesntExceedOnHand';
import { minQty } from 'src/app/shared/customValidators/minQty.ts/minQty';
import { WithdrawCash } from 'src/app/store/actions/atm.actions';
import { Transaction } from '../../overview/models/transaction';
import { TransactionService } from '../../overview/service/transaction.service';

@Component({
  selector: 'atm-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  public form: FormGroup = this.fb.group({
    amount: this.fb.control(null,
                            Validators.compose([
                              Validators.required,
                              minQty(1)
                            ]),
                            this.doesntExceedOnHand.validate.bind(this.doesntExceedOnHand)
                          )
  });

  get amountControl(): FormControl {
    return this.form.get('amount') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private atmService: ATMService,
    private snackBar: MatSnackBar,
    private currencyPipe: CurrencyPipe,
    private transactionService: TransactionService,
    private doesntExceedOnHand: DoesntExceedOnHand,
    private store: Store
  ) { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public withdrawCash(): void {
    this.store.dispatch(new WithdrawCash(this.amountControl.value));
  }

}
