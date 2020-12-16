import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { minQty } from '../shared/customValidators/minQty.ts/minQty';

@Component({
  selector: 'atm-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent implements OnInit {

  public form: FormGroup = this.fb.group({
    amount: this.fb.control(null, Validators.compose([
      Validators.required,
      minQty(1)
    ]))
  });

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

  }

}
