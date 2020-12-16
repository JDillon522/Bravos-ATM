import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogPipe } from './pipes/log.pipe';



@NgModule({
  declarations: [
    LogPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LogPipe
  ]
})
export class SharedModule { }
