import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewAbstractComponent } from '../../../components/view.abstract.component';
import { AppDataService } from '../../../services/data/app-data.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NotificationService } from '../../../services/notification.service';
import { SchemaTransformService } from '../../../services/schema-transform.service';
import { BsModalService } from 'ngx-bootstrap';
import { KiwiConfirmModalComponent } from '../../../components/kiwi-confirm-modal/kiwi-confirm-modal.component';
import { ConfirmModalData } from '../../../interfaces/confirm-modal-data.interface';
import { PageTitleService } from '../../../services/page-title.service';

@Component({
  templateUrl: './resource-edit.component.html',
})
export class ResourceEditComponent extends ViewAbstractComponent implements OnInit {

  data$: Promise<any>;

  resourceName: string;
  resourceKey: string;
  resourceId: string;

  form: FormGroup = new FormGroup({});
  fields: FormlyFieldConfig[];

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected appData: AppDataService,
              protected notification: NotificationService,
              protected schemaTransformService: SchemaTransformService,
              protected pageTitle: PageTitleService,
              protected modalService: BsModalService) {
    super();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.resourceKey = params.type;
      this.resourceId = params.id;
      this.data$ = this.appData.getResourceDetail(this.resourceKey, this.resourceId).then((data) => {
        this.resourceName = data.label;
        data.schema = this.schemaTransformService.transformForm(data.schema);
        this.fields = data.schema ? data.schema : [];
        this.pageTitle.setPageTitle([{search: '{resource}', replace: this.resourceName}]);
        return data;
      });
    });
  }

  onSubmit(): void {
    if (this.form.valid === false) {
      this.notification.formErrors(this.form);
    } else {
      this.appData.updateResource(this.resourceKey, this.resourceId, this.form.getRawValue()).then(() => {
        this.notification.success(this.resourceName + ' successfully updated', 'Success');
      }).catch((error) => this.notification.apiError(error));
    }
  }

  doDelete(): void {
    const initialState: ConfirmModalData = {
      title: 'Delete this ' + this.resourceName + '?',
      text: 'Do you really want to delete this ' + this.resourceName + '?',
      onConfirm: () => {
        this.appData.deleteResource(this.resourceKey, this.resourceId).then(() => {
          this.notification.success(this.resourceName + ' successfully deleted', 'Success');
          this.router.navigateByUrl('/resource/' + this.resourceKey);
        }).catch((error) => this.notification.apiError(error));
      },
    };
    this.modalService.show(KiwiConfirmModalComponent, {initialState});
  }

}
