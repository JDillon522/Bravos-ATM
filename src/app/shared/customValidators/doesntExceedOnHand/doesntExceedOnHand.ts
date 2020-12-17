import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, first, map } from 'rxjs/operators';
import { ATMService } from 'src/app/core/service/atm/app.service';


@Injectable({ providedIn: 'root' })
export class DoesntExceedOnHand implements AsyncValidator {
  constructor(private atmServicwe: ATMService) {}

  validate(ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.atmServicwe.totalCashOnHand$.pipe(
        first(),
        map(total => (ctrl.value > total ? { exceedsOnHand: true } : null)),
        catchError(() => of(null))
    );
  }
}
