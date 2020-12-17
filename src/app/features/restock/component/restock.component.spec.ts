import { CurrencyPipe } from '@angular/common';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
        MatSnackBarModule
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

  it('Should create the form', () => {
    expect(component.form).toBeTruthy();
  });

  it('Should disable restock button when a form field is null', () => {
    component.form.get('100')?.setValue(null);
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
    component.form.get('100')?.setValue(5);
    spyOn(component, 'restockCash');

    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    compiled.querySelector('button').click();

    tick();
    expect(component.restockCash).toHaveBeenCalled();
  }));

  it('Should not submit the restockCash method when form is invalid', fakeAsync(() => {
    spyOn(component, 'restockCash');

    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    compiled.querySelector('button').click();
    tick();

    expect(component.restockCash).not.toHaveBeenCalled();
  }));
});
