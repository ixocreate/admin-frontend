import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewAbstractComponent } from '../../../components/view.abstract.component';
import { AppDataService } from '../../../services/data/app-data.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NotificationService } from '../../../services/notification.service';
import { SchemaTransformService } from '../../../services/schema-transform.service';
import { KiwiConfirmModalComponent } from '../../../modals/kiwi-confirm-modal/kiwi-confirm-modal.component';
import { ConfirmModalData } from '../../../modals/kiwi-confirm-modal/confirm-modal-data.interface';
import { ConfigService } from '../../../services/config.service';
import { ResourceConfig } from '../../../interfaces/config.interface';
import { BsModalService } from 'ngx-bootstrap';
import { CropperPosition, KiwiImageCropperComponent } from '../../../components/kiwi-image-cropper/kiwi-image-cropper.component';

@Component({
  templateUrl: './media-edit.component.html',
})
export class MediaEditComponent extends ViewAbstractComponent implements OnInit {

  @ViewChild(KiwiImageCropperComponent) cropper: KiwiImageCropperComponent;

  data$: Promise<any>;

  resourceKey = 'media';
  resourceId: string;
  resourceInfo: ResourceConfig;

  form: FormGroup = new FormGroup({});
  fields: FormlyFieldConfig[];

  image = 'http://marinomed.proxy.jetzt/media/e1/12/00/z16-4151.jpg';

  maintainAspectRatio = true;
  aspectRatio: number = 4 / 3;
  minWidth = 200;
  minHeight = 300;

  cropData = null;

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected appData: AppDataService,
              protected notification: NotificationService,
              protected config: ConfigService,
              protected schemaTransform: SchemaTransformService,
              protected modal: BsModalService) {
    super();
  }

  onCrop(data: CropperPosition) {
    this.cropData = data;
  }

  ngOnInit() {
    setTimeout(() => {
      this.cropper.setCropperPosition({x1: 10, x2: 400, y1: 10, y2: 400});
    }, 1000);

    this.route.params.subscribe(params => {
      this.resourceId = params.id;
      this.resourceInfo = this.config.getResourceConfig(this.resourceKey);
      this.fields = this.resourceInfo.updateSchema ? this.schemaTransform.transformForm(this.resourceInfo.updateSchema) : [];
      this.data$ = this.appData.getResourceDetail(this.resourceKey, this.resourceId);
    });
  }

  onSubmit(): void {
    if (this.form.valid === false) {
      this.notification.formErrors(this.form);
    } else {
      this.appData.updateResource(this.resourceKey, this.resourceId, this.form.getRawValue()).then(() => {
        this.notification.success(this.resourceInfo.label + ' successfully updated', 'Success');
      }).catch((error) => this.notification.apiError(error));
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
    this.modal.show(KiwiConfirmModalComponent, {initialState});
  }

}
