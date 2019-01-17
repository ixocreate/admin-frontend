import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AccountDataService } from '../../services/data/account-data.service';
import { NotificationService } from '../../services/notification.service';
import { User } from '../../interfaces/user.interface';
import { ViewAbstractComponent } from '../../components/view.abstract.component';
import {AppDataService} from "../../services/data/app-data.service";
import {SchemaTransformService} from "../../services/schema-transform.service";

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

  additionalForm: FormGroup = new FormGroup({});
  additionalFields: FormlyFieldConfig[];

  constructor(protected notification: NotificationService,
              protected appData: AppDataService,
              protected schemaTransform: SchemaTransformService,
              public accountData: AccountDataService) {
    super();
  }

  ngOnInit() {
    this.accountData.getAccountConfig().then((data: any) => {
      this.additionalFields = data.accountAttributesSchema ?  this.schemaTransform.transformForm(data.accountAttributesSchema) : [];
    });
  }

  onSubmitAttributes() {
    const data = this.additionalForm.getRawValue();
    if (this.additionalForm.valid === false) {
      this.notification.formErrors(this.additionalForm);
    } else {
      this.accountData.updateAccountAttributes(data).then(() => {
        this.notification.success('successfully updated', 'Success');
      }).catch((error) => this.notification.apiError(error));
    }
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
