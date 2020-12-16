import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestockRoutingModule } from './restock-routing.module';
import { RestockComponent } from './component/restock.component';

import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [RestockComponent],
  imports: [
    CommonModule,
    RestockRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [RestockComponent]
})
export class RestockModule { }
