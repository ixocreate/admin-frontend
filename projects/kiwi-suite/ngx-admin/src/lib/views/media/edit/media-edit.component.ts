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

interface Entity {
  name: string;
  width: number;
  height: number;
  crop: CropperPosition;
  unsavedCrop?: CropperPosition;
  unsaved: boolean;
  isCropable: boolean;
}

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

  image;

  maintainAspectRatio: boolean;
  aspectRatio: number;
  minWidth: number;
  minHeight: number;

  activeEntity: Entity;
  entities: Array<Entity> = [];

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected appData: AppDataService,
              protected notification: NotificationService,
              protected config: ConfigService,
              protected schemaTransform: SchemaTransformService,
              protected modal: BsModalService) {
    super();
  }

  private getDefinitionByName(definitions, name): { cropParameter: CropperPosition, isCropable: boolean, name: string } {
    for (const definition of definitions) {
      if (name === definition.name) {
        return definition;
      }
    }
    return null;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.resourceId = params.id;
      this.resourceInfo = this.config.getResourceConfig(this.resourceKey);
      this.fields = this.resourceInfo.updateSchema ? this.schemaTransform.transformForm(this.resourceInfo.updateSchema) : [];
      this.data$ = this.appData.getMediaDetail(this.resourceId).then((response: any) => {
        if (response.isCropable) {
          this.image = response.media.original;
          this.entities = [];
          for (const media of this.config.config.media) {
            const definition = this.getDefinitionByName(response.definitions, media.name);
            if (definition) {
              this.entities.push({
                name: media.label,
                width: media.width,
                height: media.height,
                crop: definition.cropParameter,
                unsaved: false,
                isCropable: definition.isCropable,
              });
            }
          }
          setTimeout(() => {
            for (const entity of this.entities) {
              if (entity.isCropable) {
                this.setActiveEntity(entity);
                break;
              }
            }
          });
        }
        return response;
      });
    });
  }

  setActiveEntity(entity: Entity) {
    this.activeEntity = entity;
    this.minWidth = entity.width;
    this.minHeight = entity.height;
    if (entity.width && entity.height) {
      this.maintainAspectRatio = true;
      this.aspectRatio = entity.width / entity.height;
    } else {
      this.maintainAspectRatio = false;
    }
    this.cropper.setCropperPosition(entity.unsavedCrop || entity.crop);
  }

  private isSameCropPosition(crop1: CropperPosition, crop2: CropperPosition): boolean {
    return !(crop1.x1 !== crop2.x1 || crop1.x2 !== crop2.x2 || crop1.y1 !== crop2.y1 || crop1.y2 !== crop2.y2);
  }

  private checkUnsavedStatus(entity: Entity) {
    if (entity.unsavedCrop) {
      this.activeEntity.unsaved = !this.isSameCropPosition(entity.crop, entity.unsavedCrop);
    } else {
      this.activeEntity.unsaved = false;
    }
  }

  saveCrop(entity: Entity) {
    entity.crop = entity.unsavedCrop;
    this.checkUnsavedStatus(entity);
  }

  resetCrop(entity: Entity) {
    this.cropper.setCropperPosition(entity.crop);
    this.checkUnsavedStatus(entity);
  }

  onCrop(data: CropperPosition) {
    this.activeEntity.unsavedCrop = data;
    this.checkUnsavedStatus(this.activeEntity);
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
