import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Cash } from 'src/app/core/models/cash';
import { ATMService } from 'src/app/core/service/atm/app.service';

@Component({
  selector: 'atm-restock',
  templateUrl: './restock.component.html',
  styleUrls: ['./restock.component.scss']
})
export class RestockComponent implements OnInit, OnDestroy {
  public subscriptions: Subscription = new Subscription();

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

  constructor(
    private fb: FormBuilder,
    private atmService: ATMService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public restockCash(): void {
    const cash: Cash = {
      ...this.form.getRawValue(),
      total: this.totalNewCash
    };


  }
}
