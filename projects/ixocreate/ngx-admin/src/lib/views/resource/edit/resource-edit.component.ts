import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewAbstractComponent } from '../../../components/view.abstract.component';
import { AppDataService } from '../../../services/data/app-data.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NotificationService } from '../../../services/notification.service';
import { SchemaTransformService } from '../../../services/schema-transform.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { IxoConfirmModalComponent } from '../../../modals/ixo-confirm-modal/ixo-confirm-modal.component';
import { ConfirmModalData } from '../../../modals/ixo-confirm-modal/ixo-confirm-modal.component.model';
import { PageTitleService } from '../../../services/page-title.service';
import { ResourceConfig } from '../../../interfaces/config.interface';
import { ConfigService } from '../../../services/config.service';
import { FormHelper } from '../../../helpers/form.helper';

@Component({
  templateUrl: './resource-edit.component.html',
})
export class ResourceEditComponent extends ViewAbstractComponent implements OnInit {

  data$: Promise<any>;

  resourceKey: string;
  resourceId: string;
  resourceInfo: ResourceConfig;

  form: FormGroup = new FormGroup({});
  fields: FormlyFieldConfig[];
  loaded = false;

  aboveWidgetData$: Promise<any>;
  belowWidgetData$: Promise<any>;

  viewOnly = false;
  loading = false;

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected appData: AppDataService,
              protected notification: NotificationService,
              protected config: ConfigService,
              protected pageTitle: PageTitleService,
              protected schemaTransform: SchemaTransformService,
              protected modal: BsModalService) {
    super();
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.viewOnly = !!this.route.routeConfig.data.viewOnly;
      this.resourceKey = params.type || this.resourceKey;
      this.resourceId = params.id;
      this.resourceInfo = this.config.getResourceConfig(this.resourceKey);
      this.pageTitle.setPageTitle([{search: '{resource}', replace: this.resourceInfo.label}]);
      this.fields = this.resourceInfo.updateSchema ? this.schemaTransform.transformForm(this.resourceInfo.updateSchema) : [];
      if (this.viewOnly) {
        this.fields = FormHelper.setTemplateOption(this.fields, 'disabled', true);
      }
      this.data$ = this.appData.getResourceDetail(this.resourceKey, this.resourceId);
      this.aboveWidgetData$ = this.appData.getResourceWidgets(this.resourceKey, 'above', 'edit', this.resourceId);
      this.belowWidgetData$ = this.appData.getResourceWidgets(this.resourceKey, 'below', 'edit', this.resourceId);
    });
    setTimeout(() => {
      this.loaded = true;
    });
  }

  onSubmit(): void {
    if (this.form.valid === false) {
      this.notification.formErrors(this.form);
    } else {
      this.loading = true;
      this.appData.updateResource(this.resourceKey, this.resourceId, this.form.getRawValue()).then(() => {
        this.loading = false;
        this.notification.success(this.resourceInfo.label + ' successfully updated', 'Success');
      }).catch((error) => {
        this.loading = false;
        this.notification.apiError(error);
      });
    }
  }

  doDelete(): void {
    const initialState: ConfirmModalData = {
      title: 'Delete this ' + this.resourceInfo.label + '?',
      text: 'Do you really want to delete this ' + this.resourceInfo.label + '?',
      onConfirm: () => {
        this.appData.deleteResource(this.resourceKey, this.resourceId).then(() => {
          this.notification.success(this.resourceInfo.label + ' successfully deleted', 'Success');
          this.router.navigateByUrl('/resource/' + this.resourceKey);
        }).catch((error) => this.notification.apiError(error));
      },
    };
    this.modal.show(IxoConfirmModalComponent, {initialState});
  }

}
