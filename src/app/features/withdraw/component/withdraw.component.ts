import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { DoesntExceedOnHand } from 'src/app/shared/customValidators/doesntExceedOnHand/doesntExceedOnHand';
import { minQty } from 'src/app/shared/customValidators/minQty.ts/minQty';
import { WithdrawCash } from 'src/app/store/actions/atm.actions';

@Component({
  selector: 'atm-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent implements OnInit {
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
    private doesntExceedOnHand: DoesntExceedOnHand,
    private store: Store
  ) { }

  ngOnInit(): void {

  }

  public withdrawCash(): void {
    this.store.dispatch(new WithdrawCash(this.amountControl.value));
    this.amountControl.reset(null);

    // TODO handle insufficent funds
  }

  public addValue(amount: string): void {
    const val = (this.amountControl.value || 0).toString();
    this.amountControl.setValue(parseInt(val + amount, 10));
    this.amountControl.markAsTouched();
  }

  public reduceValue(): void {
    const val = this.amountControl.value.toString();

    if (val.length > 1) {
      this.amountControl.setValue(parseInt(val.slice(0, -1), 10));

    } else {
      this.amountControl.reset(null);
    }

  }

}
