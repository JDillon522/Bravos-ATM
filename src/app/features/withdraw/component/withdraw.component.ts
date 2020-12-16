import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ATMService } from 'src/app/core/service/app.service';
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
    private atmService: ATMService
  ) { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public withdrawCash(): void {
    this.subscriptions.add(
      this.atmService.withdrawCash(this.amountControl.value).subscribe(res => {

      })
    );
  }

}
