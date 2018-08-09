import { Injectable } from '@angular/core';
import { ActiveToast, ToastrService } from 'ngx-toastr';
import { APIError, APIErrorElement } from './api.service';

@Injectable()
export class NotificationService {

  constructor(private toastr: ToastrService) {
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

  formError(error: APIError): ActiveToast<any> {
    return this.error(`Missing fields: ${this.getApiErrorIdentifiers(error.data).join(', ')}`, error.message);
  }

  private getApiErrorIdentifiers(data: Array<APIErrorElement>): Array<string> {
    return data.map((error) => {
      return error.identifier;
    });
  }

}
