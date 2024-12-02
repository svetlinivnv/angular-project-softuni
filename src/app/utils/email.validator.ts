import { ValidatorFn } from '@angular/forms';

export function emailValidator(): ValidatorFn {
  const regExp = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);

  return (control) => {
    const isValid = control.value === '' || regExp.test(control.value);
    return isValid ? null : { emailValidator: true };
  };
}
