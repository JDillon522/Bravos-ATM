import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WithdrawRoutingModule } from './withdraw-routing.module';
import { WithdrawComponent } from './withdraw.component';

import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [WithdrawComponent],
  imports: [
    CommonModule,
    WithdrawRoutingModule,

    MatCardModule
  ],
  exports: [WithdrawComponent]
})
export class WithdrawModule { }
