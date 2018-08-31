import { Component, OnInit } from '@angular/core';
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
import { PageTitleService } from '../../../services/page-title.service';

@Component({
  templateUrl: './media-edit.component.html',
})
export class MediaEditComponent extends ViewAbstractComponent implements OnInit {

  data$: Promise<any>;

  resourceKey = 'media';
  resourceId: string;
  resourceInfo: ResourceConfig;

  form: FormGroup = new FormGroup({});
  fields: FormlyFieldConfig[];

  image = 'http://marinomed.proxy.jetzt/media/e1/12/00/z16-4151.jpg';

  imageBase64: string;

  maintainAspectRatio = true;
  aspectRatio: number = 4 / 3;
  minWidth = 200;
  minHeight = 200;

  imageWidth: number;
  imageHeight: number;

  cropData = {x1: null, y1: null, x2: null, y2: null};

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

  private toDataUrl(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const image = new Image();
        image.onload = () => {
          this.imageWidth = image.width;
          this.imageHeight = image.height;
        };
        image.src = reader.result;
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }

  imageCropped(image: string) {
    console.log(this.imageWidth);
    this.checkCropData();
  }

  checkCropData() {
    if (this.minWidth) {
      if (this.cropData.x2 - this.cropData.x1 < this.minWidth) {
        this.cropData.x2 = this.cropData.x1 + this.minWidth;
      }
    }
    if (this.minHeight) {
      if (this.cropData.y2 - this.cropData.y1 < this.minHeight) {
        this.cropData.y2 = this.cropData.y1 + this.minHeight;
      }
    }

    if (this.maintainAspectRatio && this.aspectRatio) {
      this.cropData.y2 = this.cropData.y1 + ((this.cropData.x2 - this.cropData.x1) / this.aspectRatio);
    }

    if (this.cropData.x2 > this.imageWidth) {
      this.cropData.x1 = this.imageWidth - this.cropData.x2;
      this.cropData.x2 = this.imageWidth;
    }

    if (this.cropData.y2 > this.imageHeight) {
      this.cropData.y1 = this.imageHeight - this.cropData.y2;
      this.cropData.y2 = this.imageHeight;
    }

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.resourceId = params.id;
      this.resourceInfo = this.config.getResourceConfig(this.resourceKey);
      this.fields = this.resourceInfo.updateSchema ? this.schemaTransform.transformForm(this.resourceInfo.updateSchema) : [];
      this.data$ = this.appData.getResourceDetail(this.resourceKey, this.resourceId);
    });

    this.toDataUrl(this.image, (base64) => {
      this.imageBase64 = base64;
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
