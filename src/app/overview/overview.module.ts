import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverviewRoutingModule } from './overview-routing.module';
import { OverviewComponent } from './overview.component';
import { MatCardModule } from '@angular/material/card'; 

@NgModule({
  declarations: [OverviewComponent],
  imports: [
    CommonModule,
    OverviewRoutingModule,

    MatCardModule
  ],
  exports: [OverviewComponent]
})
export class OverviewModule { }
