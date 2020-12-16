import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './component/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AppService } from './service/app.service';
import { TransactionService } from '../features/overview/service/transaction.service';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,

    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [
    AppService,
    TransactionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
