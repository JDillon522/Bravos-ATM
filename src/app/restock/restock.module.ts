import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestockRoutingModule } from './restock-routing.module';
import { RestockComponent } from './restock.component';


@NgModule({
  declarations: [RestockComponent],
  imports: [
    CommonModule,
    RestockRoutingModule
  ],
  exports: [RestockComponent]
})
export class RestockModule { }
