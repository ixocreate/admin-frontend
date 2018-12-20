import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewAbstractComponent } from '../../../components/view.abstract.component';
import { AppDataService } from '../../../services/data/app-data.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NotificationService } from '../../../services/notification.service';
import { SchemaTransformService } from '../../../services/schema-transform.service';
import { PageTitleService } from '../../../services/page-title.service';
import { ConfigService } from '../../../services/config.service';
import { ResourceConfig } from '../../../interfaces/config.interface';

@Component({
  templateUrl: './resource-create.component.html',
})
export class ResourceCreateComponent extends ViewAbstractComponent implements OnInit {

  resourceKey: string;
  resourceInfo: ResourceConfig;

  form: FormGroup = new FormGroup({});
  fields: FormlyFieldConfig[];

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected appData: AppDataService,
              protected notification: NotificationService,
              protected config: ConfigService,
              protected pageTitle: PageTitleService,
              protected schemaTransform: SchemaTransformService) {
    super();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.resourceKey = params.type || this.resourceKey;
      this.resourceInfo = this.config.getResourceConfig(this.resourceKey);
      this.pageTitle.setPageTitle([{search: '{resource}', replace: this.resourceInfo.label}]);
      this.fields = this.resourceInfo.createSchema ?  this.schemaTransform.transformForm(this.resourceInfo.createSchema) : [];
    });
  }

  onSubmit(): void {
    if (this.form.valid === false) {
      this.notification.formErrors(this.form);
    } else {
      this.appData.createResource(this.resourceKey, this.form.getRawValue()).then((response) => {
        this.notification.success(this.resourceInfo.label + ' successfully created', 'Success');
        this.router.navigateByUrl('/resource/' + this.resourceKey + '/' + response.id + '/edit');
      }).catch((error) => this.notification.apiError(error));
    }
  }
}
