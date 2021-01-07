import { CurrencyPipe } from '@angular/common';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule, Store } from '@ngxs/store';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { SharedModule } from 'src/app/shared/shared.module';
import { AtmState } from 'src/app/store/state/atm.state';
import { NotifyState } from 'src/app/store/state/notify.state';
import { TransactionState } from 'src/app/store/state/transaction.state';

import { WithdrawComponent } from './withdraw.component';

describe('WithdrawComponent', () => {
  let component: WithdrawComponent;
  let fixture: ComponentFixture<WithdrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithdrawComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,

        MatCardModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatSnackBarModule,
        CurrencyMaskModule,

        SharedModule,

        NgxsModule.forRoot([
          AtmState,
          NotifyState,
          TransactionState
        ])
      ],
      providers: [
        CurrencyPipe
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create the form', () => {
    expect(component.form).toBeTruthy();
  });

  it('Should disable withdraw button when form amount is null', () => {
    component.form.get('amount')?.setValue(null);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('button').disabled).toBeTrue();
  });

  it('Should disable withdraw button when form amount is less than 1', () => {
    component.form.get('amount')?.setValue(0.50);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('button').disabled).toBeTrue();
  });

  it('Should enable withdraw button when form amount is greater than 1', () => {
    component.form.get('amount')?.setValue(5);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('button').disabled).toBeFalse();
  });

  it('Should submit the withdrawCash method when input is valid', fakeAsync(() => {
    component.form.get('amount')?.setValue(5);
    spyOn(component, 'withdrawCash');

    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    compiled.querySelector('button').click();

    tick();
    expect(component.withdrawCash).toHaveBeenCalled();
  }));

  it('Should not submit the withdrawCash method when input is invalid', fakeAsync(() => {
    component.form.get('amount')?.setValue(0.50);
    spyOn(component, 'withdrawCash');

    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    compiled.querySelector('button').click();
    tick();

    expect(component.withdrawCash).not.toHaveBeenCalled();
  }));
});
