import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AccountDataService } from '../../services/data/account-data.service';
import { NotificationService } from '../../services/notification.service';
import { User } from '../../interfaces/user.interface';
import { ViewAbstractComponent } from '../../components/view.abstract.component';

@Component({
  templateUrl: './account.component.html',
})
export class AccountComponent extends ViewAbstractComponent {
  account: User;

  passwordForm: FormGroup = new FormGroup({});
  passwordFormOptions: FormlyFormOptions = {};
  passwordFormFields: FormlyFieldConfig[] = [
    {
      key: 'passwordOld',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: 'Enter your current password',
        placeholder: 'Enter your current password',
        required: true,
      },
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: 'New password',
        placeholder: 'New password',
        required: true,
      },
    },
    {
      key: 'passwordRepeat',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: 'Repeat password',
        placeholder: 'Repeat password',
        required: true,
      },
    },
  ];

  emailForm: FormGroup = new FormGroup({});
  emailFormOptions: FormlyFormOptions = {};
  emailFormFields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        type: 'email',
        label: 'New email address',
        placeholder: 'New email address',
        required: true,
      },
    },
    {
      key: 'emailRepeat',
      type: 'input',
      templateOptions: {
        type: 'email',
        label: 'Repeat email address',
        placeholder: 'Repeat email address',
        required: true,
      },
    },
  ];

  constructor(protected notification: NotificationService,
              public accountData: AccountDataService) {
    super();
  }

  onSubmitEmail() {
    const data = this.emailForm.getRawValue();
    this.accountData.updateEmail(data.email, data.emailRepeat).then(() => {
      this.emailFormOptions.resetModel();
      this.notification.success('The email was successfully updated', 'Success');
    }).catch((error) => this.notification.apiError(error));
  }

  onSubmitPassword() {
    const data = this.passwordForm.getRawValue();
    this.accountData.updatePassword(data.passwordOld, data.password, data.passwordRepeat).then(() => {
      this.passwordFormOptions.resetModel();
      this.notification.success('The password was successfully updated', 'Success');
    }).catch((error) => this.notification.apiError(error));
  }
}
