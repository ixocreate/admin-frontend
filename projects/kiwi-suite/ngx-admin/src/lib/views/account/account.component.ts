import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { AccountDataService } from '../../services/data/account-data.service';
import { NotificationService } from '../../services/notification.service';
import { User } from '../../interfaces/user.interface';

@Component({
  templateUrl: './account.component.html',
})
export class AccountComponent {
  account: User;

  passwordForm: FormGroup;
  passwordFormFields: FormlyFieldConfig[];
  passwordFormModel = {password: '', passwordRepeat: '', passwordOld: ''};

  emailForm: FormGroup;
  emailFormFields: FormlyFieldConfig[];
  emailFormModel = {email: '', emailRepeat: ''};

  constructor(protected notification: NotificationService,
              protected accountData: AccountDataService) {
    this.initForm();
  }

  protected initModel() {
    /*
    this.dataService.user$.pipe(takeUntil(this.destroyed$))
      .subscribe(user => {
        if (!user) {
          return;
        }
        this.account = user;
        this.initForm();
      });
      */
  }

  initForm() {
    this.emailForm = new FormGroup({});
    this.emailFormFields = [
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

    this.passwordForm = new FormGroup({});
    this.passwordFormFields = [
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
  }

  onSubmitEmail() {
    /*
      this.accountData.updateEmail(this.account, this.emailForm.getRawValue())
          .subscribe(() => {
              this.notification.success('The email was successfully updated ', 'Success');
          }, () => {
              this.notification.error('There was an error in updating the email', 'Error');
          });
          */
  }

  onSubmitPassword() {
    /*
      this.accountData.updatePassword(this.account, this.passwordForm.getRawValue())
          .subscribe(() => {
              this.notification.success('The password was successfully updated ', 'Success');
          }, () => {
              this.notification.error('There was an error in updating the password', 'Error');
          });
          */
  }
}
