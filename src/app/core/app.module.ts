import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './component/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ATMService } from './service/atm/app.service';
import { TransactionService } from '../features/overview/service/transaction.service';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { AtmState } from '../store/state/atm.state';
import { NotifyState } from '../store/state/notify.state';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CurrencyPipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,

    NgxsModule.forRoot([
      AtmState,
      NotifyState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),

    MatToolbarModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [
    ATMService,
    TransactionService,
    CurrencyPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
