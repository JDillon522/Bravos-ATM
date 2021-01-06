import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Select } from '@ngxs/store';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, first, map } from 'rxjs/operators';
import { AtmState } from 'src/app/store/state/atm.state';


@Injectable({ providedIn: 'root' })
export class DoesntExceedOnHand implements AsyncValidator {
  constructor() {}

  @Select(AtmState.getCashOnHand) totalCashOnHand$!: Observable<number>;

  validate(ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

    return this.totalCashOnHand$.pipe(
        first(),
        map(total => (ctrl.value > total ? { exceedsOnHand: true } : null)),
        catchError(() => of(null))
    );
  }
}
