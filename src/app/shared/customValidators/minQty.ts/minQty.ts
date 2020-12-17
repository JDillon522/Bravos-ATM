import { ValidatorFn, AbstractControl } from '@angular/forms';
import { isNumber, isNull } from 'lodash';

// Validators.min() didnt seem to work.
export function minQty(min: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (isNull(control.value) || !isNumber(control.value)) {
      return null;
    }

    return  control.value < min ? { min: true } : null;
  };
}


