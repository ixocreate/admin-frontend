import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  data: any = {};

  queryParams: any;

  aboveWidgetData$: Promise<any>;
  belowWidgetData$: Promise<any>;

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
      this.fields = this.resourceInfo.createSchema ? this.schemaTransform.transformForm(this.resourceInfo.createSchema) : [];
      this.aboveWidgetData$ = this.appData.getResourceWidgets(this.resourceKey, 'above', 'create');
      this.belowWidgetData$ = this.appData.getResourceWidgets(this.resourceKey, 'below', 'create');
      this.appData.getResourceDefaultValue(this.resourceKey).then((response) => {
        for (const key of Object.keys(response.item)) {
          if (this.form && this.form.controls && this.form.controls[key]) {
            this.form.controls[key].setValue(response.item[key]);
          } else {
            this.data[key] = response.item[key];
          }
        }
        this.updateQueryParamsPreFill();
      });
    });

    this.route.queryParams.subscribe((params: Params) => {
      this.queryParams = params;
      this.updateQueryParamsPreFill();
    });
  }

  updateQueryParamsPreFill() {
    if (!this.queryParams) {
      return;
    }
    for (let key of Object.keys(this.queryParams)) {
      let value = this.queryParams[key];
      if (key.indexOf('[]') > -1) {
        key = key.replace('[]', '');
        if (!Array.isArray(value)) {
          value = [value];
        }
      }
      if (value === 'true') {
        value = true;
      } else if (value === 'false') {
        value = false;
      }
      if (this.form && this.form.controls && this.form.controls[key]) {
        this.form.controls[key].setValue(value);
      } else {
        this.data[key] = value;
      }
    }
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
