import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { RestockRoutingModule } from './restock-routing.module';
import { RestockComponent } from './component/restock.component';

import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
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
    MatButtonModule,
    MatSnackBarModule
  ],
  exports: [RestockComponent],
  providers: [
    CurrencyPipe
  ]
})
export class RestockModule { }
