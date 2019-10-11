import { Injectable } from '@angular/core';
import { ActiveToast, ToastrService } from 'ngx-toastr';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { FormlyConfig } from '@ngx-formly/core';
import { APIErrorElement } from '../interfaces/api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService,
              private formlyConfig: FormlyConfig) {
  }

  warning(message: string, title?: string): ActiveToast<any> {
    return this.toastr.warning(message, title);
  }

  info(message: string, title?: string): ActiveToast<any> {
    return this.toastr.info(message, title);
  }

  success(message: string, title?: string): ActiveToast<any> {
    return this.toastr.success(message, title);
  }

  error(message: string, title?: string): ActiveToast<any> {
    return this.toastr.error(message, title);
  }

  apiError(error: APIErrorElement): ActiveToast<any> {
    if (error && error.data) {
      // re-log for debugging convenience
      /**
       * TODO: translate error.code through i18n service (tbd)
       */
      return this.error(error.data.messages.join('<br/>'), error.data.title);
    }
    return null;
  }

  formErrors(form: FormGroup) {
    const errors: string[] = this.parseControlErrors([], form.controls, form);
    return this.error(errors.join('<br/>'), 'Form Error');
  }

  private parseControlErrors(errors: string[], controls: AbstractControl[] | { [key: string]: AbstractControl }, form: FormGroup): string[] {
    Object.keys(controls).forEach((key) => {
      const control: any = form.get(key);
      if (control.controls) {
        return errors.concat(this.parseControlErrors(errors, control.controls, control));
      }
      control.markAsTouched();
      const controlErrors: ValidationErrors = control.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((keyError) => {
          errors.push('"' + key + '": ' + (this.formlyConfig.messages[keyError] ? this.formlyConfig.messages[keyError] : keyError));
        });
      }
    });
    return errors;
  }

}
