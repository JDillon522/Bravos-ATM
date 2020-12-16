import { FormControl } from '@angular/forms';
import { minQty } from './minQty';

describe('Custom Validator: minQty', () => {
    const control = new FormControl(null);

    it('Should return null when control value is null', () => {
        const validator = minQty(1);
        expect(validator(control)).toBeNull();
    });

    it('Should return true when control value is 0.50 and qty is 1', () => {
        const validator = minQty(1);
        control.setValue(0.50);
        expect(validator(control)).toEqual({ min: true });
    });

    it('Should return null when control value is 1,5, or 500 and qty is 1', () => {
        const validator = minQty(1);
        control.setValue(1);
        expect(validator(control)).toEqual(null);

        control.setValue(5);
        expect(validator(control)).toEqual(null);

        control.setValue(500);
        expect(validator(control)).toEqual(null);
    });
});
