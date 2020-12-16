import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestockRoutingModule } from './restock-routing.module';
import { RestockComponent } from './component/restock.component';

import { MatCardModule } from '@angular/material/card';
@NgModule({
  declarations: [RestockComponent],
  imports: [
    CommonModule,
    RestockRoutingModule,

    MatCardModule
  ],
  exports: [RestockComponent]
})
export class RestockModule { }
