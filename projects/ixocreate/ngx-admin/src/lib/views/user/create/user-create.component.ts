import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewAbstractComponent } from '../../../components/view.abstract.component';
import { AppDataService } from '../../../services/data/app-data.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NotificationService } from '../../../services/notification.service';
import { SchemaTransformService } from '../../../services/schema-transform.service';
import { ConfigService } from '../../../services/config.service';

@Component({
  templateUrl: './user-create.component.html',
})
export class UserCreateComponent extends ViewAbstractComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  fields: FormlyFieldConfig[];

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected appData: AppDataService,
              protected notification: NotificationService,
              protected config: ConfigService,
              protected schemaTransform: SchemaTransformService) {
    super();
  }

  ngOnInit() {
    this.appData.getUserConfig().then((data: any) => {
      this.fields = data.create ? this.schemaTransform.transformForm(data.create) : [];
    });
  }

  onSubmit(): void {
    if (this.form.valid === false) {
      this.notification.formErrors(this.form);
    } else {
      this.appData.createUser(this.form.getRawValue()).then((response) => {
        this.notification.success('User successfully created', 'Success');
        this.router.navigateByUrl('/admin-user/' + response.id + '/edit');
      }).catch((error) => this.notification.apiError(error));
    }
  }
}
