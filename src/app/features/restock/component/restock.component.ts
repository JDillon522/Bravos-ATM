import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { minQty } from 'src/app/shared/customValidators/minQty.ts/minQty';
import { AddCash } from 'src/app/store/actions/atm.actions';
import { AtmCash, CashIndexes, CashValuesByIndex } from 'src/app/store/models/cash';

@Component({
  selector: 'atm-restock',
  templateUrl: './restock.component.html',
  styleUrls: ['./restock.component.scss']
})
export class RestockComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();

  public form: FormGroup = this.fb.group({
    hundreds: this.fb.control(0, Validators.required),
    fifties: this.fb.control(0, Validators.required),
    twenties: this.fb.control(0, Validators.required),
    tens: this.fb.control(0, Validators.required),
    fives: this.fb.control(0, Validators.required),
    ones: this.fb.control(0, Validators.required)
  }, minQty(1));

  get totalNewCash(): number {
    let total = 0;
    const form = this.form.getRawValue();
    for (const key in form) {
      total += CashValuesByIndex[key as CashIndexes] * form[key];
    }

    return total;
  }
  public manualDisable: boolean = false;

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public restockCash(): void {
    const cash: AtmCash = {
      ...this.form.getRawValue()
    };

    this.store.dispatch(new AddCash(cash));
  }


}
