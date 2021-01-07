import { CurrencyPipe } from '@angular/common';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { AtmState } from 'src/app/store/state/atm.state';
import { NotifyState } from 'src/app/store/state/notify.state';
import { TransactionState } from 'src/app/store/state/transaction.state';

import { RestockComponent } from './restock.component';

describe('RestockComponent', () => {
  let component: RestockComponent;
  let fixture: ComponentFixture<RestockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RestockComponent
      ],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,

        MatCardModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatSnackBarModule,

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
    fixture = TestBed.createComponent(RestockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('ngOnDestroy - Should unsubscribe to subscriptions', () => {
    spyOn(component['subscriptions'], 'unsubscribe');
    component.ngOnDestroy();
    expect(component['subscriptions'].unsubscribe).toHaveBeenCalled();
  });

  it('Should create the form', () => {
    expect(component.form).toBeTruthy();
  });

  it('Should disable restock button when a form field is null', () => {
    component.form.get('hundreds')?.setValue(null);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('button').disabled).toBeTrue();
  });

  it('Should disable restock button when total new cash is $0.00', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('button').disabled).toBeTrue();
  });

  it('Should submit the restockCash method when the form is valid', fakeAsync(() => {
    component.form.get('hundreds')?.setValue(5);
    spyOn(component, 'restockCash');

    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    compiled.querySelector('button').click();

    tick();
    expect(component.restockCash).toHaveBeenCalled();
  }));

  it('Should not submit the restockCash method when form is invalid', fakeAsync(() => {
    component.form.setErrors({ required: true });
    spyOn(component, 'restockCash');

    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    compiled.querySelector('button').click();
    tick();

    expect(component.restockCash).not.toHaveBeenCalled();
  }));

  it('Should calculate and display the current restock amount', () => {
    component.form.setValue({
      hundreds: 1,
      fifties: 1,
      twenties: 1,
      tens: 1,
      fives: 1,
      ones: 1
    });

    expect(component.totalNewCash).toBe(186);
  });
});
