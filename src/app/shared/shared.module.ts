import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogPipe } from './pipes/log.pipe';
import { NG_ASYNC_VALIDATORS } from '@angular/forms';
import { DoesntExceedOnHand } from './customValidators/doesntExceedOnHand/doesntExceedOnHand';



@NgModule({
  declarations: [
    LogPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LogPipe
  ],
  providers: [
    { provide: NG_ASYNC_VALIDATORS, useExisting: DoesntExceedOnHand, multi: true }
  ]
})
export class SharedModule { }
