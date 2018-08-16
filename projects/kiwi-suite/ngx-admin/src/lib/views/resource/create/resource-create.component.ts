import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewAbstractComponent } from '../../../components/view.abstract.component';
import { AppDataService } from '../../../services/data/app-data.service';
import { FormGroup, NgForm } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NotificationService } from '../../../services/notification.service';
import { SchemaTransformService } from '../../../services/schema-transform.service';

@Component({
  templateUrl: './resource-create.component.html',
})
export class ResourceCreateComponent extends ViewAbstractComponent implements OnInit {

  @ViewChild('f') formElement: NgForm;

  data$: Promise<any>;
  resourceKey: string;

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
      this.data$ = this.appData.createResourceDetail(params.type).then((data) => {
        data.schema = this.schemaTransformService.transformForm(data.schema);
        if (data.schema) {
          this.fields = data.schema;
        }
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
        this.notification.error('Data successfully created', 'Success');
        this.router.navigateByUrl('../' + response.id + '/edit');
      }).catch((error) => this.notification.apiError(error));
    }
  }
}
