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
  styleUrls: ['./media-edit.component.scss'],
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

  maintainAspectRatio: boolean;
  aspectRatio: number;
  minWidth: number;
  minHeight: number;

  cropData = null;

  activeEntity;
  entities = [
    {
      name: 'Header',
      width: 500,
      height: 400,
      crop: {x1: 100, y1: 10, x2: 600, y2: 410},
    },
    {
      name: 'Content Image',
      width: 700,
      height: null,
      crop: {x1: 200, y1: 90, x2: 920, y2: 560},
    },
    {
      name: 'Person',
      width: 300,
      height: 300,
      crop: {x1: 500, y1: 500, x2: 900, y2: 900},
    },
  ];

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected appData: AppDataService,
              protected notification: NotificationService,
              protected config: ConfigService,
              protected schemaTransform: SchemaTransformService,
              protected modal: BsModalService) {
    super();
  }

  setActiveEntity(entity: any) {
    this.activeEntity = entity;
    this.minWidth = entity.width;
    this.minHeight = entity.height;
    if (entity.width && entity.height) {
      this.maintainAspectRatio = true;
      this.aspectRatio = entity.width / entity.height;
    } else {
      this.maintainAspectRatio = false;
    }
    this.cropper.setCropperPosition(entity.crop);
  }

  onCrop(data: CropperPosition) {
    this.cropData = data;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.resourceId = params.id;
      this.resourceInfo = this.config.getResourceConfig(this.resourceKey);
      this.fields = this.resourceInfo.updateSchema ? this.schemaTransform.transformForm(this.resourceInfo.updateSchema) : [];
      this.data$ = this.appData.getResourceDetail(this.resourceKey, this.resourceId).then((response) => {
        setTimeout(() => {
          this.setActiveEntity(this.entities[0]);
        });
        return response;
      });
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
