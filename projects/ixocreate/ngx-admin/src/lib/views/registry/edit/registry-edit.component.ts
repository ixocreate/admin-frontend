import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewAbstractComponent } from '../../../components/view.abstract.component';
import { AppDataService } from '../../../services/data/app-data.service';
import { NotificationService } from '../../../services/notification.service';
import { SchemaTransformService } from '../../../services/schema-transform.service';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  templateUrl: './registry-edit.component.html',
})
export class RegistryEditComponent extends ViewAbstractComponent implements OnInit {

  data$: Promise<any>;

  registryId: string;

  form: FormGroup = new FormGroup({});
  fields: FormlyFieldConfig[];

  loading = false;

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected appData: AppDataService,
              protected notification: NotificationService,
              protected schemaTransform: SchemaTransformService,
              protected modal: BsModalService) {
    super();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.registryId = params.id;
      this.data$ = this.appData.getRegistryDetail(this.registryId);
    });

    this.appData.getRegistryDetail(this.registryId).then((data: any) => {
      this.fields = data.schema ? this.schemaTransform.transformForm(data.schema) : [];
    });
  }

  onSubmit(): void {
    if (this.form.valid === false) {
      this.notification.formErrors(this.form);
    } else {
      this.loading = true;
      this.appData.updateRegistry(this.registryId, this.form.getRawValue()).then(() => {
        this.loading = false;
        this.notification.success('Entry successfully updated', 'Success');
      }).catch((error) => {
        this.loading = false;
        this.notification.apiError(error);
      });
    }
  }
}
