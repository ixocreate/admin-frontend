import { AbstractControl, FormControl } from '@angular/forms';

export class CustomValidators {

  /**
   * Usage:
   *
   * this.formBuilder.group({
   *   password: ['', Validators.required],
   *   repeat_password: [''],
   * }, {
   *   validator: CustomValidators.Match('password', 'repeat_password'),
   * });
   */
  static Match(firstControlName: string, secondControlName: string) {
    return (AC: AbstractControl) => {
      const firstControlValue = AC.get(firstControlName).value; // to get value in input tag
      const secondControlValue = AC.get(secondControlName).value; // to get value in input tag
      if (firstControlValue !== secondControlValue) {
        AC.get(secondControlName).setErrors({MatchFields: true});
      } else {
        AC.get(secondControlName).setErrors(null);
      }
    };
  }

  /**
   * Usage:
   *
   * this.formBuilder.group({
   *   checkbox_name: ['', CustomValidators.isChecked],
   * });
   */
  static isChecked(control: FormControl): any {
    if (control.value !== true) {
      return {notChecked: true};
    }
    return null;
  }

  static quillRequired(control: FormControl): any {
    if (control.value.html === null || control.value.html === '') {
      return {required: true};
    }
    return null;
  }

}
