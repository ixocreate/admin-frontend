import { Injectable } from '@angular/core';
import { ActiveToast, ToastrService } from 'ngx-toastr';
import { APIErrorElement } from './api.service';

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

  apiError(error: APIErrorElement): ActiveToast<any> {
    if (error && error.data) {
      return this.error(error.data.messages.join('<br/>'), error.data.title);
    }
    return null;
  }

}
