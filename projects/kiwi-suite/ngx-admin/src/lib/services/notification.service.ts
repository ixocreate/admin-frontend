import { Injectable } from '@angular/core';
import { ActiveToast, ToastrService } from 'ngx-toastr';
import { APIErrorElement } from './api.service';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { FormlyConfig } from '@ngx-formly/core';

@Injectable()
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
      return this.error(error.data.messages.join('<br/>'), error.data.title);
    }
    return null;
  }

  formErrors(form: FormGroup) {
    const errors: Array<string> = [];
    Object.keys(form.controls).forEach(key => {
      const control: AbstractControl = form.get(key);
      control.markAsTouched();
      const controlErrors: ValidationErrors = control.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          errors.push('"' + key + '": ' + (this.formlyConfig.messages[keyError] ? this.formlyConfig.messages[keyError] : keyError));
        });
      }
    });
    return this.error(errors.join('<br/>'), 'Form Error');
  }

}
