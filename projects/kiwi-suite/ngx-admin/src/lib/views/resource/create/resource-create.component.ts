import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewAbstractComponent } from '../../../components/view.abstract.component';
import { AppDataService } from '../../../services/data/app-data.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NotificationService } from '../../../services/notification.service';
import { SchemaTransformService } from '../../../services/schema-transform.service';

@Component({
  templateUrl: './resource-create.component.html',
})
export class ResourceCreateComponent extends ViewAbstractComponent implements OnInit {

  data$: Promise<any>;
  resourceKey: string;
  resourceName: string;

  form: FormGroup = new FormGroup({});
  fields: FormlyFieldConfig[];
  showButton = false;

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected appData: AppDataService,
              protected notification: NotificationService,
              protected schemaTransformService: SchemaTransformService) {
    super();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.resourceKey = params.type;
      this.data$ = this.appData.createResourceDetail(this.resourceKey).then((data) => {
        this.resourceName = data.label;
        data.schema = this.schemaTransformService.transformForm(data.schema);
        this.fields = data.schema ? data.schema : [];
        setTimeout(() => this.showButton = true);
        return data;
      });
    });
  }

  onSubmit(): void {
    if (this.form.valid === false) {
      this.notification.formErrors(this.form);
    } else {
      this.appData.createResource(this.resourceKey, this.form.getRawValue()).then((response) => {
        this.notification.success(this.resourceName + ' successfully created', 'Success');
        this.router.navigateByUrl('/resource/' + this.resourceKey + '/' + response.id + '/edit');
      }).catch((error) => this.notification.apiError(error));
    }
  }
}
